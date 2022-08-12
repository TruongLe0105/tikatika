import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 10 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 8" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.78.64a.75.75 0 010 1.06L4.11 7.36a.75.75 0 01-1.06 0L.22 4.53a.75.75 0 111.06-1.06l2.3 2.3L8.72.64a.75.75 0 011.06 0z"
        fill="#fff"
      />
    </Svg>
  );
}

const IconCheckSvg = React.memo(SvgComponent);
export { IconCheckSvg };
