import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextStyle } from "react-native";
import { RowView } from "./RowView";
import { MinusSvg } from "@/assets/svg/MinusSvg";
import { PlusSvg } from "@/assets/svg/PlusSvg";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";

interface AddQuantityViewProps {
  onChangeQuantity: (quatity: number) => void;
  value: number;
  minValue?: number;
  textStyle?: TextStyle;
}

export const AddQuantityView = ({
  onChangeQuantity,
  value,
  minValue = 0,
  textStyle,
}: AddQuantityViewProps) => {
  const onAdd = () => {
    onChangeQuantity(value + 1);
  };

  const onMinus = () => {
    if (value <= minValue) {
      return;
    }
    onChangeQuantity(value - 1);
  };

  return (
    <RowView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onMinus}
        disabled={value <= minValue}
      >
        <MinusSvg
          size={32}
          color={value <= minValue ? colors.secondaryText : colors.primary}
        />
      </TouchableOpacity>
      <Typography
        align="center"
        colorPreset="primaryText"
        preset="mediumTitle"
        style={{ marginHorizontal: 8, minWidth: 130, ...textStyle }}
      >
        {value}
      </Typography>
      <TouchableOpacity activeOpacity={0.8} onPress={onAdd}>
        <PlusSvg size={32} color={colors.primary} />
      </TouchableOpacity>
    </RowView>
  );
};
