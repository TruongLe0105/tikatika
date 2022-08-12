import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12C1.25 6.086 6.086 1.25 12 1.25S22.75 6.086 22.75 12 17.914 22.75 12 22.75 1.25 17.914 1.25 12zM12 2.75c-5.086 0-9.25 4.164-9.25 9.25s4.164 9.25 9.25 9.25 9.25-4.164 9.25-9.25S17.086 2.75 12 2.75z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.78 8.64a.75.75 0 010 1.06l-5.67 5.66a.75.75 0 01-1.06 0l-2.83-2.83a.75.75 0 111.06-1.06l2.3 2.3 5.14-5.13a.75.75 0 011.06 0z"
        fill={color}
      />
    </Svg>
  );
}

const CheckSvg = React.memo(SvgComponent);
export { CheckSvg };
