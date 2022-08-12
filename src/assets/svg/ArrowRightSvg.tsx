import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#9FA0A0" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.488 21h5.024C19.058 21 21 19.058 21 14.512V9.488C21 4.942 19.058 3 14.512 3H9.488C4.942 3 3 4.942 3 9.488v5.024C3 19.058 4.942 21 9.488 21zM4.256 9.488c0-3.86 1.373-5.232 5.232-5.232h5.024c3.86 0 5.232 1.373 5.232 5.232v5.024c0 3.86-1.373 5.232-5.232 5.232H9.488c-3.86 0-5.232-1.373-5.232-5.232V9.488zM10.5 15.4a.62.62 0 00.444.184.62.62 0 00.444-.184l2.955-2.955a.632.632 0 000-.888L11.39 8.601a.632.632 0 00-.888 0 .632.632 0 000 .887L13.013 12l-2.512 2.512a.632.632 0 000 .887z"
        fill={color}
      />
    </Svg>
  );
}

const ArrowRightSvg = React.memo(SvgComponent);
export { ArrowRightSvg };
