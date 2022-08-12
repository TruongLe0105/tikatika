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
        d="M13.566 25.734h2.395a.716.716 0 110 1.433h-2.395a2.868 2.868 0 01-2.865-2.865V11.698a2.868 2.868 0 012.865-2.865h8.805a2.868 2.868 0 012.864 2.865v4.404a.716.716 0 11-1.432 0v-4.404c0-.79-.643-1.432-1.432-1.432h-8.805c-.79 0-1.432.642-1.432 1.432v12.604c0 .79.642 1.432 1.432 1.432z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M22.37 16.71a.716.716 0 00-.716-.715h-7.376a.716.716 0 100 1.432h7.376c.396 0 .717-.32.717-.716z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M14.278 18.86a.716.716 0 100 1.432h4.48a.716.716 0 000-1.433h-4.48z"
        fill="url(#prefix__paint3_linear)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.5 28l-.652-.576-.006-.005C20.528 25.386 19 24.044 19 22.398 19 21.055 20.089 20 21.475 20a2.739 2.739 0 012.025.911A2.739 2.739 0 0125.525 20C26.911 20 28 21.055 28 22.398c0 1.644-1.522 2.984-3.83 5.015l-.018.016L23.5 28zm.002-1.598c-1.114-.98-1.952-1.726-2.53-2.41-.59-.698-.772-1.177-.772-1.594 0-.645.516-1.198 1.275-1.198.434 0 .858.201 1.124.503l.901 1.026.901-1.026c.266-.302.69-.503 1.124-.503.76 0 1.275.553 1.275 1.198 0 .417-.183.896-.772 1.594-.577.685-1.413 1.43-2.526 2.41z"
        fill="url(#prefix__paint4_linear)"
      />
      <Path
        d="M14.278 13.13h7.376a.716.716 0 110 1.432h-7.376a.716.716 0 110-1.432z"
        fill="url(#prefix__paint5_linear)"
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
          x1={32.241}
          y1={8.833}
          x2={32.241}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={32.241}
          y1={8.833}
          x2={32.241}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={32.241}
          y1={8.833}
          x2={32.241}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={32.241}
          y1={8.833}
          x2={32.241}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={32.241}
          y1={8.833}
          x2={32.241}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const NoFavoriteSvg = React.memo(SvgComponent)
export { NoFavoriteSvg }
