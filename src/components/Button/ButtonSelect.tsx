import { colors } from "@/styles/theme";
import { isEqual } from "lodash";
import React from "react";
import { View, Text, Pressable, ViewStyle } from "react-native";
import Typography from "../Text/Typography";

interface Props {
  selected?: boolean;
  onPress: (data) => void;
  data: any;
  label: string;
  style?: ViewStyle;
}

export const ButtonSelect = React.memo(
  ({ data, selected, onPress, label, style }: Props) => {
    return (
      <Pressable
        onPress={() => onPress(data)}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 50,
          backgroundColor: selected ? colors.primary : "#fff",
          borderColor: colors.regularText,
          borderWidth: selected ? 0 : 1,
          ...style,
        }}
      >
        <Typography
          preset="smallButton"
          color={selected ? "#fff" : colors.primaryText}
        >
          {label}
        </Typography>
      </Pressable>
    );
  },
  (prev, next) => isEqual(prev, next)
);
