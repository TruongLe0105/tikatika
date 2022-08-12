import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M9.99 17.98A7.99 7.99 0 109.99 2a7.99 7.99 0 000 15.98z"
        fill={color}
      />
      <Path
        d="M21.97 15.99c0 3.3-2.68 5.98-5.98 5.98a5.97 5.97 0 01-4.91-2.57 9.458 9.458 0 008.32-8.32 5.97 5.97 0 012.57 4.91zM11.45 9.71l-2.4-.84c-.24-.08-.29-.1-.29-.45 0-.26.18-.47.41-.47h1.5c.32 0 .58.29.58.65 0 .41.34.75.75.75s.75-.34.75-.75c0-1.15-.89-2.09-2-2.14v-.05a.749.749 0 10-1.5 0v.05h-.09c-1.05 0-1.91.88-1.91 1.97 0 .95.42 1.56 1.29 1.86l2.41.84c.24.08.29.1.29.45 0 .26-.18.47-.41.47h-1.5c-.32 0-.58-.29-.58-.65 0-.41-.34-.75-.75-.75s-.75.34-.75.75c0 1.15.89 2.09 2 2.14v.06c0 .41.34.75.75.75s.75-.34.75-.75v-.05h.09c1.05 0 1.91-.88 1.91-1.97 0-.95-.43-1.56-1.3-1.87z"
        fill={color}
      />
    </Svg>
  );
}

const PointSvg = React.memo(SvgComponent);
export { PointSvg };
