/**
 * Màn hình chọn địa chỉ giao
 * Có thể chọn từ kết quả  search, hoặc từ maps
 * @param {IAddress} location //nhận từ route vào để init map
 * @param {Function} onDone
 */

import { Alert } from "@/components/Alert/Alert";
import { Loading } from "@/components/Loading/Loading";
import { EScreen } from "@/components/Screen/EScreen";
import { AddressEntity } from "@/entities/AddressHistoryEntity";
import { locationStore } from "@/store/locationStore";
import { userStore } from "@/store/userStore";
import { colors } from "@/styles/theme";
import { IAddress } from "@/types/address";
import { ScreenName } from "@/utils/enum";
import { calcDistance } from "@/utils/location";
import { Navigation } from "@/utils/Navigation";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChangeAddressHeader from "./components/ChangeAddressHeader";
import ResultSearchAddressItem from "./components/ResultSearchAddressItem";

export const ChangeDeliveryAddressScreen = ({ route }) => {
  const onDone: (address: IAddress) => void = route.params?.onDone;
  const location: IAddress = route.params?.location;
  const [resultSearch, setResultSearch] = useState<IAddress[]>([]);
  const [addressHistories, setAddressHistories] = useState<IAddress[]>([]);

  const handlePressMapIcon = () => {
    Navigation.navigate(ScreenName.ChooseAddressOnMapScreen, {
      onDone: async (location) => {
        const isCheck = await handleCheckDistance(location);
        Navigation.goBack();
        console.log("back 1", location);
        setTimeout(() => {
          handleSelectAddress(location, isCheck);
        }, 1000);
      },
      location,
    });
  };

  useEffect(() => {
    getAddressHistories();
  }, []);

  const getAddressHistories = async () => {
    const res = await AddressEntity.find();
    console.log("getAddressHistories", res);

    setAddressHistories(res);
  };

  const handleCheckDistance = async (address: IAddress): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      const distance = calcDistance(
        {
          latitude: userStore.location?.latitude,
          longitude: userStore.location?.longitude,
        },
        { latitude: address.latitude, longitude: address.longitude }
      );
      if (distance > 10) {
        Alert.alert({
          title: "Cảnh báo",
          message:
            "Địa chỉ này hiện cách xa địa chỉ hiện tại của bạn. Bạn có chắc muốn chọn địa chỉ giao này",
          buttonGroup: [
            {
              text: "Không",
              style: "cancel",
              onPress: () => {
                requestAnimationFrame(() => {
                  reject("false");
                });
              },
            },
            {
              text: "Có",
              onPress: () => {
                requestAnimationFrame(() => {
                  resolve(true);
                });
              },
            },
          ],
        });
      } else {
        resolve(true);
      }
    });
  };

  const handleSelectAddress = async (location: IAddress, isCheck = false) => {
    try {
      Loading.load();
      const res = await locationStore.fetchPlaceByPlaceId(
        location.placeId,
        location.formattedAddress
      );
      console.log("handleSelectAddress", res);
      if (!isCheck) {
        await handleCheckDistance(res);
      }
      onDone?.(res);
      Navigation.goBack();
    } finally {
      Loading.hide();
    }
  };

  const handleBack = () => {
    Navigation.goBack();
  };

  const handleSearch = async (text) => {
    const res = await locationStore.fetchPlaceByText(text, {
      latitude: userStore.location?.latitude,
      longitude: userStore.location?.longitude,
    });
    setResultSearch(res);
  };

  const onSearch = useRef(debounce(handleSearch, 1000));

  return (
    <EScreen
      showHeaderTool
      componentLeft={
        //header chứa nút search, input, icon map để navigation chọn trên map
        <ChangeAddressHeader
          onSearch={onSearch.current}
          onBack={handleBack}
          onPressMapIcon={handlePressMapIcon}
        />
      }
      edges={["bottom"]}
      showRight={false}
      style={{ flex: 1 }}
    >
      {/* ds ket qua search */}
      <FlatList
        data={resultSearch.length ? resultSearch : addressHistories}
        renderItem={({ item }) => (
          <ResultSearchAddressItem
            onSelect={handleSelectAddress}
            address={item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.background }} />
        )}
      />
    </EScreen>
  );
};

const styles = StyleSheet.create({});
