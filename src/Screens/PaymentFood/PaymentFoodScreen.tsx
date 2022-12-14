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
    // m??? sdk
    eventEmitter.addListener("PaymentBack", (e) => {
      console.log("Sdk back!", e);
      if (!isEventListen.current) {
        return;
      }
      isEventListen.current = false;

      // ???? available tr??n c??? ios, android
      if (e) {
        switch (e.resultCode) {
          case 97:
          case 10:
            console.log(
              "Ng?????i d??ng nh???n back t??? trang thanh to??n th??nh c??ng khi thanh to??n qua th??? khi g???i ?????n http://sdk.merchantbackapp"
            );

            handleCheckPaymentStatus();
            break;
          case -1:
          case 98:
            console.log("Ng?????i d??ng nh???n back t??? sdk ????? quay l???i");
            // handleCancel();
            handleCheckPaymentStatus();
        }
      }
    });
    return () => {
      // khi t???t sdk
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
        title: "Th??ng b??o",
        message: "B???n ch??a ch???n ?????a ??i???m giao h??ng. Vui l??ng ch???n ??i???m giao",
        buttonGroup: [
          { text: "H???y", style: "cancel", onPress: () => Navigation.goBack() },
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
      headerTitle="X??c nh???n"
      showHeaderTool
      edges={["bottom"]}
      enableKeyboardAware
      style={{ flexGrow: 1 }}
    >
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        {/* Hi???n th??? ?????a ch??? giao  */}
        <PaymentDeliveryAddress
          onPress={handlePressAddress}
          address={foodOrderStore.order.endAddress}
        />

        {/* tren figma  c?? s??t n???a nh??ng k c???n thi???t  */}
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
        {/* Danh s??ch m??n ??n ???? ch???n v?? t??n qu??n */}
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

        {/* Ph?? v???n chuy???n */}
        <RowView justifyContent="space-between">
          <Typography preset="mediumParagraph" color="#000">
            Ph?? v???n chuy???n
          </Typography>
          <Typography
            preset="smallParagraph"
            colorPreset="error"
            lineHeight={12}
          >
            {formatNumber(foodOrderStore.resultEst.moneyDistance)} ??
          </Typography>
        </RowView>

        {/* Ph?? gi??? cao ??i???m */}
        <RowView justifyContent="space-between" style={{ marginTop: 12 }}>
          <Typography preset="mediumParagraph" color="#000">
            Ph?? gi??? cao ??i???m
          </Typography>
          <Typography
            preset="smallParagraph"
            colorPreset="error"
            lineHeight={12}
          >
            {formatNumber(foodOrderStore.resultEst.moneyRushHour)} ??
          </Typography>
        </RowView>

        {/* T???m t??nh */}
        <RowView justifyContent="space-between" style={{ marginTop: 12 }}>
          <Typography preset="mediumParagraph" color="#000">
            T???M T??NH
          </Typography>
          <Typography preset="smallTitle" colorPreset="error">
            {formatNumber(
              foodOrderStore.resultEst.moneyTotal +
                foodOrderStore.resultEst.moneyDistance +
                foodOrderStore.resultEst.moneyRushHour
            )}{" "}
            ??
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
        {/* Ghi ch?? */}
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
        {/* Ch???n coupon */}
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
        {/* Tu??? ch???n d??ng ??i???m */}
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
        {/* Ch???n ph????ng th???c thanh to??n */}
        <PaymentMethod
          onSelect={(paymentType) => {
            foodOrderStore.setPaymentType(paymentType);
            foodOrderStore.setUsingPoint(paymentType == PaymentType.Point);
          }}
          canUsePoint={userStore.info.balance >= usedPoint}
          selectPaymentMethod={foodOrderStore.order.paymentType}
        />

        {/* nut thanh to??n */}
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
          title={"T???NG C???NG"}
        />
      </View>
    </EScreen>
  );
});

const styles = StyleSheet.create({});
