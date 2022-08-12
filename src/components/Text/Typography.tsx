import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { fontFamily } from "@/styles/theme";
import { flatten, mergeAll } from "ramda";
import { presets } from "./text.presets";
import { colors } from "./text.colors";
import { TextProps } from "./text.props";

export default React.memo((props: TextProps) => {
  const {
    preset = "default",
    text,
    children,
    colorPreset,
    family,
    transform,
    align,
    color,
    size,
    lineHeight,
    style: styleOverride,
    ...rest
  } = props;

  // figure out which content to use
  const content = text || children;

  const customerStyle: TextStyle[] = [
    size && { fontSize: size },
    lineHeight != null && { lineHeight },
    transform && { textTransform: transform },
    family && { fontFamily: fontFamily[family] },
    align && { textAlign: align },
    color && { color },
  ];

  const style = mergeAll(
    flatten([
      presets[preset] || presets.default,
      colors[colorPreset],
      ...customerStyle,
      styleOverride,
    ])
  );

  return (
    <Text {...rest} maxFontSizeMultiplier={1} style={style}>
      {content}
    </Text>
  );
});
