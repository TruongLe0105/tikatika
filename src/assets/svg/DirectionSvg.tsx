import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.594 11.185L12.814.406a1.158 1.158 0 00-1.676 0L.36 11.186a1.158 1.158 0 000 1.676L11.14 23.64a1.158 1.158 0 001.676 0l10.779-10.78c.479-.478.479-1.197 0-1.676z"
        fill="#F44336"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.372 15.018v-2.995h-4.79v3.593H7.185v-4.79c0-.719.479-1.198 1.198-1.198h5.988V6.634l4.192 4.192-4.192 4.192z"
        fill="#fff"
      />
    </Svg>
  )
}

const DirectionSvg = React.memo(SvgComponent)
export { DirectionSvg }
