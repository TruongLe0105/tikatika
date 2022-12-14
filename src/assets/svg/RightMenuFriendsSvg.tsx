import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.071 5.976A3.98 3.98 0 008.095 2 3.98 3.98 0 004.12 5.976a3.98 3.98 0 003.976 3.976h-.714c-.81 0-1.579.17-2.275.476a3.79 3.79 0 012.133 3.405 3.79 3.79 0 01-3.787 3.786H1.714v3.714c0 .369.299.667.667.667h2.19v-2.904a.667.667 0 011.334 0V22h4.59a1.992 1.992 0 01-.114-.667V15.62a6.996 6.996 0 012.895-5.667h-5.18a3.98 3.98 0 003.975-3.976zm11.024 5.404H21.31a2.456 2.456 0 00-2.453 2.453c0 1.352 1.1 2.453 2.453 2.453h1.785a.667.667 0 00.667-.667v-3.571a.667.667 0 00-.667-.668z"
        fill="#FD6C9F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.381 9.952a3.98 3.98 0 003.976-3.976A3.98 3.98 0 0017.381 2a3.98 3.98 0 00-3.976 3.976 3.98 3.98 0 003.976 3.976zm0 0a5.667 5.667 0 00-5.667 5.667v5.714c0 .369.299.667.667.667h6.476v-2.904a.667.667 0 111.334 0V22h2.19a.667.667 0 00.667-.667V17.62H21.31a3.79 3.79 0 01-3.787-3.787 3.79 3.79 0 012.133-3.405 5.645 5.645 0 00-2.275-.476zM5.905 13.833c0-1.352-1.1-2.453-2.453-2.453H1.667a.667.667 0 00-.667.667v3.572c0 .368.299.667.667.667h1.786c1.352 0 2.452-1.1 2.452-2.453z"
        fill="#FD6C9F"
      />
    </Svg>
  );
}

const RightMenuFriendsSvg = React.memo(SvgComponent);
export { RightMenuFriendsSvg };
