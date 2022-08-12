import { colors } from "@/styles/theme";
import * as React from "react";
import Svg, { Path, G, Circle, Defs, ClipPath } from "react-native-svg";

export function DestinationPointSvg({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 0C5.864 0 2.5 3.364 2.5 7.5c0 5.199 6.77 12.029 7.057 12.317a.628.628 0 00.886 0C10.73 19.53 17.5 12.7 17.5 7.5 17.5 3.364 14.136 0 10 0z"
        fill={colors.primary}
      />
      <Path
        d="M10 11.25a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
        fill="#fff"
      />
    </Svg>
  );
}
