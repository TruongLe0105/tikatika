/**
 * Hiển thị món ăn trong mh thanh toán và chi tiết của 1 đơn fod
 * @param {Food} food
 */

import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { Food } from "@/types/food-order";
import { formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FoodItemPaymentProps = {
  food: Food;
};

export const FoodItemPayment = React.memo(
  ({ food }: FoodItemPaymentProps) => {
    return (
      <RowView>
        <View
          style={{
            height: 60,
            aspectRatio: 1,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <EImage source={{ uri: food.thumbnail || food.product?.thumbnail }} />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Typography preset="mediumLabel" color="#000" numberOfLines={2}>
            {food.name || food.product?.name}
          </Typography>

          <RowView
            justifyContent="space-between"
            alignItems="flex-end"
            style={{ flex: 1 }}
          >
            <Typography
              preset="smallParagraph"
              colorPreset="regularText"
              lineHeight={12}
            >
              {formatNumber(food.finalPrice)} đ x {food.quantity}
            </Typography>
            <Typography
              preset="smallParagraph"
              colorPreset="error"
              lineHeight={12}
            >
              {formatNumber(food.finalPrice * food.quantity)} đ
            </Typography>
          </RowView>
        </View>
      </RowView>
    );
  },
  (prev, next) => isEqual(prev, next)
);
