import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgComponent({ size = 78, active = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 78 78" fill="none">
      <Path
        d="M0 12.649C0 5.663 5.663 0 12.649 0H65.35C72.337 0 78 5.663 78 12.649V65.35C78 72.337 72.337 78 65.351 78H12.65C5.663 78 0 72.337 0 65.351V12.65z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65.351 1.054H12.65c-6.404 0-11.595 5.191-11.595 11.595V65.35c0 6.404 5.191 11.595 11.595 11.595H65.35c6.404 0 11.595-5.191 11.595-11.595V12.65c0-6.404-5.191-11.595-11.595-11.595zM12.65 0C5.663 0 0 5.663 0 12.649V65.35C0 72.337 5.663 78 12.649 78H65.35C72.337 78 78 72.337 78 65.351V12.65C78 5.663 72.337 0 65.351 0H12.65z"
        fill="url(#prefix__paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={39}
          y1={0}
          x2={39}
          y2={78}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={active ? "#F44336" : "#8798AD"} />
          <Stop offset={1} stopColor={active ? "#F44336" : "#C8D2DD"} stopOpacity={0.2} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const UtilityBgSvg = React.memo(SvgComponent)
export { UtilityBgSvg }
