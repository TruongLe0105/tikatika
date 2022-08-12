import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8.25a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75z"
        fill="#F44336"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.342c-.8 0-1.768.55-2.584 2.022l-6.06 10.9c-.76 1.371-.728 2.453-.32 3.148.407.693 1.334 1.248 2.904 1.248H12c.042 0 .083.003.123.01h5.937c1.564 0 2.492-.554 2.901-1.249.409-.695.443-1.777-.317-3.147l-6.06-10.91C13.768 3.892 12.8 3.342 12 3.342zm-.123 18.818H5.94c-1.9 0-3.433-.685-4.198-1.99-.765-1.302-.617-2.975.302-4.634l6.06-10.9C9.068 2.9 10.45 1.843 12 1.843c1.55 0 2.932 1.055 3.896 2.793l2.94 5.29 3.12 5.62c.92 1.66 1.064 3.333.298 4.636-.766 1.302-2.299 1.988-4.194 1.988H12a.754.754 0 01-.123-.01z"
        fill="#F44336"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.995 17a1 1 0 011-1h.009a1 1 0 110 2h-.01a1 1 0 01-1-1z"
        fill="#F44336"
      />
    </Svg>
  );
}

const WarningSvg = React.memo(SvgComponent);
export { WarningSvg };
