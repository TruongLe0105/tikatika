import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export function SendSvg({ size = 24, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={color}>
        <Path d="M22.903.085a.75.75 0 011.089.776l-2.75 18.5a.754.754 0 01-.742.64.767.767 0 01-.242-.04L9.775 16.376 20.083 3.958 6.762 15.348.507 13.21a.75.75 0 01-.104-1.375l22.5-11.75zM8.75 22.25v-4.638l4.067 1.39-2.713 3.692a.75.75 0 01-1.354-.444z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h24v24H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
