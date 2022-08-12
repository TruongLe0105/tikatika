import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = "#2E384D" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.65 10a5.998 5.998 0 00-6.88-3.88c-2.29.46-4.15 2.29-4.63 4.58A6.006 6.006 0 007 18a5.99 5.99 0 005.65-4H17v2c0 1.1.9 2 2 2s2-.9 2-2v-2c1.1 0 2-.9 2-2s-.9-2-2-2h-8.35zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fill={color}
      />
    </Svg>
  )
}

const PasswordSvg = React.memo(SvgComponent)
export { PasswordSvg }
