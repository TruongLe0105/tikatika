import { Text, View, ViewStyle, StyleProp } from "react-native";
import React from "react";
import Typography from "../Text/Typography";
import { alignJustify, colors } from "@/styles/theme";
import { border } from "@/styles/border";
import { isEqual } from "lodash";
import { RowView } from "../View/RowView";

interface Props {
  children?: React.ReactNode;
  text?: string | number;
  badgeColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  circle?: boolean;
  fill?: boolean;
  size?: number;
  isActive?: boolean;
}

export const EBadge = React.memo(
  ({
    children,
    text,
    badgeColor = colors.primary,
    textColor = "#fff",
    style,
    circle,
    fill,
    size = 21,
  }: Props) => {
    return (
      <RowView
        style={[
          {
            height: size,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: size / 2,
            backgroundColor: "transparent",
            ...border(1, badgeColor),
            ...alignJustify(),
          },
          circle && {
            aspectRatio: 1 / 1,
            paddingHorizontal: 0,
            paddingVertical: 0,
          },
          fill && {
            backgroundColor: badgeColor,
          },
          style,
        ]}
      >
        {children || (
          <Typography
            preset="superSmallLabel"
            color={fill ? textColor : badgeColor}
          >
            {text}
          </Typography>
        )}
      </RowView>
    );
  },
  (prev, next) => {
    return isEqual(prev, next);
  }
);
