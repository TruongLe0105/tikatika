import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent({ size = 24, isRead = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 23.333c6.26 0 11.333-5.074 11.333-11.333C23.333 5.74 18.26.667 12 .667 5.74.667.667 5.74.667 12 .667 18.26 5.74 23.333 12 23.333zM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
        fill={isRead ? "#C8D2DD" : "#EBF1F4"}
      />
      <Path
        d="M12 16.444c.489 0 .889-.4.889-.888H11.11c0 .488.396.888.889.888zm2.667-2.666v-2.223c0-1.364-.73-2.506-2-2.808v-.303a.666.666 0 10-1.334 0v.303c-1.275.302-2 1.44-2 2.809v2.222l-.573.573c-.28.28-.084.76.311.76h5.853c.396 0 .596-.48.316-.76l-.573-.573z"
        fill={isRead ? "#8798AD" : "#F44336"}
      />
    </Svg>
  )
}

const NotifyCircleSvg = React.memo(SvgComponent)
export { NotifyCircleSvg }
