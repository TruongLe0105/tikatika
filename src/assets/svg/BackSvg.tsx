import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22.875c6.006 0 10.875-4.869 10.875-10.875S18.006 1.125 12 1.125 1.125 5.994 1.125 12 5.994 22.875 12 22.875zM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
        fill="#FF8080"
      />
      <Path
        d="M14.31 7.495a.625.625 0 00-.885 0L9.27 11.65a.498.498 0 000 .705l4.155 4.155a.625.625 0 10.885-.885L10.69 12l3.625-3.625c.24-.24.24-.64-.005-.88z"
        fill="#B30000"
      />
    </Svg>
  )
}

const BackSvg = React.memo(SvgComponent)
export { BackSvg }
