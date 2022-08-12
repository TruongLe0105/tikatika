import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#fff", selected = false }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18.188 17.834a2.8 2.8 0 00-2.802 2.802 2.8 2.8 0 002.802 2.803 2.8 2.8 0 002.803-2.803c-.027-1.536-1.267-2.802-2.803-2.802zM23.12 4.469c-.055 0-.135-.027-.216-.027H5.928l-.27-1.806A2.413 2.413 0 003.26.562H1.078C.485.562 0 1.047 0 1.639c0 .593.485 1.078 1.078 1.078H3.26c.135 0 .243.108.27.243L5.2 14.33a2.954 2.954 0 002.91 2.507h11.21c1.401 0 2.614-.997 2.91-2.371l1.752-8.758a1.065 1.065 0 00-.863-1.24zM11.317 20.502a2.786 2.786 0 00-2.775-2.668 2.818 2.818 0 00-2.695 2.91 2.762 2.762 0 002.749 2.668h.054c1.535-.081 2.748-1.374 2.667-2.91z"
        fill={selected ? color : "#9FA0A0"}
      />
    </Svg>
  );
}

const CartTabSvg = React.memo(SvgComponent);
export { CartTabSvg };
