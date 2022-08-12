import * as React from "react";
import Svg, { Circle } from "react-native-svg";

export function StepWaitingSvg({ size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={6} fill="#D7D9D9" />
    </Svg>
  );
}
