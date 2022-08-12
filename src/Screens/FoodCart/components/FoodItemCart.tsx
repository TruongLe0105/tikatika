/**
 * Hiển thi món ăn, có cả trạng thái hết món
 * @param {Food} food
 * @param {Function}  onChangeQuantity
 */

import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { AddQuantityView } from "@/components/View/AddQuantityView";
import { RowView } from "@/components/View/RowView";
import { Food } from "@/types/food-order";
import { formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FoodItemCartProps = {
  food: Food;
  onChangeQuantity: (food, quantity) => void;
};

export const FoodItemCart = observer(
  ({ food, onChangeQuantity }: FoodItemCartProps) => {
    return (
      <RowView>
        <View
          style={{
            height: 80,
            aspectRatio: 1,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <EImage source={{ uri: food.thumbnail }} />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Typography preset="mediumLabel" color="#000" numberOfLines={2}>
            {food.name}
          </Typography>

          <RowView
            justifyContent="space-between"
            style={{ flex: 1, alignItems: "flex-end" }}
          >
            <View>
              <Typography preset="smallLabel" colorPreset="error">
                {formatNumber(food.finalPrice)}đ
              </Typography>
              {!isEqual(food.finalPrice, food.originPrice) && (
                <Typography
                  preset="superSmallParagraph"
                  colorPreset="regularText"
                  lineHeight={12}
                  style={{ marginTop: 4, textDecorationLine: "line-through" }}
                >
                  {formatNumber(food.originPrice)}đ
                </Typography>
              )}
            </View>

            <AddQuantityView
              value={food.quantity}
              onChangeQuantity={(quantity) => onChangeQuantity(food, quantity)}
              textStyle={{ minWidth: 40 }}
            />
          </RowView>
        </View>
      </RowView>
    );
  }
);
