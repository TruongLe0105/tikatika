import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M22 7.81v8.38c0 3.64-2.17 5.81-5.81 5.81H7.81C4.17 22 2 19.83 2 16.19V7.81c0-.51.04-1 .13-1.45C2.64 3.61 4.67 2.01 7.77 2h8.46c3.1.01 5.13 1.61 5.64 4.36.09.45.13.94.13 1.45z"
        fill="#FD6C9F"
      />
      <Path
        d="M22 7.81v.05H2v-.05c0-.51.04-1 .13-1.45h5.64V2h1.5v4.36h5.46V2h1.5v4.36h5.64c.09.45.13.94.13 1.45zM14.44 12.72l-2.08-1.2c-.77-.44-1.51-.5-2.09-.17-.58.33-.9 1.01-.9 1.89v2.4c0 .88.32 1.56.9 1.89.25.14.53.21.82.21.4 0 .83-.13 1.27-.38l2.08-1.2c.77-.44 1.19-1.06 1.19-1.73 0-.67-.43-1.26-1.19-1.71z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}

const NoVideoSvg = React.memo(SvgComponent);
export { NoVideoSvg };