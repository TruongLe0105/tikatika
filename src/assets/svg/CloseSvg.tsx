import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent({ size = 20, color = "#fff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.85 4.704c.2-.2.2-.526 0-.727l-.827-.826c-.2-.201-.526-.201-.727 0L9.5 8.946 3.704 3.151c-.2-.201-.526-.201-.727 0l-.826.826c-.201.2-.201.526 0 .727L7.946 10.5l-5.795 5.796c-.201.2-.201.526 0 .727l.826.826c.2.201.526.201.727 0L9.5 12.054l5.796 5.795c.2.201.526.201.727 0l.826-.826c.201-.2.201-.526 0-.727L11.054 10.5l5.795-5.796z"
        fill={color}
      />
    </Svg>
  );
}

const CloseSvg = React.memo(SvgComponent)
export { CloseSvg }
