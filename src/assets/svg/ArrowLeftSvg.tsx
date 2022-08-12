import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({
  size = 24,
  borderColor = "#000",
  backgroundColor = "#fff",
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.512 21H9.488C4.942 21 3 19.058 3 14.512V9.488C3 4.942 4.942 3 9.488 3h5.024C19.058 3 21 4.942 21 9.488v5.024C21 19.058 19.058 21 14.512 21z"
        fill={backgroundColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.488 21h5.024C19.058 21 21 19.058 21 14.512V9.488C21 4.942 19.058 3 14.512 3H9.488C4.942 3 3 4.942 3 9.488v5.024C3 19.058 4.942 21 9.488 21zM4.256 9.488c0-3.86 1.373-5.232 5.232-5.232h5.024c3.86 0 5.232 1.373 5.232 5.232v5.024c0 3.86-1.373 5.232-5.232 5.232H9.488c-3.86 0-5.232-1.373-5.232-5.232V9.488zm9.562 5.911a.62.62 0 01-.444.184.62.62 0 01-.444-.184l-2.955-2.955a.632.632 0 010-.888l2.956-2.955a.632.632 0 01.887 0 .632.632 0 010 .887L11.306 12l2.512 2.512a.632.632 0 010 .887z"
        fill={borderColor}
      />
    </Svg>
  );
}

const ArrowLeftSvg = React.memo(SvgComponent);
export { ArrowLeftSvg };
