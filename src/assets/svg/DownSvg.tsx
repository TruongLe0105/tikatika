import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = '#2E384D' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.88 9.29L12 13.17 8.12 9.29a.996.996 0 10-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 000-1.41c-.39-.38-1.03-.39-1.42 0z"
        fill={color}
      />
    </Svg>
  )
}

const DownSvg = React.memo(SvgComponent)
export { DownSvg }
