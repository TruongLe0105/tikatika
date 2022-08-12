import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M9.007 7.2v9.59c0 3.21 2 5.21 5.2 5.21h2.59c3.2 0 5.2-2 5.2-5.2V7.2c.01-3.2-1.99-5.2-5.19-5.2h-2.6c-3.2 0-5.2 2-5.2 5.2z"
        fill="#FD6C9F"
      />
      <Path
        d="M5.577 8.12l-3.35 3.35c-.29.29-.29.77 0 1.06l3.35 3.35c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-2.07-2.07h10.69c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H4.567l2.07-2.07c.15-.15.22-.34.22-.53s-.07-.39-.22-.53c-.29-.3-.76-.3-1.06 0z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}

const RightMenuLogoutSvg = React.memo(SvgComponent);
export { RightMenuLogoutSvg };
