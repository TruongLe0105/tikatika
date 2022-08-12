import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, color = "#000" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 10.75c-1.52 0-2.75-1.23-2.75-2.75S7.48 5.25 9 5.25 11.75 6.48 11.75 8 10.52 10.75 9 10.75zm0-4a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
        fill={color}
      />
      <Path
        d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h4c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75z"
        fill={color}
      />
      <Path
        d="M21.25 5.75h-5.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill={color}
      />
      <Path
        d="M18.5 8.5c-.41 0-.75-.34-.75-.75v-5.5c0-.41.34-.75.75-.75s.75.34.75.75v5.5c0 .41-.34.75-.75.75zM2.67 19.7a.751.751 0 01-.42-1.37l4.93-3.31c1.08-.72 2.57-.64 3.55.19l.33.29c.5.43 1.35.43 1.84 0l4.16-3.57c1.07-.91 2.73-.91 3.8 0l1.63 1.4c.31.27.35.74.08 1.06-.27.31-.74.35-1.06.08l-1.63-1.4c-.5-.43-1.35-.43-1.84 0l-4.16 3.57c-1.06.91-2.73.91-3.8 0l-.33-.29c-.46-.39-1.22-.43-1.73-.08L3.1 19.58c-.14.08-.29.12-.43.12z"
        fill={color}
      />
    </Svg>
  );
}

const AddPhotoSvg = React.memo(SvgComponent);
export { AddPhotoSvg };