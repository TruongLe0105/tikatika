import { RadioButtonSvg } from "@/assets/svg/RadioButtonSvg";
import { colors } from "@/styles/theme";
import { border } from "@/styles/border";
import React, { useEffect, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Typography from "../Text/Typography";
import { isEqual } from "lodash";

interface Props {
  isChecked?: boolean;
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const RadioButton = React.memo(
  ({ isChecked, label, onPress, style }: Props) => {
    const viewRef = useRef<any>(null);
    useEffect(() => {}, [isChecked]);

    const handlePress = () => {
      typeof onPress == "function" && onPress();
      viewRef.current.bounceIn(800);
    };

    return (
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 12,
          paddingVertical: 16,
          backgroundColor: colors.borderBase,
          borderRadius: 12,
          ...border(1, isChecked ? colors.regularText : colors.secondaryText),
          ...style,
        }}
        onPress={handlePress}
      >
        <Animatable.View ref={viewRef}>
          <RadioButtonSvg check={isChecked} />
        </Animatable.View>
        <Typography
          preset="largeLabel"
          colorPreset={"primaryText"}
          style={{ marginLeft: 10 }}
        >
          {label}
        </Typography>
      </Pressable>
    );
  },
  (prev, next) => isEqual(prev, next)
);
