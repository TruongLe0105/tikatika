import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 36, active = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <G clipPath="url(#prefix__clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0h16a2.67 2.67 0 012.667 2.667v6a.666.666 0 01-.667.666H6a.666.666 0 01-.667-.666v-6A2.67 2.67 0 018 0zm.667 6.667h4a.666.666 0 100-1.334H10a.666.666 0 00-1.138-.471l-.667.667a.666.666 0 00.472 1.138zm-2.667 4h20c.369 0 .667.298.667.666V28A2.67 2.67 0 0124 30.667v.666a.666.666 0 01-.667.667H22a.666.666 0 01-.667-.667v-.666H10.667v.666A.666.666 0 0110 32H8.667A.666.666 0 018 31.333v-.666A2.67 2.67 0 015.333 28V11.333c0-.368.298-.666.667-.666zm2.667 4h4a.666.666 0 100-1.334H10a.666.666 0 00-1.138-.471l-.667.667a.666.666 0 00.472 1.138z"
          fill={active ? '#F44336' : "#C8D2DD"}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h32v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

const TulanhSvg = React.memo(SvgComponent)
export { TulanhSvg }
