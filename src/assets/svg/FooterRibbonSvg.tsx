import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={(size * 8) / 24} viewBox="0 0 24 8" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0h12L0 8V0zm12 0l12 8V0H12z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}

const FooterRibbonSvg = React.memo(SvgComponent);
export { FooterRibbonSvg };
