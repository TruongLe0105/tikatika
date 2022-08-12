import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = "#2E384D" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 21.53l1.11 1.11H0v-2.58c0-3.432 6.876-5.16 10.32-5.16.413 0 .787.026 1.29.077l-1.084 1.058a3.866 3.866 0 00-.026 5.495zm4.98-14.37c0 2.85-2.31 5.16-5.16 5.16-2.851 0-5.16-2.31-5.16-5.16S7.469 2 10.32 2c2.85 0 5.16 2.31 5.16 5.16zm-2.98 12.5l2.67 2.696a1.3 1.3 0 001.832 0l6.63-6.682c.49-.49.49-1.29 0-1.793l-.013-.013a1.285 1.285 0 00-1.818 0l-5.715 5.753-1.767-1.767a1.269 1.269 0 00-1.806 0l-.013.013c-.49.49-.49 1.29 0 1.793z"
        fill={color}
      />
    </Svg>
  )
}

const AvatarKYCSvg = React.memo(SvgComponent)
export { AvatarKYCSvg }
