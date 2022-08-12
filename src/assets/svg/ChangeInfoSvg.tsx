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
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 18.5a.5.5 0 00-1 0V20H.5a.5.5 0 000 1H2v1.5a.5.5 0 001 0V21h1.5a.5.5 0 000-1H3v-1.5zM3 20H2v1h1v-1z"
        fill="#F44336"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.884 23.837a.674.674 0 10-.954-.953l-1.43 1.43-1.43-1.43a.674.674 0 00-.954.953l1.43 1.43-1.43 1.431a.674.674 0 00.954.954l1.43-1.43 1.43 1.43a.674.674 0 10.954-.954l-1.43-1.43 1.43-1.43zm-1.43 1.43l-.954-.953-.954.954.954.953.954-.953z"
        fill="#FF8080"
      />
      <Path
        opacity={0.7}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 6a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z"
        fill="#FF8080"
      />
      <Path
        d="M18 11.9a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2zm0 9c2.97 0 6.1 1.46 6.1 2.1v.1a1 1 0 01-1 1H12.9a1 1 0 01-1-1V23c0-.64 3.13-2.1 6.1-2.1zM18 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v1a2 2 0 002 2h12a2 2 0 002-2v-1c0-2.66-5.33-4-8-4z"
        fill="url(#prefix__paint1_linear)"
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
          <Stop stopColor="#FF8080" stopOpacity={0.1} />
          <Stop offset={1} stopColor="#FF8080" stopOpacity={0.6} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={18}
          y1={10}
          x2={18}
          y2={26}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="red" />
          <Stop offset={1} stopColor="#B30000" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const ChangeInfoSvg = React.memo(SvgComponent)
export { ChangeInfoSvg }
