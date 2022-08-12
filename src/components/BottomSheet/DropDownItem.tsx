import { CheckSvg } from "@/assets/svg/CheckSvg";
import { colors } from "@/styles/theme";
import { isEqual } from "lodash";
import React from "react";
import { View, Text, Pressable } from "react-native";
import Typography from "../Text/Typography";

interface Props {
  data: any;
  onPress: (data) => void;
  isSelected?: boolean;
  label: string;
}

export const DropDownItem = React.memo(
  ({ data, onPress, isSelected, label }: Props) => {
    return (
      <Pressable
        onPress={() => {
          onPress(data);
        }}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography preset="largeLabel" colorPreset="primaryText">
          {label}
        </Typography>
        {isSelected && <CheckSvg color={colors.primary} />}
      </Pressable>
    );
  },
  (prev, next) => isEqual(prev, next)
);
