import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = "#2E384D" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.5 10A2.507 2.507 0 002 12.5C2 13.875 3.125 15 4.5 15S7 13.875 7 12.5 5.875 10 4.5 10zm15 0a2.507 2.507 0 00-2.5 2.5c0 1.375 1.125 2.5 2.5 2.5s2.5-1.125 2.5-2.5-1.125-2.5-2.5-2.5zM12 10a2.507 2.507 0 00-2.5 2.5c0 1.375 1.125 2.5 2.5 2.5s2.5-1.125 2.5-2.5S13.375 10 12 10z"
        fill={color}
      />
    </Svg>
  )
}

const MoreSvg = React.memo(SvgComponent)
export { MoreSvg }
