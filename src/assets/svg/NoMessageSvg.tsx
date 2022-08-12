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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.625 20.5c0 .69.56 1.25 1.25 1.25.345 0 .625.28.625.625v2.5c0 .345-.28.625-.625.625h-4.71A2.19 2.19 0 0118 28a2.19 2.19 0 01-2.165-2.5h-4.71a.625.625 0 01-.625-.625v-2.5c0-.345.28-.625.625-.625.69 0 1.25-.56 1.25-1.25v-4.32a5.688 5.688 0 013.968-5.428A1.877 1.877 0 0118 8a1.877 1.877 0 011.659 2.748 5.597 5.597 0 012.311 1.393 5.587 5.587 0 011.655 3.984V20.5zm-5-10.625a.626.626 0 10-1.251.001.626.626 0 001.251-.001zM18 26.75a.938.938 0 00.884-1.25h-1.768A.938.938 0 0018 26.75zm1.25-2.5h5v-1.33a2.504 2.504 0 01-1.875-2.42v-4.375a4.345 4.345 0 00-1.287-3.099A4.346 4.346 0 0018 11.75h-.016c-2.404.008-4.359 1.995-4.359 4.43v4.32a2.504 2.504 0 01-1.875 2.42v1.33h7.5zm-4.375-8.125a.625.625 0 101.25 0c0-1.034.841-1.875 1.875-1.875A.625.625 0 1018 13a3.129 3.129 0 00-3.125 3.125z"
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
          x1={18}
          y1={8}
          x2={18}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#303A4F" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const NoMessageSvg = React.memo(SvgComponent)
export { NoMessageSvg }
