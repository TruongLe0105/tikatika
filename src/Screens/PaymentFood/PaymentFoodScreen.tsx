import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { foodOrderStore } from "@/store/foodOrderStore";
import { IAddress } from "@/types/address";
import { PaymentStatus, PaymentType } from "@/types/payment";
import { ScreenName } from "@/utils/enum";
import { formatNumber, openVnPay } from "@/utils/helper";
import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NativeEventEmitter, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodCartButton } from "../FoodCart/components/FoodCartButton";
import { CouponPayment } from "./components/CouponPayment";
import { FoodListPayment } from "./components/FoodListPayment";
import { PaymentDeliveryAddress } from "./components/PaymentFoodDeliveryAddress";
import { PaymentFoodHeader } from "./components/PaymentFoodHeader";
import { PaymentMethod } from "./components/PaymentMethod";
import { PaymentNote } from "./components/PaymentNote";
import { UsingPoint } from "./components/UsingPoint";
import Dash from "react-native-dash";
import { colors } from "@/styles/theme";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { RowView } from "@/components/View/RowView";
import { Alert } from "@/components/Alert/Alert";
import { configStore } from "@/store/configStore";
import { userStore } from "@/store/userStore";
import { VnpayMerchantModule } from "react-native-vnpay-merchant";
import { foodOrderApi } from "@/api/foodOrder.api";
import { FoodOrder, OrderFoodStatus } from "@/types/food-order";
import { useFocusEffect } from "@react-navigation/native";

const eventEmitter = new NativeEventEmitter(VnpayMerchantModule);

