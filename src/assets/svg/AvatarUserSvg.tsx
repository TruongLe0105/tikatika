import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#9FA0A0" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.4}
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
        fill="#D7D9D9"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 10.416c0-2.484 2.016-4.5 4.5-4.5s4.5 2.016 4.5 4.5a4.492 4.492 0 01-4.344 4.488H11.94c-2.532-.072-4.44-2.052-4.44-4.488zM12 24c3.144 0 6-1.212 8.136-3.18-.288-1.092-1.056-2.088-2.208-2.856-3.252-2.184-8.58-2.184-11.856 0-1.14.768-1.92 1.764-2.208 2.856A11.97 11.97 0 0012 24z"
        fill={color}
      />
    </Svg>
  );
}

const AvatarUserSvg = React.memo(SvgComponent);
export { AvatarUserSvg };
