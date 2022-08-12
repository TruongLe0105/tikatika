/**
 * Hiển thị category item
 *  @param {FoodCategory} foodCategory
 */

import { ShadowCard } from "@/components/Card/ShadowCard";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, colors } from "@/styles/theme";
import { FoodCategory } from "@/types/category";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CategoryItemProps = {
  foodCategory: FoodCategory;
  onPress: (foodCategory: FoodCategory) => void;
};

export const CategoryItem = ({ foodCategory, onPress }: CategoryItemProps) => {
  return (
    <Pressable onPress={() => onPress(foodCategory)}>
      <ShadowCard
        style={{
          margin: 8,
          padding: 8,
          borderRadius: 8,
          flex: 1,
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            overflow: "hidden",
            borderRadius: 8,
          }}
        >
          <EImage source={{ uri: foodCategory.thumbnail }} />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: colors.mask,
            }}
          />
        </View>
        <View style={{ height: 66, width: "100%", ...alignJustify() }}>
          <Typography preset="smallTitle" color="#fff" align="center">
            {foodCategory.name}
          </Typography>
        </View>
      </ShadowCard>
    </Pressable>
  );
};
