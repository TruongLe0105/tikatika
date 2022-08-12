import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M7.11 5.96l9.02-3.01c4.05-1.35 6.25.86 4.91 4.91l-3.01 9.02c-2.02 6.07-5.34 6.07-7.36 0l-.89-2.68-2.68-.89c-6.06-2.01-6.06-5.32.01-7.35z"
        fill={color}
      />
      <Path
        d="M12.12 11.63l3.81-3.82-3.81 3.82zM12.12 12.38c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l3.8-3.82c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-3.8 3.82c-.15.14-.34.22-.53.22z"
        fill={color}
      />
    </Svg>
  );
}

const SentSvg = React.memo(SvgComponent);
export { SentSvg };
