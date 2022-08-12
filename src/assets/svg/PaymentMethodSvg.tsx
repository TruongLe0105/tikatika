import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M22 9v7.46c0 2.29-1.86 4.14-4.15 4.14H6.15C3.86 20.6 2 18.75 2 16.46V9h20z"
        fill={color}
      />
      <Path
        d="M22 7.54V9H2V7.54C2 5.25 3.86 3.4 6.15 3.4h11.7C20.14 3.4 22 5.25 22 7.54zM8 17.25H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75s-.34.75-.75.75zM14.5 17.25h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill={color}
      />
    </Svg>
  );
}

const PaymentMethodSvg = React.memo(SvgComponent);
export { PaymentMethodSvg };
