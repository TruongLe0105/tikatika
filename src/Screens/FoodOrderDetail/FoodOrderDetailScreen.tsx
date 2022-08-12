import { driverApi } from "@/api/driver.api";
import { Alert } from "@/components/Alert/Alert";
import { EButton } from "@/components/Button/EButton";
import MapLocation from "@/components/Maps/MapLocation";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { locationStore } from "@/store/locationStore";
import { userStore } from "@/store/userStore";
import { colors } from "@/styles/theme";
import { OrderFoodStatus } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { decodeDirection, formatDateTime, openVnPay } from "@/utils/helper";
import { Navigation } from "@/utils/Navigation";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { AppState, AppStateStatus, StyleSheet, Text, View } from "react-native";
import MapView, { LatLng } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { marginTop } from "styled-system";
import { GetReceiptModal } from "../FoodOrderHistory/components/GetReceiptModal";
import { AddressCard } from "./components/AddressCard";
import { DriverCard } from "./components/DriverCard";
import { ETACard } from "./components/ETACard";
import { FoodOrderNote } from "./components/FoodOrderNote";
import { FoodOrderPricing } from "./components/FoodOrderPricing";
import { SelectedFoodList } from "./components/SelectedFoodList";

export const FoodOrderDetailScreen = observer(() => {
  const [visibleReceiptModal, setVisibleReceiptModal] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const isInterval = useRef(false);
  const intervalGps = useRef(null);
  const [gps, setGps] = useState<LatLng>(null);

  const renderTitle = useMemo(() => {
    return (
      <View style={{}}>
        <Typography
          align="center"
          color={colors.primary}
          size={14}
          lineHeight={16}
          family="bold"
        >
          Đơn {foodOrderStore.selected?.code}
        </Typography>
        <Typography color="#5B5B5B" size={10} lineHeight={12} align="center">
          {formatDateTime(foodOrderStore.selected?.createdAt)}
        </Typography>
      </View>
    );
  }, []);

  const handleIntervalGps = () => {
    clearInterval(intervalGps.current);
    console.log("handleIntervalGps", isInterval.current);
    isInterval.current = true;
    intervalGps.current = setInterval(() => fetchDriveGps(), 5 * 1000);
  };

  const fetchDriveGps = async () => {
    const res = await driverApi.getGps({
      driverId: foodOrderStore.selected.driver.id,
    });
    console.log("fetchDriveGps", res.data);
    if (!isEmpty(res.data)) {
      setGps({
        latitude: res.data.lat,
        longitude: res.data.long,
      });
    }
  };

  useEffect(() => {
    foodOrderStore.fetchSelected();
    AppState.addEventListener("change", handleAppState);
    return () => {
      AppState.removeEventListener("change", handleAppState);
    };
  }, []);

  const handleAppState = (state: AppStateStatus) => {
    if (state == "active") {
      foodOrderStore.fetchSelected();
    }
  };

  useEffect(() => {
    if (
      !isInterval.current &&
      foodOrderStore.selected.driver &&
      (foodOrderStore.selected.status == OrderFoodStatus.Delivering ||
        foodOrderStore.selected.status == OrderFoodStatus.AcceptOrder)
    ) {
      handleIntervalGps();
      fetchDriveGps();
    } else {
      clearInterval();
    }
    return () => {
      clearInterval(intervalGps.current);
    };
  }, [foodOrderStore.selected.status, foodOrderStore.selected.driver]);

  const onMapReady = useCallback(() => {
    mapRef.current.fitToCoordinates(
      decodeDirection(foodOrderStore.selected?.matrix)
    );
  }, []);

  const handleCancel = () => {
    Alert.alert({
      title: "Cảnh báo",
      message: "Bạn chắc chắn muốn hủy đơn",
      buttonGroup: [
        {
          text: "Hủy đơn",
          style: "cancel",
          onPress: async () => {
            try {
              setLoadingSubmit(true);
              await foodOrderStore.cancelSelected();
            } finally {
              setLoadingSubmit(false);
            }
          },
        },
        {
          text: "Không",
        },
      ],
    });
  };

  const visibleDriverCard = useMemo(
    () =>
      foodOrderStore.selected.status == OrderFoodStatus.Cook ||
      foodOrderStore.selected.status == OrderFoodStatus.AcceptOrder ||
      foodOrderStore.selected.status == OrderFoodStatus.Delivering ||
      foodOrderStore.selected.status == OrderFoodStatus.FindDriver,
    [foodOrderStore.selected.status]
  );

  const handlePressChat = useCallback(() => {
    Navigation.navigate(ScreenName.Chat, {
      avatar: foodOrderStore.selected.driver.avatar,
      name: foodOrderStore.selected.driver.name,
    });
  }, []);

  const handlePressReview = () => {
    foodOrderStore.setSelectedShop(foodOrderStore.selected.store);
    Navigation.navigate(ScreenName.Review, {
      onDone: () => {
        foodOrderStore.fetchSelected();
      },
    });
  };

  const handleCreateOrder = async () => {
    foodOrderStore.resetCart();
    setLoadingSubmit(true);
    try {
      await userStore.getLocation();
      const res = await locationStore.fetchLocationByLatLng(userStore.location);
      foodOrderStore.setEndAddressOrder(res);
      foodOrderStore.setSelectedShop(foodOrderStore.selected.store);
      foodOrderStore.setOrder(foodOrderStore.selected);
      for (let i = 0; i < foodOrderStore.selected.orderDetails.length; i++) {
        const e = foodOrderStore.selected.orderDetails[i];
        const product = { ...e.product, store: foodOrderStore.selected.store };
        foodOrderStore.addToCart(product, e.quantity);
      }
      await foodOrderStore.estimate();
      Navigation.popToTop();
      Navigation.navigate(ScreenName.PaymentFood);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const timeCook = useMemo(() => {
    return foodOrderStore.selected.orderDetails.reduce(
      (prev, cur) => prev + cur.product.cookTime,
      0
    );
  }, [foodOrderStore.selected]);

  const handleCompletePayment = () => {
    openVnPay(foodOrderStore?.selected.vnpayUrl);
  };

  return (
    <EScreen
      showHeaderTool
      componentTitle={renderTitle}
      style={{ flexGrow: 1 }}
      enableKeyboardAware
    >
      {/* header */}

      {/* map */}
      <MapLocation
        style={{ aspectRatio: 375 / 280 }}
        points={foodOrderStore.selected?.matrix}
        mapRef={mapRef}
        onMapReady={onMapReady}
        carLocation={gps}
        startLocation={{
          latitude: foodOrderStore.selected?.startLat,
          longitude: foodOrderStore.selected?.startLong,
        }}
        endLocation={{
          latitude: foodOrderStore.selected?.endLat,
          longitude: foodOrderStore.selected?.endLong,
        }}
      />

      <View style={{ padding: 16 }}>
        {/* driver card */}

        {visibleDriverCard && (
          <DriverCard
            onPressChat={handlePressChat}
            driver={foodOrderStore.selected?.driver}
          />
        )}

        {/* Thời gian giao dự kiến */}
        <View style={{ marginTop: 24 }}>
          <ETACard
            isCooked={foodOrderStore.selected.isCooked}
            duration={foodOrderStore.selected?.duration + timeCook}
            acceptedAt={foodOrderStore.selected?.acceptAt}
            completedAt={foodOrderStore.selected?.completeAt}
            cookAt={foodOrderStore.selected?.cookAt}
            storeAcceptAt={foodOrderStore.selected?.storeAcceptAt}
            deliveringAt={foodOrderStore.selected?.deliveringAt}
            status={foodOrderStore.selected?.status}
          />
        </View>

        {/* Điển nhận, điêm giao */}
        <View style={{ marginTop: 24 }}>
          <AddressCard
            startAddress={foodOrderStore.selected?.startAddress}
            startRoute={foodOrderStore.selected?.store?.name}
            endAddress={foodOrderStore.selected?.endAddress}
            endRoute={foodOrderStore.selected?.endName}
          />
        </View>

        {/* Các món đã đặt */}
        <View style={{ marginTop: 24 }}>
          <SelectedFoodList
            foods={foodOrderStore.selected?.orderDetails}
            status={foodOrderStore.selected.status}
            onPress={handleCreateOrder}
            loadingSubmit={loadingSubmit}
          />
        </View>

        <View
          style={{ height: 1, backgroundColor: "#D7D9D9", marginVertical: 12 }}
        ></View>

        {/* Các chi phí */}
        <View>
          <FoodOrderPricing
            moneyTotal={foodOrderStore.selected.moneyTotal}
            moneyDistance={foodOrderStore.selected?.moneyDistance}
            moneyFinal={foodOrderStore.selected?.moneyFinal}
            point={foodOrderStore.selected?.point}
            moneyDiscount={foodOrderStore.selected?.moneyDiscount}
            moneyRushHour={foodOrderStore.selected?.moneyRushHour}
            paymentType={foodOrderStore.selected?.paymentType}
          />
        </View>

        {/* Ghi chú */}
        {!!foodOrderStore.selected?.note && (
          <FoodOrderNote note={foodOrderStore.selected?.note} />
        )}

        {/* Button actions  */}
        <View style={{ marginTop: 24 }}>
          {(foodOrderStore.selected.status == OrderFoodStatus.FindDriver ||
            foodOrderStore.selected.status == OrderFoodStatus.Waiting ||
            foodOrderStore.selected.status ==
              OrderFoodStatus.PendingPayment) && (
            <EButton
              activityColor={colors.primary}
              loading={loadingSubmit}
              onPress={handleCancel}
              border
              text="Hủy đơn"
            />
          )}

          {foodOrderStore.selected.status == OrderFoodStatus.PendingPayment && (
            <EButton
              onPress={handleCompletePayment}
              style={{ flex: 1, marginTop: 18 }}
              text="Hoàn tất thanh toán"
            />
          )}

          {foodOrderStore.selected.status == OrderFoodStatus.Complete && (
            <RowView>
              <EButton
                onPress={() => setVisibleReceiptModal(true)}
                style={{ flex: 1 }}
                text="Lấy hóa đơn"
                border
              />
              {foodOrderStore.selected.rateStar == 0 && (
                <>
                  <View style={{ width: 12 }}></View>
                  <EButton
                    onPress={handlePressReview}
                    style={{ flex: 1 }}
                    text={"Đánh giá"}
                  />
                </>
              )}
            </RowView>
          )}
        </View>

        {/* modal Lấy hóa đơn điện tử */}
        <GetReceiptModal
          onClose={() => {
            setVisibleReceiptModal(false);
          }}
          onDone={() => {
            setVisibleReceiptModal(false);
          }}
          foodOrder={foodOrderStore.selected}
          visible={visibleReceiptModal}
        />
      </View>
    </EScreen>
  );
});
