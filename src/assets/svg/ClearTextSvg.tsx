import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21c-4.965 0-9-4.035-9-9s4.035-9 9-9 9 4.035 9 9-4.035 9-9 9zm0-16.744C7.73 4.256 4.256 7.73 4.256 12S7.73 19.744 12 19.744 19.744 16.27 19.744 12 16.27 4.256 12 4.256zM9.63 14.997a.62.62 0 01-.443-.184.632.632 0 010-.887L11.113 12l-1.926-1.926a.632.632 0 010-.887.632.632 0 01.887 0L12 11.113l1.926-1.926a.632.632 0 01.887 0 .632.632 0 010 .887L12.887 12l1.926 1.926a.632.632 0 010 .887.62.62 0 01-.444.184.62.62 0 01-.443-.184L12 12.887l-1.926 1.926a.607.607 0 01-.443.184z"
        fill="#9FA0A0"
      />
    </Svg>
  );
}

const ClearTextSvg = React.memo(SvgComponent);
export { ClearTextSvg };
