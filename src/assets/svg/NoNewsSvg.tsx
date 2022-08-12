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
        d="M15.188 15.75h-3.376a.563.563 0 01-.562-.563v-3.374c0-.311.252-.563.563-.563h3.374c.311 0 .563.252.563.563v3.374c0 .311-.252.563-.563.563zm-2.813-1.125h2.25v-2.25h-2.25v2.25z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M17.813 13.125h1.875a.563.563 0 000-1.125h-1.875a.563.563 0 000 1.125z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M19.688 15.375h-1.875a.563.563 0 010-1.125h1.875a.563.563 0 010 1.125z"
        fill="url(#prefix__paint3_linear)"
      />
      <Path
        d="M11.813 18.375h7.874a.563.563 0 000-1.125h-7.875a.563.563 0 000 1.125z"
        fill="url(#prefix__paint4_linear)"
      />
      <Path
        d="M19.688 21.188h-7.875a.563.563 0 010-1.125h7.874a.563.563 0 010 1.125z"
        fill="url(#prefix__paint5_linear)"
      />
      <Path
        d="M11.813 24h7.874a.563.563 0 000-1.125h-7.875a.563.563 0 000 1.125z"
        fill="url(#prefix__paint6_linear)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.375 27H11.812A2.815 2.815 0 019 24.187V11.063C9 9.925 9.925 9 11.063 9h9.374c1.138 0 2.063.925 2.063 2.063v.187h2.438c1.137 0 2.062.925 2.062 2.063v10.874a2.816 2.816 0 01-2.476 2.793.544.544 0 01-.149.02zM22.5 12.375v11.813c0 .93.757 1.687 1.688 1.687a1.69 1.69 0 001.687-1.688V13.313a.939.939 0 00-.938-.937H22.5zm-11.438-2.25a.939.939 0 00-.937.938v13.124c0 .931.757 1.688 1.688 1.688h10.126a2.798 2.798 0 01-.564-1.688V11.063a.939.939 0 00-.938-.937h-9.375z"
        fill="url(#prefix__paint7_linear)"
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
          x1={15.75}
          y1={9}
          x2={15.75}
          y2={27}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={15.75}
          y1={9}
          x2={15.75}
          y2={27}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={15.75}
          y1={9}
          x2={15.75}
          y2={27}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={15.75}
          y1={9}
          x2={15.75}
          y2={27}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={15.75}
          y1={9}
          x2={15.75}
          y2={27}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint6_linear"
          x1={15.75}
          y1={9}
          x2={15.75}
          y2={27}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint7_linear"
          x1={15.75}
          y1={9}
          x2={15.75}
          y2={27}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8798AD" />
          <Stop offset={1} stopColor="#2F394E" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const NoNewsSvg = React.memo(SvgComponent)
export { NoNewsSvg }
