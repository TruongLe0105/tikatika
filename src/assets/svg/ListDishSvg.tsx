import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function ListDishSvg({ size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M18.67 2h-1.9c-2.18 0-3.33 1.15-3.33 3.33v1.9c0 2.18 1.15 3.33 3.33 3.33h1.9c2.18 0 3.33-1.15 3.33-3.33v-1.9C22 3.15 20.85 2 18.67 2zM7.24 13.43h-1.9C3.15 13.43 2 14.58 2 16.76v1.9C2 20.85 3.15 22 5.33 22h1.9c2.18 0 3.33-1.15 3.33-3.33v-1.9c.01-2.19-1.14-3.34-3.32-3.34z"
        fill="#FD6C9F"
      />
      <Path
        d="M6.29 10.58a4.29 4.29 0 100-8.58 4.29 4.29 0 000 8.58zM17.71 22a4.29 4.29 0 100-8.58 4.29 4.29 0 000 8.58z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}
