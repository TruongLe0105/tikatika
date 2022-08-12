import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function AvatarDefault({ size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        opacity={0.4}
        d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
        fill="#D7D9D9"
      />
      <Path
        d="M20 9.86c-4.14 0-7.5 3.36-7.5 7.5 0 4.06 3.18 7.36 7.4 7.48h.36a7.486 7.486 0 007.24-7.48c0-4.14-3.36-7.5-7.5-7.5zM33.56 34.7C30 37.98 25.24 40 20 40s-10-2.02-13.56-5.3c.48-1.82 1.78-3.48 3.68-4.76 5.46-3.64 14.34-3.64 19.76 0 1.92 1.28 3.2 2.94 3.68 4.76z"
        fill="#D7D9D9"
      />
    </Svg>
  );
}
