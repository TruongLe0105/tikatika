/**
 * Hiển thi món ăn, có cả trạng thái hết món
 * @param {Food} food
 * @param {Function}  onPressAdd
 * @param {boolean} isClosed // trạng thái quán đóng hay mở
 */

import { PlusSvg } from "@/assets/svg/PlusSvg";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import appStore from "@/store/appStore";
import { Food } from "@/types/food-order";
import { formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FoodItemProps = {
  food: Food;
  onPressAdd: (food) => void;
  isClosed?: boolean;
};

export const FoodItem = ({ food, onPressAdd, isClosed }: FoodItemProps) => {
  return (
    <RowView>
      <View
        style={{
          height: 100,
          aspectRatio: 1,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <EImage source={{ uri: food.thumbnail }} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Typography preset="smallTitle" color="#000" numberOfLines={2}>
          {food.name}
        </Typography>
        <Typography
          preset="smallParagraph"
          colorPreset="regularText"
          numberOfLines={2}
          style={{ marginTop: 4 }}
        >
          {food.description}
        </Typography>

        <RowView
          justifyContent="space-between"
          style={{ flex: 1, alignItems: "flex-end" }}
        >
          <RowView>
            <Typography preset="mediumButton" colorPreset="error">
              {formatNumber(food.finalPrice)}đ
            </Typography>
            {!isEqual(food.finalPrice, food.originPrice) && (
              <Typography
                preset="superSmallParagraph"
                colorPreset="regularText"
                lineHeight={12}
                style={{ marginLeft: 8, textDecorationLine: "line-through" }}
              >
                {formatNumber(food.originPrice)}đ
              </Typography>
            )}
          </RowView>

          {!isClosed && (
            <Pressable hitSlop={50} onPress={() => onPressAdd(food)}>
              <PlusSvg size={32} />
            </Pressable>
          )}
        </RowView>
      </View>
    </RowView>
  );
};

const styles = StyleSheet.create({});
