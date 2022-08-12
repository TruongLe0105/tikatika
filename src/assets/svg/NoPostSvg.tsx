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
        d="M13.566 25.734h2.395a.716.716 0 110 1.433h-2.395a2.868 2.868 0 01-2.865-2.865V11.698a2.868 2.868 0 012.865-2.865h8.805a2.868 2.868 0 012.864 2.865v4.404a.716.716 0 11-1.432 0v-4.404c0-.79-.643-1.432-1.432-1.432h-8.805c-.79 0-1.432.642-1.432 1.432v12.604c0 .79.642 1.432 1.432 1.432zm8.805-9.023a.716.716 0 00-.716-.716h-7.377a.716.716 0 100 1.432h7.376c.396 0 .717-.32.717-.716zm-8.093 2.148a.716.716 0 100 1.433h4.48a.716.716 0 000-1.433h-4.48zm12.226.343a2.15 2.15 0 00-3.038 0l-3.932 3.923a.716.716 0 00-.18.298l-.855 2.82a.716.716 0 00.876.898l2.89-.801a.715.715 0 00.315-.183l3.924-3.916a2.15 2.15 0 000-3.039zm-4.802 5.808l-1.455.403.426-1.401 2.653-2.647 1.013 1.013-2.637 2.632zm3.79-3.783l-.14.139-1.012-1.013.138-.138a.717.717 0 011.013 1.012zM14.277 13.13h7.376a.716.716 0 110 1.432h-7.376a.716.716 0 110-1.432z"
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
          x1={18.917}
          y1={8.833}
          x2={18.917}
          y2={27.167}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const NoPostSvg = React.memo(SvgComponent)
export { NoPostSvg }
