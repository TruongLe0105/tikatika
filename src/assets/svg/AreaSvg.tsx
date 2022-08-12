import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = "#2E384D" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 5v15c0 .55.45 1 1 1s1-.45 1-1V6c0-.55.45-1 1-1h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2zm16 4h2V7h-2v2z"
        fill={color}
      />
    </Svg>
  )
}

const AreaSvg = React.memo(SvgComponent)
export { AreaSvg }
