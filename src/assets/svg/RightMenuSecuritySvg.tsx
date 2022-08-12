import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M18.33 5.67L6.59 17.41c-.44.44-1.18.38-1.54-.14-1.24-1.81-1.97-3.95-1.97-6.15V6.73c0-.82.62-1.75 1.38-2.06l5.57-2.28a5.12 5.12 0 013.92 0l4.04 1.65c.67.27.84 1.13.34 1.63z"
        fill="#FD6C9F"
      />
      <Path
        d="M19.27 7.04c.65-.55 1.64-.08 1.64.77v3.31c0 4.89-3.55 9.47-8.4 10.81-.33.09-.69.09-1.03 0a11.3 11.3 0 01-3.87-1.95c-.48-.37-.53-1.07-.11-1.5 2.18-2.23 8.56-8.73 11.77-11.44z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}

const RightMenuSecuritySvg = React.memo(SvgComponent);
export { RightMenuSecuritySvg };