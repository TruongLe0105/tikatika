import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function InformationSvg({ size = 25, color = "#000" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25">
      <Path
        d="M12.5 0C5.594 0 0 5.594 0 12.5S5.594 25 12.5 25 25 19.406 25 12.5 19.406 0 12.5 0zm1.25 18.75h-2.5v-7.5h2.5v7.5zm0-10h-2.5v-2.5h2.5v2.5z"
        fill={color}
      />
    </Svg>
  );
}
