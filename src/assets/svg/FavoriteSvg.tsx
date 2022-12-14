import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({
  size = 24,
  isFavorite = false,
  color = "#FD6C9F",
  strokeColor = "#fff",
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {isFavorite ? (
        <Path
          d="M16.44 3.1c-1.81 0-3.43.88-4.44 2.23A5.549 5.549 0 007.56 3.1C4.49 3.1 2 5.6 2 8.69c0 1.19.19 2.29.52 3.31 1.58 5 6.45 7.99 8.86 8.81.34.12.9.12 1.24 0 2.41-.82 7.28-3.81 8.86-8.81.33-1.02.52-2.12.52-3.31 0-3.09-2.49-5.59-5.56-5.59z"
          fill={color}
        />
      ) : (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.56 3.85c-2.652 0-4.81 2.16-4.81 4.84 0 3.25 1.5 5.855 3.39 7.79 1.897 1.944 4.14 3.162 5.482 3.62l.008.003c.064.023.199.047.37.047.171 0 .306-.024.37-.047l.008-.003c1.342-.458 3.585-1.676 5.483-3.62 1.888-1.935 3.389-4.54 3.389-7.79 0-2.68-2.158-4.84-4.81-4.84a4.78 4.78 0 00-3.838 1.937.75.75 0 01-1.204 0A4.766 4.766 0 007.56 3.85zM1.25 8.69c0-3.5 2.822-6.34 6.31-6.34 1.737 0 3.305.706 4.44 1.845a6.266 6.266 0 014.44-1.845c3.488 0 6.31 2.84 6.31 6.34 0 3.75-1.74 6.71-3.816 8.838-2.066 2.116-4.51 3.458-6.068 3.99a2.695 2.695 0 01-.866.132c-.277 0-.591-.035-.866-.131-1.557-.533-4.002-1.875-6.068-3.991C2.989 15.4 1.25 12.44 1.25 8.69z"
          fill={strokeColor}
        />
      )}
    </Svg>
  );
}

const FavoriteSvg = React.memo(SvgComponent);
export { FavoriteSvg };
