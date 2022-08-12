/**
 * Danh sách món đã chọn
 * @param {Food} foods
 */

import { ListDishSvg } from "@/assets/svg/ListDishSvg";
import { StoreSvg } from "@/assets/svg/StoreSvg";
import { EButton } from "@/components/Button/EButton";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { FoodItemPayment } from "@/Screens/PaymentFood/components/FoodItemPayment";
import { Food, OrderFoodStatus } from "@/types/food-order";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type SelectedFoodListProps = {
  foods: Food[];
  status: string;
  onPress: () => void;
  loadingSubmit: boolean;
};

export const SelectedFoodList = React.memo(
  ({ foods, status, onPress, loadingSubmit }: SelectedFoodListProps) => {
    return (
      <View>
        <RowView>
          <ListDishSvg size={24} />
          <Typography
            preset="mediumLabel"
            colorPreset="primary"
            style={{ marginLeft: 8 }}
          >
            Các món đã đặt
          </Typography>
        </RowView>
        {(status == OrderFoodStatus.Complete ||
          status == OrderFoodStatus.DriverCancel ||
          status == OrderFoodStatus.AdminCancel ||
          status == OrderFoodStatus.CustomerCancel) && (
          <EButton
            loading={loadingSubmit}
            onPress={onPress}
            text="Đặt lại đơn này"
            style={{ marginTop: 8 }}
          />
        )}
        <FlatList
          data={foods}
          style={{ marginTop: 12 }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: "#D7D9D9",
                marginVertical: 12,
              }}
            ></View>
          )}
          renderItem={({ item }) => <FoodItemPayment food={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
);
