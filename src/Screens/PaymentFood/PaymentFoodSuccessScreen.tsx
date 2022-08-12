/**
 * Màn hình thanh toán hoặc đặt đơn food thành công
 * using foodOrderStore.selected
 */

import { CartTickSvg } from "@/assets/svg/CartTickSvg";
import { TabbarHistorySvg } from "@/assets/svg/TabbarHistorySvg";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EImage } from "@/components/Image/EImage";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { colors } from "@/styles/theme";
import { FoodShop } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { formatNumber } from "@/utils/helper";
import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const PaymentFoodSuccessScreen = observer(() => {
  useEffect(() => {
    return () => {
      foodOrderStore.resetCart();
      foodOrderStore.resetOrder();
      foodOrderStore.setPromotion(null);
    };
  }, []);

  const handleNext = () => {
    Navigation.navigate(ScreenName.Category);
  };

  const handleDetail = () => {
    Navigation.navigate(ScreenName.FoodOrderDetail);
  };

  return (
    <EScreen
      hideHeader
      edges={["bottom", "top"]}
      style={{ flex: 1, paddingVertical: 16 }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ alignItems: "center", marginTop: 64 }}>
            <CartTickSvg size={56} />
            <Typography
              preset="mediumTitle"
              color="#000"
              style={{ marginTop: 24 }}
            >
              Đặt đơn thành công
            </Typography>
            <Typography
              preset="mediumParagraph"
              colorPreset={"regularText"}
              align="center"
              style={{ marginTop: 8 }}
            >
              Hệ thống đã gửi thông báo đến quán và tài xế. Vui lòng giữ điện
              thoại để nhận đơn hàng.
            </Typography>
          </View>
          {/* Hiển thị thông tin quán, món, số tiền */}
          <FoodShopInfoCard
            totalFood={foodOrderStore.totalFoodInCart}
            moneyFinal={foodOrderStore.resultEst.moneyFinal}
            foodShop={foodOrderStore.selectedShop}
          />

          <Typography
            preset="smallLabel"
            colorPreset="secondaryText"
            align="center"
            style={{ marginTop: 16 }}
          >
            Vui lòng thanh toán{" "}
            <Typography preset="smallLabel" colorPreset="error">
              {formatNumber(
                foodOrderStore.order.isUseBalancePromotion
                  ? 0
                  : foodOrderStore.resultEst.moneyFinal
              )}{" "}
              đ
            </Typography>{" "}
            khi nhận đồ ăn.
          </Typography>
        </View>

        <View style={{ marginTop: 24, alignItems: "center" }}>
          <View
            style={{
              height: 1,
              backgroundColor: colors.background,
              width: "100%",
              position: "absolute",
              top: "50%",
            }}
          />
          <ShadowCard
            style={{
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Navigation.pop(4);
                setTimeout(() => {
                  Navigation.navigate(ScreenName.FoodOrderDetail);
                }, 1 * 1000);
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TabbarHistorySvg selected />
              <Typography
                preset="smallLabel"
                color="#000"
                style={{ marginLeft: 8 }}
              >
                Theo dõi đơn
              </Typography>
            </TouchableOpacity>
          </ShadowCard>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <EButton text="Tiếp tục order đơn mới" onPress={handleNext} />
      </View>
    </EScreen>
  );
});

type FoodShopInfoProps = {
  foodShop: FoodShop;
  moneyFinal: number;
  totalFood: number; //tổng món ăn
};

const FoodShopInfoCard = ({
  foodShop,
  moneyFinal,
  totalFood,
}: FoodShopInfoProps) => {
  return (
    <ShadowCard
      style={{ flexDirection: "row", alignItems: "center", marginTop: 24 }}
    >
      <View
        style={{
          height: 80,
          aspectRatio: 1,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <EImage source={{ uri: foodShop?.thumbnail }} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 8 }}>
        <Typography preset="smallTitle" color="#000" numberOfLines={2}>
          {foodShop?.name}
        </Typography>

        <RowView
          justifyContent="space-between"
          alignItems="flex-end"
          style={{ flex: 1 }}
        >
          <Typography preset="smallParagraph" colorPreset="regularText">
            {formatNumber(totalFood)} món
          </Typography>
          <Typography preset="mediumButton" colorPreset="error">
            {formatNumber(moneyFinal)} đ
          </Typography>
        </RowView>
      </View>
    </ShadowCard>
  );
};
