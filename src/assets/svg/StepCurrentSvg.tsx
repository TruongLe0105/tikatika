import * as React from "react";
import Svg, { Circle } from "react-native-svg";

export function StepCurrentSvg({ size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle opacity={0.2} cx={12} cy={12} r={12} fill="#FD6C9F" />
      <Circle cx={12} cy={12} r={6} fill="#FD6C9F" />
    </Svg>
  );
}
