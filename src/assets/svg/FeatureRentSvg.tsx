import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx={24} cy={24} r={24} fill="#fff" />
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M35.728 23.082l-9.769-9.833a2.81 2.81 0 00-3.827-.008l-9.857 9.838a.938.938 0 001.325 1.327l.744-.742v8.094a3.754 3.754 0 003.75 3.75h3.375c.517 0 .937-.42.937-.937v-7.64h3.282v7.64c0 .518.42.937.937.937h3.281a3.754 3.754 0 003.75-3.75.937.937 0 10-1.875 0 1.877 1.877 0 01-1.875 1.875h-2.343v-7.64a.937.937 0 00-.938-.938h-5.156a.938.938 0 00-.938.938v7.64h-2.437a1.877 1.877 0 01-1.875-1.875v-9.937-.028l7.216-7.203a.937.937 0 011.216.003l7.13 7.177v5.3a.938.938 0 001.875 0v-3.413l.741.746a.935.935 0 001.326.005.937.937 0 00.005-1.326z"
          fill="#F44336"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(12 12)" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

const FeatureRentSvg = React.memo(SvgComponent)
export { FeatureRentSvg }
