import * as React from "react";
import Svg, { Path, G, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 27" fill="none">
      <Path
        opacity={0.6}
        d="M11.97 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
        fill="#FD6C9F"
      />
      <G filter="url(#prefix__filter0_d)">
        <Path
          d="M14.97 10.23l-2.9-1.67c-.72-.42-1.59-.42-2.31 0s-1.15 1.16-1.15 2v3.35c0 .83.43 1.58 1.15 2a2.285 2.285 0 002.3 0l2.9-1.67c.72-.42 1.15-1.16 1.15-2 .02-.84-.41-1.59-1.14-2.01z"
          fill="#fff"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

const PlaySvg = React.memo(SvgComponent);
export { PlaySvg };
