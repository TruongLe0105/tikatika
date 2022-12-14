import * as React from "react"
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent({ size = 48 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Circle cx={24} cy={24} r={24} fill="#fff" />
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M35.901 21.172a3.344 3.344 0 00-2.519-2.43c-.1-.021-.2-.018-.3-.03C32.179 14.8 28.739 12 24.668 12h-1.334c-4.07 0-7.511 2.8-8.414 6.712a3.32 3.32 0 00-1.745.748A3.33 3.33 0 0012 22c0 1.042.503 2.027 1.333 2.653v6.014c0 .982.54 1.833 1.334 2.295V34c0 1.103.897 2 2 2s2-.897 2-2v-.667h10.668V34c0 1.103.897 2 2 2s2-.897 2-2v-1.038a2.658 2.658 0 001.334-2.295v-6.013a3.334 3.334 0 001.232-3.482zm-12.568-7.839h1.334c3.376 0 6.234 2.277 7.067 5.482-.42.123-.82.314-1.168.596A3.321 3.321 0 0029.333 22v3.333H18.667v-3.19c0-1.559-1.011-2.916-2.4-3.331.833-3.204 3.692-5.479 7.066-5.479zm7.334 14A.667.667 0 0130 28H18a.667.667 0 010-1.333h12c.368 0 .667.298.667.666zM17.333 34A.667.667 0 0116 34v-.667h1.333V34zM32 34a.667.667 0 01-1.333 0v-.667H32V34zm1.665-10.28a.666.666 0 00-.332.577v6.37c0 .735-.598 1.333-1.333 1.333H16a1.335 1.335 0 01-1.333-1.333v-6.37a.668.668 0 00-.332-.576A1.978 1.978 0 0113.333 22a1.999 1.999 0 012.34-1.972c.947.154 1.66 1.063 1.66 2.115v3.313A1.997 1.997 0 0016 27.333c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2 0-.868-.559-1.6-1.333-1.877V22c0-.605.27-1.171.74-1.553a1.998 1.998 0 011.7-.4 1.985 1.985 0 011.497 1.442c.219.896-.15 1.772-.94 2.232z"
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

const FeatureFurnitureSvg = React.memo(SvgComponent)
export { FeatureFurnitureSvg }
