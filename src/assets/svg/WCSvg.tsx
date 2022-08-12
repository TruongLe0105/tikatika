import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 36, active = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={active ? '#F44336' : "#C8D2DD"}>
        <Path d="M18.579 30.353h-1.25c-1.52 0-2.993-.284-4.36-.808l-.804 5.24A1.055 1.055 0 0013.208 36H22.7c.646 0 1.14-.576 1.043-1.215l-.804-5.24a12.16 12.16 0 01-4.36.808zM27.953 21.52H7.955c-.048 0-.096-.003-.144-.004 1.386 3.92 5.124 6.727 9.518 6.727h1.25c4.394 0 8.132-2.808 9.518-6.727l-.144.003zM28.978 4.557h-1.53A4.286 4.286 0 0023.173 0H12.736a4.287 4.287 0 00-4.25 4.846l1.115 8.477h16.706l.875-6.656h1.796a1.055 1.055 0 000-2.11zM27.953 19.41H7.955a1.988 1.988 0 010-3.977h19.998a1.988 1.988 0 110 3.976z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h36v36H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

const WCSvg = React.memo(SvgComponent)
export { WCSvg }
