import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.062 3H6.25l.047.022A2.507 2.507 0 004 5.515V9.75h4.5v10.687a.564.564 0 00.772.522l2.603-1.042 2.603 1.042a.547.547 0 00.417 0l2.604-1.042 2.604 1.042a.567.567 0 00.524-.057.56.56 0 00.247-.465V5.812A2.816 2.816 0 0018.062 3zM8.5 6.375v2.25H5.125v-3.11c0-.766.624-1.39 1.39-1.39h.594c.766 0 1.39.624 1.39 1.39v.86zm9.562 10.124h-4.5a.563.563 0 010-1.125h4.5a.563.563 0 010 1.125zm0-2.25h-4.5a.563.563 0 010-1.125h4.5a.563.563 0 010 1.125zm0-2.25h-6.75a.563.563 0 010-1.124h6.75a.563.563 0 010 1.125zm0-4.5h-6.75a.563.563 0 010-1.124h6.75a.563.563 0 010 1.125z"
        fill="#000"
      />
    </Svg>
  )
}

const HistorySvg = React.memo(SvgComponent)
export { HistorySvg }
