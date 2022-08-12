import { colors } from "@/styles/theme"
import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent({ size = 20, innerSize = 10, check = false, outlineColor = colors.secondaryText }) {
  return (
    <Svg height={size} width={size} viewBox="0 0 50 50">
      <Circle cx={25} cy={25} r={22} fill="none" stroke={outlineColor} strokeWidth={5} />
      {check && <Circle cx={25} cy={25} r={innerSize} fill={colors.primary} />}
    </Svg>
  )
}

const RadioButtonSvg = React.memo(SvgComponent)
export { RadioButtonSvg }
