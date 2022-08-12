import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.388 8.198a3.89 3.89 0 01-.71-1.272L9.891 9.168c.341.365.614.788.804 1.25l3.692-2.22zM10.723 13.516a4.12 4.12 0 01-.781 1.26l3.976 2.254c.161-.457.405-.88.72-1.25l-3.915-2.264z"
        fill={color}
      />
      <Path
        d="M6.853 8.153A3.848 3.848 0 1010.696 12a3.855 3.855 0 00-3.843-3.848zM17.668 14.682a3.66 3.66 0 10.003 7.32 3.66 3.66 0 00-.003-7.32zM17.441 9.321a3.66 3.66 0 100-7.32 3.66 3.66 0 000 7.32z"
        fill={color}
      />
    </Svg>
  );
}

const ShareSvg = React.memo(SvgComponent);
export { ShareSvg };
