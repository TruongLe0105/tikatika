/**
 * @param {IAddress} location //nhận từ route vào để init map
 * @param {callback} onDone: (location) =>void
 */

import { CloseSvg } from "@/assets/svg/CloseSvg";
import { GpsSvg } from "@/assets/svg/GpsSvg";
import { LocationSvg } from "@/assets/svg/LocationSvg";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EHeader } from "@/components/Header/EHeader";
import { EInput } from "@/components/Input/EInput";
import { Loading } from "@/components/Loading/Loading";
import MapLocation from "@/components/Maps/MapLocation";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { locationStore } from "@/store/locationStore";
import { userStore } from "@/store/userStore";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  SCREEN_WIDTH,
} from "@/styles/dimensions";
import { alignJustify, colors } from "@/styles/theme";
import { IAddress } from "@/types/address";
import { toJS } from "mobx";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import { PinLocation } from "./components/PinLocation";
import ResultSearchAddressItem from "./components/ResultSearchAddressItem";

export const ChooseAddressOnMapScreen = ({ route }) => {
  const onDone: (address: IAddress) => void = route.params?.onDone;
  const location: IAddress = route.params?.location;
  const mapRef = useRef<MapView>(null);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const translateOriginPoint = useRef(new Animated.Value(0));
  const isRegion = useRef(true);
  const [result, setResult] = useState<IAddress>(null);
  const [heightMapBox, setHeightMapBox] = useState(0);
  const [search, setSearch] = useState("");
  const [showSelection, setShowSelection] = useState(true);
  const [resultSearch, setResultSearch] = useState([]);

  const handleSelect = () => {
    onDone?.(result);
  };

  const onChangeMapComplete = useCallback(async (region: Region) => {
    setLoadingConfirm(true);
    setResultSearch([]);
    try {
      const res = await locationStore.fetchLocationByLatLng(region);
      console.log("onChangeMapComplete ne", res);
      setResult(res);
      setSearch(res.formattedAddress);
    } finally {
      setLoadingConfirm(false);
    }
  }, []);

  const onPressCurrent = async () => {
    try {
      console.log("onPressCurrent");

      await userStore.getLocation();
      if (mapRef) {
        mapRef.current.animateToRegion({
          latitude: userStore.location?.latitude,
          longitude: userStore.location?.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    } catch (error) {}
  };

  const handleMapReady = useCallback(() => {
    onPressCurrent();
  }, []);

  const handleChangeRegion = useCallback(() => {
    StartAnimationViewOrigin(-7);
    setTimeout(() => {
      StartAnimationViewOrigin(0);
    }, 1 * 1000);
  }, []);

  const StartAnimationViewOrigin = (value) => {
    Animated.timing(translateOriginPoint.current, {
      toValue: value,
      duration: 100,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  const handleSearch = async (event) => {
    const res = await locationStore.fetchPlaceByText(event.nativeEvent.text, {
      latitude: userStore.location?.latitude,
      longitude: userStore.location?.longitude,
    });
    setResultSearch(res);
  };

  const handleSelectAddress = async (location: IAddress) => {
    try {
      Loading.load();
      const res = await locationStore.fetchPlaceByPlaceId(
        location.placeId,
        location.formattedAddress
      );
      setResult(res);
      setSearch(res.formattedAddress);

      mapRef.current.animateToRegion({
        latitude: res?.latitude,
        longitude: res?.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } finally {
      Loading.hide();
    }
  };

  const handleClear = () => {
    setSearch("");
  };

  return (
    <EScreen hideHeader edges={["bottom", "top"]} style={{ flexGrow: 1 }}>
      <View
        style={{ flexGrow: 1 }}
        onLayout={(ev) => {
          setHeightMapBox(ev.nativeEvent.layout.height);
        }}
      >
        <View
          pointerEvents={showSelection ? "auto" : "none"}
          style={{ flex: 1 }}
        >
          <MapLocation
            mapRef={mapRef}
            onRegionChange={handleChangeRegion}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onMapReady={handleMapReady}
            onRegionChangeComplete={onChangeMapComplete}
            style={{ flex: 1 }}
          />
        </View>
        <EHeader fixedHeader showHeaderTool />
        {/* pin location */}
        <PinLocation
          heightMapBox={heightMapBox}
          translateOriginPoint={translateOriginPoint.current}
        />

        <View
          style={{
            position: "absolute",
            bottom: 16,
            right: 0,
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <ShadowCard
            style={{
              height: 40,
              alignSelf: "flex-end",
              aspectRatio: 1 / 1,
              ...alignJustify(),
            }}
          >
            <Pressable onPress={onPressCurrent}>
              <GpsSvg size={20} />
            </Pressable>
          </ShadowCard>

          <EButton
            loading={loadingConfirm}
            text="Giao đến vị trí này"
            onPress={handleSelect}
            style={{ marginTop: 24 }}
          />
        </View>

        <ShadowCard
          style={{
            position: "absolute",
            alignSelf: "center",
            top: 60,
            width: SCREEN_WIDTH - 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}
          >
            <LocationSvg />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Typography
                preset="superSmallParagraph"
                colorPreset="secondaryText"
              >
                Giao đến
              </Typography>
              {/* <Typography
                size={12}
                preset="mediumLabel"
                color={"#000"}
                numberOfLines={1}
              >
                {result?.formattedAddress}
              </Typography> */}
              <EInput
                value={search}
                onChangeText={setSearch}
                onEndEditing={handleSearch}
                style={{
                  fontSize: 12,
                  lineHeight: 20,
                  fontFamily: "text-semibold",
                  color: "#000",
                  paddingVertical: 0,
                }}
                selection={showSelection ? { start: 0, end: 0 } : null}
                onFocus={() => setShowSelection(false)}
                onBlur={() => setShowSelection(true)}
                inputStyle={{
                  borderWidth: 0,
                  paddingHorizontal: 0,
                  // height: 40,
                  paddingVertical: 0,
                }}
                componentRight={
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 50,
                      padding: 2,
                    }}
                    onPress={handleClear}
                  >
                    <CloseSvg size={16} color="#000" />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>

          <View style={{ maxHeight: 100 }}>
            <FlatList
              data={resultSearch}
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
                <View
                  style={{ height: 1, backgroundColor: colors.background }}
                />
              )}
            />
          </View>
        </ShadowCard>
      </View>
    </EScreen>
  );
};

const styles = StyleSheet.create({});
