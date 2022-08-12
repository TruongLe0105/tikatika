/**
 * Danh sách món ăn đã chọn và tên quán
 * @param {Food[]} foods
 * @param {FoodShop} foodShop
 */

import { StoreSvg } from "@/assets/svg/StoreSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { Food } from "@/types/food-order";
import { FoodShop } from "@/types/food-order";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FoodItemPayment } from "./FoodItemPayment";

type FoodListPaymentProps = {
  foods: Food[];
  foodShop: FoodShop;
};

export const FoodListPayment = ({ foods, foodShop }: FoodListPaymentProps) => {
  return (
    <View>
      <RowView>
        <StoreSvg />
        <Typography
          preset="mediumLabel"
          colorPreset="primary"
          style={{ marginLeft: 8 }}
        >
          {foodShop?.name}
        </Typography>
      </RowView>
      <FlatList
        data={foods}
        style={{ marginTop: 12 }}
        scrollEnabled={false}
        renderItem={({ item }) => <FoodItemPayment food={item} />}
        keyExtractor={(item, index) => item.id?.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: colors.background,
              marginVertical: 12,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
