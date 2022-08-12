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
        d="M16.705 17.75c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-6 12c.2-.63 2.57-1.68 4.96-1.94l2.04-2a9.34 9.34 0 00-1-.06c-2.67 0-8 1.34-8 4v1a1 1 0 001 1h8l-2-2h-5zm16.306-4.79a.994.994 0 00-1.411 0l-4.425 4.46-1.364-1.37a.994.994 0 00-1.411 1.4l2.775 2.8 5.836-5.89a.994.994 0 000-1.4z"
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
          x1={18.002}
          y1={9.75}
          x2={18.002}
          y2={26.25}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="red" />
          <Stop offset={1} stopColor="#B40000" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const VerifyUserSvg = React.memo(SvgComponent)
export { VerifyUserSvg }
