import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { appStyle, colors } from "@/styles/theme";
import { Navigation } from "@/utils/Navigation";
import { CheckSvg } from "@/assets/svg/CheckSvg";
import { Asset } from "expo-media-library";
import { isEqual } from "lodash";
import useStateCallback from "@/hooks/useStateCallback";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { CameraSvg } from "@/assets/svg/CameraSvg";
import { GallerySvg } from "@/assets/svg/GallerySvg";
import Typography from "@/components/Text/Typography";
import { FoodShop } from "@/types/food-order";
import MapLocation from "@/components/Maps/MapLocation";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "@/styles/dimensions";
import { Marker } from "react-native-maps";
import { RowView } from "@/components/View/RowView";
import { formatNumber } from "@/utils/helper";
import { StarSvg } from "@/assets/svg/StarSvg";
import { DotView } from "@/components/View/DotView";
import { storeApi } from "@/api/store.api";
import { calcDistance } from "@/utils/location";
import { userStore } from "@/store/userStore";
import { Loading } from "@/components/Loading/Loading";

interface Props {}

export interface PopupStoreInformation {
  handleOpen: (data: FoodShop) => void;
  handleClose: () => void;
}

export const PopupStoreInformation = React.memo(
  React.forwardRef(({}: Props, ref) => {
    const actionSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["80%"], []);
    const [store, setStore] = useState<FoodShop>(null);
    const region = useMemo(
      () => ({
        latitude: store?.lat,
        longitude: store?.long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      [store]
    );

    const distance = useMemo(() => {
      return calcDistance(
        { latitude: store?.lat, longitude: store?.long },
        {
          latitude: userStore.location.latitude,
          longitude: userStore.location.longitude,
        }
      );
    }, [store, userStore.location]);

    useImperativeHandle(
      ref,
      () => ({
        handleOpen,
        handleClose,
      }),
      []
    );

    const handleOpen = useCallback((data: FoodShop) => {
      fetchDetail(data);
      actionSheetRef.current?.present();
    }, []);

    const handleClose = useCallback(() => {
      actionSheetRef.current?.dismiss();
      setStore(null);
    }, []);

    const fetchDetail = async (data) => {
      const res = await storeApi.findOne(data?.id);
      setStore(res.data);
    };

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={actionSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          enableDismissOnClose
          backdropComponent={renderBackdrop}
          onDismiss={handleClose}
        >
          <BottomSheetScrollView
            style={{ flexGrow: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              padding: 16,
            }}
          >
            <Typography preset="largeTitle" colorPreset="primaryText">
              {store?.name}
            </Typography>

            <RowView style={{ marginTop: 8 }}>
              <StarSvg size={16} />
              <Typography
                preset="mediumParagraph"
                colorPreset="regularText"
                style={{ marginLeft: 4 }}
              >
                {formatNumber(store?.totalStar / store?.totalRate, 1)} (
                {store?.totalRate})
              </Typography>
              <DotView
                color={colors.background}
                size={4}
                style={{ marginHorizontal: 12 }}
              />
              <Typography
                preset="mediumParagraph"
                colorPreset="regularText"
                style={{ flex: 1 }}
              >
                {formatNumber(distance)} km
              </Typography>
            </RowView>

            <Typography
              preset="largeLabel"
              colorPreset="primaryText"
              style={{ marginTop: 8 }}
            >
              Mức giá
            </Typography>
            <Typography
              preset="largeLabel"
              colorPreset="error"
              style={{ marginTop: 4 }}
            >
              {formatNumber(store?.productMinPrice)}đ{" "}
              {store?.productMaxPrice != store?.productMinPrice &&
                `~ ${formatNumber(store?.productMaxPrice)}đ`}
            </Typography>

            <Typography
              preset="largeLabel"
              colorPreset="primaryText"
              style={{ marginTop: 8 }}
            >
              Thông tin chung
            </Typography>
            <Typography
              preset="mediumParagraph"
              colorPreset="primaryText"
              style={{ marginTop: 4 }}
            >
              {store?.description}
            </Typography>

            <Typography
              preset="largeLabel"
              colorPreset="primaryText"
              style={{ marginTop: 8 }}
            >
              Địa chỉ
            </Typography>
            <Typography
              preset="mediumParagraph"
              colorPreset="primaryText"
              style={{ marginTop: 4 }}
            >
              {store?.address}
            </Typography>

            {!!region?.latitude && !!region?.longitude && (
              <MapLocation
                initialRegion={region}
                style={{ width: "100%", aspectRatio: 2 / 1, marginTop: 8 }}
                pitchEnabled={false}
                zoomEnabled={false}
                scrollEnabled={false}
              >
                <Marker coordinate={region} />
              </MapLocation>
            )}

            <RowView style={{ marginTop: 12 }}>
              <Typography preset="largeLabel" colorPreset="primaryText">
                Thời gian mở cửa:
              </Typography>
              <Typography
                preset="smallParagraph"
                colorPreset="regularText"
                style={{ marginLeft: 12 }}
              >
                {store?.openTime} - {store?.closeTime}
              </Typography>
            </RowView>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }),
  (prev, next) => isEqual(prev, next)
);
