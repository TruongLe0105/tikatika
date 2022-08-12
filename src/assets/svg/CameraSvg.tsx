import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M13 3.25H7C3.58 3.25 2.25 4.58 2.25 8v8c0 2.3 1.25 4.75 4.75 4.75h6c3.42 0 4.75-1.33 4.75-4.75V8c0-3.42-1.33-4.75-4.75-4.75z"
        fill={color}
      />
      <Path
        d="M11.5 11.38a1.88 1.88 0 100-3.76 1.88 1.88 0 000 3.76zM21.65 6.17c-.41-.21-1.27-.45-2.44.37l-1.48 1.04c.01.14.02.27.02.42v8c0 .15-.02.28-.02.42l1.48 1.04c.62.44 1.16.58 1.59.58.37 0 .66-.1.85-.2.41-.21 1.1-.78 1.1-2.21V8.38c0-1.43-.69-2-1.1-2.21z"
        fill={color}
      />
    </Svg>
  );
}

const CameraSvg = React.memo(SvgComponent);
export { CameraSvg };
