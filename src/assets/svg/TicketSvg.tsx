import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.3 10.84c.39 0 .7-.31.7-.7v-.93c0-4.1-1.25-5.35-5.35-5.35h-9.3C3.25 3.86 2 5.11 2 9.21v.47c0 .39.31.7.7.7.9 0 1.63.73 1.63 1.63 0 .9-.73 1.62-1.63 1.62-.39 0-.7.31-.7.7v.47c0 4.1 1.25 5.35 5.35 5.35h9.3c4.1 0 5.35-1.25 5.35-5.35 0-.39-.31-.7-.7-.7a1.63 1.63 0 010-3.26zM9 8.88c.55 0 1 .45 1 1s-.44 1-1 1c-.55 0-1-.45-1-1s.44-1 1-1zm6 7c-.56 0-1.01-.45-1.01-1s.45-1 1-1 1 .45 1 1-.43 1-.99 1zm.9-6.4l-6.73 6.73c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 010-1.06l6.73-6.73c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06z"
        fill={color}
      />
    </Svg>
  );
}

const TicketSvg = React.memo(SvgComponent);
export { TicketSvg };
