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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.902 9.902a6.51 6.51 0 019.197 0 6.51 6.51 0 010 9.197 6.507 6.507 0 01-6.28 1.682l-1.511 1.51a.65.65 0 01-.46.19H16.66v1.19a.65.65 0 01-.19.46l-.92.92a.65.65 0 01-.46.19H13.9v1.189a.65.65 0 01-.19.46l-.92.92a.65.65 0 01-.46.19H8.651a.65.65 0 01-.65-.65v-3.68a.65.65 0 01.19-.459l7.029-7.028a6.507 6.507 0 011.682-6.281zm2.938 9.528a5.18 5.18 0 005.34-1.251 5.208 5.208 0 000-7.358 5.209 5.209 0 00-7.358 0 5.18 5.18 0 00-1.251 5.34.65.65 0 01-.157.667L9.302 23.94v2.76h2.759l.539-.54v-1.57c0-.359.29-.65.65-.65h1.57l.539-.539v-1.57c0-.359.29-.65.65-.65h1.57l1.594-1.594a.65.65 0 01.667-.157zm.74-7.689a2.604 2.604 0 013.679 0 2.604 2.604 0 010 3.679 2.604 2.604 0 01-3.679 0 2.604 2.604 0 010-3.679zm.92 2.76a1.302 1.302 0 001.84 0 1.302 1.302 0 000-1.84 1.302 1.302 0 00-1.84 0 1.302 1.302 0 000 1.84z"
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
          x1={22.42}
          y1={10.98}
          x2={22.42}
          y2={16.181}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="red" />
          <Stop offset={1} stopColor="#B30000" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const ResetPassSvg = React.memo(SvgComponent)
export { ResetPassSvg }
