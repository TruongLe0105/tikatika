import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 9.08V6.25c-.41 0-.75-.34-.75-.75V3.25H7C2.59 3.25 1.25 4.59 1.25 9v.5c0 .41.34.75.75.75.96 0 1.75.79 1.75 1.75S2.96 13.75 2 13.75c-.41 0-.75.34-.75.75v.5c0 4.41 1.34 5.75 5.75 5.75h2.25V18.5c0-.41.34-.75.75-.75v-2.83c-.41 0-.75-.34-.75-.75V9.83c0-.41.34-.75.75-.75z"
        fill={color}
      />
      <Path
        opacity={0.4}
        d="M20.25 12.5c0 .96.79 1.75 1.75 1.75.41 0 .75.34.75.75 0 4.41-1.34 5.75-5.75 5.75h-6.25V18.5c0-.41-.34-.75-.75-.75v-2.83c.41 0 .75-.34.75-.75V9.83c0-.41-.34-.75-.75-.75V6.25c.41 0 .75-.34.75-.75V3.25H17c4.41 0 5.75 1.34 5.75 5.75v1c0 .41-.34.75-.75.75-.96 0-1.75.79-1.75 1.75z"
        fill={color}
      />
    </Svg>
  );
}

const CouponSvg = React.memo(SvgComponent);
export { CouponSvg };
