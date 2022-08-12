import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export function StartPointSvg({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={10} fill="#2196F3" />
      <Circle cx={10} cy={10} r={5} fill="#fff" />
    </Svg>
  );
}
