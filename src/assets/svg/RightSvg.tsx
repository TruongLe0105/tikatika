import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = "#2E384D" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.616 2.99a1.25 1.25 0 011.77 0l8.31 8.31c.39.39.39 1.02 0 1.41l-8.31 8.31c-.49.49-1.28.49-1.77 0a1.25 1.25 0 010-1.77l7.24-7.25-7.25-7.25c-.48-.48-.48-1.28.01-1.76z"
        fill={color}
      />
    </Svg>
  )
}

const RightSvg = React.memo(SvgComponent)
export { RightSvg }
