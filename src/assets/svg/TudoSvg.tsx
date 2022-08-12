import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 36, active = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.235 7.059v2.407C34.822 10.062 40 15.614 40 22.353c0 7.136-5.806 12.941-12.941 12.941-7.136 0-12.941-5.805-12.941-12.941 0-6.74 5.178-12.29 11.764-12.887V7.059H23.53V4.706h7.06v2.353h-2.354zm-9.412 15.294c0 4.54 3.695 8.235 8.236 8.235 4.54 0 8.235-3.694 8.235-8.235 0-4.54-3.694-8.235-8.235-8.235-4.541 0-8.236 3.694-8.236 8.235zM0 14.118h11.765v2.353H0v-2.353zm3.53 14.117h9.411v2.353H3.53v-2.353zm8.235-9.412H5.882v2.354h5.883v-2.354zM0 23.53h10.588v2.353H0V23.53zm28.235-2.352v-4.588a5.9 5.9 0 014.588 4.588h-4.588zm-2.353-4.588a5.892 5.892 0 00-4.706 5.764 5.889 5.889 0 005.883 5.882 5.892 5.892 0 005.764-4.706h-6.94v-6.94z"
        fill={active ? '#F44336' : "#C8D2DD"}
      />
    </Svg>
  )
}

const TudoSvg = React.memo(SvgComponent)
export { TudoSvg }
