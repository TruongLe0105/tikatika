import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, color = "#2E384D" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.667 13.667a.833.833 0 111.666 0V17c0 1.378-1.121 2.5-2.5 2.5h-2.5v.833c0 .92-.747 1.667-1.666 1.667-.178 0-.347-.025-.517-.078l-5.015-1.671A1.68 1.68 0 012 18.667v-15C2 2.747 2.748 2 3.667 2c.023 0 .045.005.067.01a.41.41 0 00.052.008c.013-.001.025-.005.037-.008A.185.185 0 013.875 2h8.958c1.379 0 2.5 1.122 2.5 2.5V7a.833.833 0 11-1.666 0V4.5a.834.834 0 00-.834-.833H8.952l.246.082a1.68 1.68 0 011.135 1.584v12.5h2.5c.46 0 .834-.374.834-.833v-3.333zm4.755-7.256l3.334 3.333a.832.832 0 010 1.178l-3.334 3.334a.834.834 0 01-1.422-.59v-2.5h-3.333a.834.834 0 010-1.666H17V7a.835.835 0 011.422-.59z"
        fill={color}
      />
    </Svg>
  )
}

const LogoutSvg = React.memo(SvgComponent)
export { LogoutSvg }
