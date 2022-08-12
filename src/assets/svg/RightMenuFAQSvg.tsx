import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M17 18.43h-4l-4.45 2.96A.997.997 0 017 20.56v-2.13c-3 0-5-2-5-5v-6c0-3 2-5 5-5h10c3 0 5 2 5 5v6c0 3-2 5-5 5z"
        fill="#FD6C9F"
      />
      <Path
        d="M12 12.11c-.41 0-.75-.34-.75-.75v-.21c0-1.16.85-1.73 1.17-1.95.37-.25.49-.42.49-.68 0-.5-.41-.91-.91-.91s-.91.41-.91.91c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-1.33 1.08-2.41 2.41-2.41s2.41 1.08 2.41 2.41c0 1.14-.84 1.71-1.15 1.92-.39.26-.51.43-.51.71v.21c0 .42-.34.75-.75.75zM12 14.6a.749.749 0 11-.002-1.498A.749.749 0 0112 14.6z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}

const RightMenuFAQSvg = React.memo(SvgComponent);
export { RightMenuFAQSvg };
