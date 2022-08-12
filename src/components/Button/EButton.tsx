import * as React from "react";
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from "react-native";
import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import { REM } from "@/styles/dimensions";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";
import { border as Border } from "@/styles/border";
import { RowView } from "../View/RowView";
import { TextProps } from "../Text/text.props";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  border?: boolean;
  color?: string[];
  componentRight?: React.ReactNode;
  componentLeft?: React.ReactNode;
  textProps?: TextProps;
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  startGradient?: LinearGradientPoint;
  endGradient?: LinearGradientPoint;
  linearGradient?: boolean;
  loading?: boolean;
  activityColor?: string;
}

export const EButton = React.memo(
  ({
    text,
    border,
    loading,
    componentRight,
    componentLeft,
    color = [colors.primary, colors.primary],
    startGradient = [0, 0],
    endGradient = [1, 0],
    textProps,
    textStyle,
    containerStyle,
    linearGradient = false,
    activityColor = "#fff",
    ...props
  }: ButtonProps) => {
    let textColor = "#fff";
    if (border) {
      textColor = color[0];
    }
    // if (props.disabled) {
    //   textColor = colors.regularText;
    // }

    let Component = linearGradient ? LinearGradient : View;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        {...props}
        disabled={loading || props.disabled}
      >
        <Component
          colors={color}
          start={linearGradient ? startGradient : null}
          end={linearGradient ? endGradient : null}
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: color[0],
            },
            border && {
              backgroundColor: "transparent",
              ...Border(1, color[0]),
            },
            props.disabled && {
              opacity: 0.5,
              // backgroundColor: colors.borderBase,
              // ...Border(1, colors.secondaryText),
            },
            containerStyle,
          ]}
        >
          {componentLeft}
          <RowView>
            {loading && <ActivityIndicator color={activityColor} />}
            {text && (
              <Typography
                preset="mediumButton"
                color={textColor}
                align="center"
                {...textProps}
                style={{
                  marginLeft: componentLeft && 4,
                  marginRight: componentRight && 4,
                  ...textStyle,
                }}
              >
                {text}
              </Typography>
            )}
          </RowView>

          {componentRight}
        </Component>
      </TouchableOpacity>
    );
  }
);
