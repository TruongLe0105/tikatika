import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = "#323232" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 11.9-1.44L12 11l6.7-4.19a.85.85 0 11.9 1.44z"
        fill={color}
      />
    </Svg>
  )
}

const MailSvg = React.memo(SvgComponent)
export { MailSvg }
