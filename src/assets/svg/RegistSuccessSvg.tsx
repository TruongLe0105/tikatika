import * as React from "react"
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgComponent({ size = 36 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Circle
        opacity={0.4}
        cx={18}
        cy={18}
        r={16}
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        opacity={0.1}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 21.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3 23a3 3 0 100-6 3 3 0 000 6z"
        fill="#4CAF50"
      />
      <Path
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.303 30.475a.5.5 0 10-.707-.707l-1.06 1.06-1.061-1.06a.5.5 0 10-.707.707l1.06 1.06-1.06 1.061a.5.5 0 10.707.707l1.06-1.06 1.061 1.06a.5.5 0 10.707-.707l-1.06-1.06 1.06-1.061zm-1.06 1.06l-.707-.707-.708.707.707.708.708-.708z"
        fill="#4CAF50"
      />
      <Path
        opacity={0.2}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.849 1.606a.849.849 0 10-1.698 0V4.15h-2.545a.849.849 0 000 1.698h2.545v2.545a.849.849 0 101.698 0V5.85h2.545a.849.849 0 000-1.698H26.85V1.606zm0 2.545H25.15V5.85h1.698V4.15z"
        fill="#4CAF50"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.14 25.14L18 26H9v-2c0-2.66 5.33-4 8-4 .32 0 .61.02 1 .06l-.84.82a2.997 2.997 0 00-.02 4.26zM21 14c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-2.31 9.69l2.07 2.09c.39.39 1.03.39 1.42 0l5.14-5.18c.38-.38.38-1 0-1.39l-.01-.01a.996.996 0 00-1.41 0l-4.43 4.46-1.37-1.37a.984.984 0 00-1.4 0l-.01.01a.99.99 0 000 1.39z"
        fill="#4CAF50"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={18}
          y1={2}
          x2={18}
          y2={34}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4CAF50" stopOpacity={0.1} />
          <Stop offset={1} stopColor="#4CAF50" stopOpacity={0.6} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const RegistSuccessSvg = React.memo(SvgComponent)
export { RegistSuccessSvg }
