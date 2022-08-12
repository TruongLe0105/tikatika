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
        d="M4 17.5a.5.5 0 00-1 0V19H1.5a.5.5 0 000 1H3v1.5a.5.5 0 001 0V20h1.5a.5.5 0 000-1H4v-1.5zM4 19H3v1h1v-1z"
        fill="#F44336"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.268 25.44a.5.5 0 00-.707-.708l-1.061 1.06-1.06-1.06a.5.5 0 00-.708.707l1.06 1.061-1.06 1.06a.5.5 0 00.707.708l1.061-1.06 1.06 1.06a.5.5 0 00.708-.707l-1.06-1.061 1.06-1.06zm-1.06 1.06l-.708-.707-.707.707.707.707.707-.707z"
        fill="#FF8080"
      />
      <Path
        d="M27.606 8.907a4.402 4.402 0 00-4.261 3.32H9.755c-.458 0-.892.176-1.222.496l-.001.001-.003.003c-.341.333-.529.78-.529 1.256v11.355c0 .483.202.95.555 1.28l.002.002a1.75 1.75 0 001.199.473h16.563c.445 0 .87-.166 1.195-.47l.007-.006c.352-.33.554-.797.554-1.28V17.67A4.4 4.4 0 0032 13.3a4.399 4.399 0 00-4.394-4.393zm-17.85 4.258h13.459a4.372 4.372 0 00.644 2.428l-5.515 5.214h-.613L9.654 13.17a.825.825 0 01.102-.006zm-.819.818c0-.061.007-.122.02-.18l6.567 6.207-6.55 5.57a.822.822 0 01-.037-.242V13.983zM26.32 26.156H9.744l6.465-5.498 1.014.958a.469.469 0 00.322.128h.985a.47.47 0 00.322-.128l1.014-.958 6.465 5.498h-.012zm.818-.818a.822.822 0 01-.036.242l-6.55-5.57 3.884-3.671a4.385 4.385 0 002.702 1.33v7.669zm.47-8.581A3.46 3.46 0 0124.15 13.3a3.46 3.46 0 013.456-3.456 3.46 3.46 0 013.456 3.457 3.46 3.46 0 01-3.456 3.456z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M27.764 11.8h-.501a.469.469 0 000 .937h.032v1.874a.469.469 0 10.938 0v-2.343a.469.469 0 00-.47-.469z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        opacity={0.7}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z"
        fill="#FF8080"
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
          x1={20}
          y1={8.907}
          x2={20}
          y2={27.093}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="red" />
          <Stop offset={1} stopColor="#B40000" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={27.513}
          y1={11.799}
          x2={27.513}
          y2={15.08}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="red" />
          <Stop offset={1} stopColor="#B40000" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

const OTPEmailSvg = React.memo(SvgComponent)
export { OTPEmailSvg }
