import { colors } from "@/styles/theme";
import { isEqual } from "lodash";
import React from "react";
import { View, Text, ViewStyle } from "react-native";

interface Props {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const DotView = React.memo(
  ({ size = 4, color = colors.secondaryText, style }: Props) => {
    return (
      <View
        style={{
          height: size,
          aspectRatio: 1,
          borderRadius: size / 2,
          backgroundColor: color,
          ...style,
        }}
      />
    );
  },
  (prev, next) => isEqual(prev, next)
);
