/**
 * Màn hình giỏ hàng đơn thức ăn
 */

import { CartSvg } from "@/assets/svg/CartSvg";
import { CartTabSvg } from "@/assets/svg/CartTabSvg";
import { Alert } from "@/components/Alert/Alert";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { NoResultView } from "@/components/View/NoResultView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { userStore } from "@/store/userStore";
import { alignJustify, colors } from "@/styles/theme";
import { Food } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { useIsFocused } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { observer } from "mobx-react";
import React, { useEffect, useMemo } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodCartButton } from "./components/FoodCartButton";
import { FoodItemCart } from "./components/FoodItemCart";

export const FoodCartScreen = observer(({ isTab = false }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("dark-content");
    }
  }, [isFocused]);

  const transformGroupData = useMemo(() => {
    return foodOrderStore.cart;
  }, [foodOrderStore.cart]);

  const handleChangeQuantity = (food: Food, quantity: number) => {
    if (quantity == 0) {
      return Alert.alert({
        title: "Cảnh báo",
        message: "Bạn có chắc chắn không muốn chọn món này?",
        buttonGroup: [
          {
            text: "Huỷ",
            style: "cancel",
          },
          {
            text: "Có",
            onPress: () => foodOrderStore.addToCart(food, quantity),
          },
        ],
      });
    }
    foodOrderStore.addToCart(food, quantity);
  };

  const handleSearch = () => {
    Navigation.navigate(ScreenName.Category);
  };

  const handleDetail = () => {
    const store = foodOrderStore.cart?.[0]?.store;
    foodOrderStore.setSelectedShop(store);
    Navigation.pop(2);
    Navigation.navigate(ScreenName.ShopDetail);
  };

  return (
    <EScreen
      headerTitle="Giỏ hàng"
      showHeaderTool={!isTab}
      edges={isTab ? ['left','right']: ["bottom"]}
      style={{ flex: 1, padding: 16 }}
    >
      <FlatList
        data={foodOrderStore.cart}
        renderItem={({ item }) => (
          <FoodItemCart onChangeQuantity={handleChangeQuantity} food={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: colors.background,
              marginVertical: 16,
            }}
          />
        )}
        ListHeaderComponent={
          foodOrderStore.cart.length != 0 && (
            <Typography
              preset="mediumLabel"
              color={"#000"}
              style={{ marginBottom: 16 }}
            >
              Các món đã chọn
            </Typography>
          )
        }
        ListFooterComponent={
          !isEmpty(foodOrderStore.selectedShop) &&
          foodOrderStore.cart.length != 0 && (
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
                  onPress={handleDetail}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <CartTabSvg color={colors.primary} selected />
                  <Typography
                    preset="smallLabel"
                    color="#000"
                    style={{ marginLeft: 8 }}
                  >
                    Tiếp tục order
                  </Typography>
                </TouchableOpacity>
              </ShadowCard>
            </View>
          )
        }
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View style={{ ...alignJustify(), flex: 1 }}>
            <NoResultView
              icon={<CartTabSvg selected color={colors.primary} size={48} />}
              title="Giỏ hàng trống"
              content={
                "Bấm nút tìm kiếm bên dưới để tìm món ngon cho hôm nay bạn nhé"
              }
            />
            <EButton
              onPress={handleSearch}
              text="Tìm kiếm món ngon"
              style={{ marginTop: 24 }}
            />
          </View>
        }
      />

      {foodOrderStore.cart.length != 0 && (
        <FoodCartButton
          onPress={() => {
            foodOrderStore.setEndAddressOrder(userStore.location);
            foodOrderStore.setSelectedShop(foodOrderStore.cart[0].store);
            Navigation.navigate(ScreenName.PaymentFood);
          }}
          title=""
          money={foodOrderStore.totalMoneyInCart}
        />
      )}
    </EScreen>
  );
});
