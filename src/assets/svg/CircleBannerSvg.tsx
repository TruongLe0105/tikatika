import * as React from "react"
import Svg, { G, Ellipse, Defs, ClipPath, Path } from "react-native-svg"

function SvgComponent({ size = 20 }) {
  return (
    <Svg width={size} height={size * 25 / 375} viewBox="0 0 375 25" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Ellipse cx={187} cy={-162.5} rx={375} ry={187.5} fill="#F44336" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h375v25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

const CircleBannerSvg = React.memo(SvgComponent)
export { CircleBannerSvg }
