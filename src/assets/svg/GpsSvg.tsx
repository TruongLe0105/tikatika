import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5.25a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z"
        fill={color}
      />
      <Path
        opacity={0.4}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM12 1.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM1.25 12a.75.75 0 01.75-.75h2a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zM12 19.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2a.75.75 0 01.75-.75zM19.25 12a.75.75 0 01.75-.75h2a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75z"
        fill={color}
      />
    </Svg>
  );
}

const GpsSvg = React.memo(SvgComponent);
export { GpsSvg };