export const PaymentFoodScreen = observer(() => {
  const [isEst, setIsEst] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const foodOrder = useRef(null);
  const isEventListen = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      checkLocation();
    }, [foodOrderStore.order])
  );

  // useEffect(() => {
  //   estimate();
  // }, []);

  useEffect(() => {
    // mở sdk
    eventEmitter.addListener("PaymentBack", (e) => {
      console.log("Sdk back!", e);
      if (!isEventListen.current) {
        return;
      }
      isEventListen.current = false;

      // Đã available trên cả ios, android
      if (e) {
        switch (e.resultCode) {
          case 97:
          case 10:
            console.log(
              "Người dùng nhấn back từ trang thanh toán thành công khi thanh toán qua thẻ khi gọi đến http://sdk.merchantbackapp"
            );

            handleCheckPaymentStatus();
            break;
          case -1:
          case 98:
            console.log("Người dùng nhấn back từ sdk để quay lại");
            // handleCancel();
            handleCheckPaymentStatus();
        }
      }
    });
    return () => {
      // khi tắt sdk
      eventEmitter.removeAllListeners("PaymentBack");
    };
  }, []);

  useEffect(() => {
    estimate();
  }, [foodOrderStore.order.isUseBalancePromotion]);

  const handleCheckPaymentStatus = async () => {
    const res = await foodOrderApi.findOne(foodOrder.current.order.id);
    const order: FoodOrder = res.data;
    if (
      order.paymentStatus == PaymentStatus.Complete &&
      order.paymentType == PaymentType.VnPay
    ) {
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    foodOrderStore.fetchList();
    Navigation.navigate(ScreenName.PaymentFoodSuccess);
  };

  const handleCancel = () => {
    foodOrderApi.cancel(foodOrder.current.order.id);
  };

  const checkLocation = async () => {
    if (!foodOrderStore.order.endLat || !foodOrderStore.order.endLong) {
      Alert.alert({
        title: "Thông báo",
        message: "Bạn chưa chọn địa điểm giao hàng. Vui lòng chọn điểm giao",
        buttonGroup: [
          { text: "Hủy", style: "cancel", onPress: () => Navigation.goBack() },
          { text: "OK", onPress: () => handlePressAddress() },
        ],
      });
    }
  };

  const estimate = async () => {
    await foodOrderStore.fetchDirection();
    setIsFail(false);
    setIsEst(false);

    foodOrderStore
      .estimate()
      .catch(() => setIsFail(true))
      .finally(() => setIsEst(true));
  };

  const handlePressAddress = () => {
    Navigation.navigate(ScreenName.ChangeDeliveryAddress, {
      location: {
        latitude: foodOrderStore.order.endLat,
        longitude: foodOrderStore.order.endLong,
      },
      onDone: (address: IAddress) => {
        if (!foodOrderStore.order.endLat || !foodOrderStore.order.endLong) {
          userStore.setLocation(address);
        }
        foodOrderStore.setEndAddressOrder(address);
        estimate();
      },
    });
  };

  const handlePressNote = () => {
    Navigation.navigate(ScreenName.Note, {
      note: foodOrderStore.order.note,
      onDone: (note) => {
        Navigation.goBack();
        foodOrderStore.order.note = note;
      },
    });
  };

  const handlePressCoupon = () => {
    requestAnimationFrame(() => {
      Navigation.navigate(ScreenName.Coupon, {
        promotion: foodOrderStore.promotion,
        storeId: foodOrderStore.selectedShop.id,
        onSelect: (promotion) => {
          requestAnimationFrame(() => {
            Navigation.goBack();
          });
          foodOrderStore.setPromotion(promotion);
          foodOrderStore.estimate();
        },
      });
    });
  };

  const handlePayment = async () => {
    if (isFail) {
      estimate();
    } else {
      setIsSubmitting(true);
      foodOrderStore
        .create()
        .then((result) => {
          isEventListen.current = true;
          foodOrder.current = result.data;
          if (foodOrderStore.order.paymentType == PaymentType.VnPay) {
            openVnPay(result.data?.vnpayUrl);
          } else {
            handleSuccess();
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const handleSwitchPoint = (isUsingPoint) => {
    foodOrderStore.setUsingPoint(isUsingPoint);
    if (!isUsingPoint) {
      foodOrderStore.setPaymentType(PaymentType.Cash);
    } else {
      foodOrderStore.setPaymentType(PaymentType.Point);
    }
  };

  const usedPoint = useMemo(
    () =>
      foodOrderStore.resultEst.moneyFinal / configStore.ratioPoint.value || 0,
    [foodOrderStore.resultEst.moneyFinal]
  );

  console.log("configStore.ratioPoint.value", configStore.ratioPoint.value);

  return (
    <EScreen
      headerTitle="Xác nhận"
      showHeaderTool
      edges={["bottom"]}
      enableKeyboardAware
      style={{ flexGrow: 1 }}
    >
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        {/* Hiển thị địa chỉ giao  */}
        <PaymentDeliveryAddress
          onPress={handlePressAddress}
          address={foodOrderStore.order.endAddress}
        />

        {/* tren figma  có sđt nữa nhưng k cần thiết  */}
      </View>

      <Dash
        style={{
          width: "100%",
          height: 1,
          marginVertical: 24,
        }}
        dashColor={colors.background}
        dashThickness={2}
        dashGap={2}
        dashLength={5}
      />

      <View style={{ paddingHorizontal: 16 }}>
        {/* Danh sách món ăn đã chọn và tên quán */}
        <FoodListPayment
          foods={foodOrderStore.cart}
          foodShop={foodOrderStore.selectedShop}
        />

        <View
          style={{
            height: 1,
            backgroundColor: colors.background,
            marginVertical: 12,
          }}
        />

        {/* Phí vận chuyển */}
        <RowView justifyContent="space-between">
          <Typography preset="mediumParagraph" color="#000">
            Phí vận chuyển
          </Typography>
          <Typography
            preset="smallParagraph"
            colorPreset="error"
            lineHeight={12}
          >
            {formatNumber(foodOrderStore.resultEst.moneyDistance)} đ
          </Typography>
        </RowView>

        {/* Phí giờ cao điểm */}
        <RowView justifyContent="space-between" style={{ marginTop: 12 }}>
          <Typography preset="mediumParagraph" color="#000">
            Phí giờ cao điểm
          </Typography>
          <Typography
            preset="smallParagraph"
            colorPreset="error"
            lineHeight={12}
          >
            {formatNumber(foodOrderStore.resultEst.moneyRushHour)} đ
          </Typography>
        </RowView>

        {/* Tạm tính */}
        <RowView justifyContent="space-between" style={{ marginTop: 12 }}>
          <Typography preset="mediumParagraph" color="#000">
            TẠM TÍNH
          </Typography>
          <Typography preset="smallTitle" colorPreset="error">
            {formatNumber(
              foodOrderStore.resultEst.moneyTotal +
                foodOrderStore.resultEst.moneyDistance +
                foodOrderStore.resultEst.moneyRushHour
            )}{" "}
            đ
          </Typography>
        </RowView>
      </View>

      <Dash
        style={{
          width: "100%",
          height: 1,
          marginVertical: 24,
        }}
        dashColor={colors.background}
        dashThickness={2}
        dashGap={2}
        dashLength={5}
      />

      <View style={{ paddingHorizontal: 16 }}>
        {/* Ghi chú */}
        <PaymentNote
          onPress={handlePressNote}
          note={foodOrderStore.order.note}
        />
      </View>

      <Dash
        style={{
          width: "100%",
          height: 1,
          marginVertical: 24,
        }}
        dashColor={colors.background}
        dashThickness={2}
        dashGap={2}
        dashLength={5}
      />

      <View style={{ paddingHorizontal: 16 }}>
        {/* Chọn coupon */}
        <CouponPayment
          promotion={foodOrderStore.promotion}
          onPress={handlePressCoupon}
          moneyDiscount={foodOrderStore.resultEst.moneyDiscount}
        />
      </View>

      <Dash
        style={{
          width: "100%",
          height: 1,
          marginVertical: 24,
        }}
        dashColor={colors.background}
        dashThickness={2}
        dashGap={2}
        dashLength={5}
      />

      <View style={{ paddingHorizontal: 16 }}>
        {/* Tuỳ chọn dùng điểm */}
        <UsingPoint
          myPoint={userStore.info.balance}
          usedPoint={usedPoint}
          canUse={userStore.info.balance >= usedPoint}
          onSwitch={handleSwitchPoint}
          isEnable={foodOrderStore.order.isUseBalancePromotion}
        />
      </View>

      <Dash
        style={{
          width: "100%",
          height: 1,
          marginVertical: 24,
        }}
        dashColor={colors.background}
        dashThickness={2}
        dashGap={2}
        dashLength={5}
      />

      <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        {/* Chọn phương thức thanh toán */}
        <PaymentMethod
          onSelect={(paymentType) => {
            foodOrderStore.setPaymentType(paymentType);
            foodOrderStore.setUsingPoint(paymentType == PaymentType.Point);
          }}
          canUsePoint={userStore.info.balance >= usedPoint}
          selectPaymentMethod={foodOrderStore.order.paymentType}
        />

        {/* nut thanh toán */}
        <FoodCartButton
          disabled={
            !foodOrderStore.order.endLat || !foodOrderStore.order.endLong
          }
          loading={isSubmitting}
          money={
            foodOrderStore.order.isUseBalancePromotion
              ? 0
              : foodOrderStore.resultEst.moneyFinal
          }
          onPress={handlePayment}
          title={"TỔNG CỘNG"}
        />
      </View>
    </EScreen>
  );
});

const styles = StyleSheet.create({});
