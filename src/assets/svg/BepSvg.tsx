import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 36, active = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.714 14.929h1.572V16.5h1.571v-1.571H11V16.5h1.571v-1.571h3.143V16.5h1.572v-1.571h1.571v-1.572H4.714v1.572zM44 26.842l-2.924-8.77H2.924L0 26.841v.658h44v-.658zm-32.214-.913a3.143 3.143 0 110-6.286 3.143 3.143 0 010 6.286zm20.428 0a3.143 3.143 0 110-6.287 3.143 3.143 0 010 6.287zm-20.428-4.715a1.566 1.566 0 00-1.353.786h2.706a1.566 1.566 0 00-1.353-.786zm20.428 0a1.566 1.566 0 00-1.353.786h2.706a1.566 1.566 0 00-1.353-.786zm1.353 2.358a1.566 1.566 0 01-1.353.785 1.566 1.566 0 01-1.353-.785h2.706zm-21.781.785a1.566 1.566 0 001.353-.785h-2.706c.278.484.794.784 1.353.785zm29.071 6.286V29.07h-3.143v1.572h3.143zM3.143 29.07v1.572h3.143V29.07H3.143zm22-15.714h14.143v1.572h-1.572V16.5h-1.571v-1.571H33V16.5h-1.571v-1.571h-3.143V16.5h-1.572v-1.571h-1.571v-1.572z"
        fill={active ? '#F44336' : "#C8D2DD"}
      />
    </Svg>
  )
}

const BepSvg = React.memo(SvgComponent)
export { BepSvg }
