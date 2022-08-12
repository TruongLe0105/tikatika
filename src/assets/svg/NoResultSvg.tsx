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
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 18.5a.5.5 0 00-1 0V20H.5a.5.5 0 000 1H2v1.5a.5.5 0 001 0V21h1.5a.5.5 0 000-1H3v-1.5zM3 20H2v1h1v-1z"
        fill="#8798AD"
      />
      <Path
        opacity={0.5}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.884 23.837a.674.674 0 10-.954-.953l-1.43 1.43-1.43-1.43a.674.674 0 00-.954.953l1.43 1.43-1.43 1.431a.674.674 0 00.954.954l1.43-1.43 1.43 1.43a.674.674 0 10.954-.954l-1.43-1.43 1.43-1.43zm-1.43 1.43l-.954-.953-.954.954.954.953.954-.953z"
        fill="#8798AD"
      />
      <Path
        opacity={0.7}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 6a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z"
        fill="#C8D2DD"
      />
      <Path
        d="M21.5 20h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L21.5 20zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"
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
          <Stop stopColor="#8798AD" stopOpacity={0.1} />
          <Stop offset={1} stopColor="#8798AD" stopOpacity={0.6} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={17.523}
          y1={8.999}
          x2={17.523}
          y2={26.058}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2E384D" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const NoResultSvg = React.memo(SvgComponent)
export { NoResultSvg }
