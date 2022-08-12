import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({ size = 24, border = false, color = "#FD6C9F" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {border ? (
        <>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 7.94a2.37 2.37 0 100 4.74 2.37 2.37 0 000-4.74zm-3.87 2.37a3.87 3.87 0 117.74 0 3.87 3.87 0 01-7.74 0z"
            fill="#9FA0A0"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.003 2.75c-3.416-.002-6.758 1.98-7.652 5.906-1.057 4.67 1.837 8.72 4.56 11.344a4.444 4.444 0 006.168 0l.002-.001c2.732-2.623 5.625-6.664 4.567-11.333-.888-3.926-4.228-5.914-7.645-5.916zm9.108 5.584C20.04 3.6 15.985 1.253 12.005 1.25c-3.98-.003-8.038 2.34-9.115 7.074-1.243 5.49 2.183 10.06 4.98 12.756h.001a5.943 5.943 0 008.25 0c2.808-2.697 6.234-7.256 4.991-12.746z"
            fill="#9FA0A0"
          />
        </>
      ) : (
        <>
          <Path
            opacity={0.4}
            d="M20.62 8.45c-1.05-4.62-5.08-6.7-8.62-6.7h-.01c-3.53 0-7.57 2.07-8.62 6.69-1.17 5.16 1.99 9.53 4.85 12.28A5.436 5.436 0 0012 22.25c1.36 0 2.72-.51 3.77-1.53 2.86-2.75 6.02-7.11 4.85-12.27z"
            fill={color}
          />
          <Path
            d="M12 13.46a3.15 3.15 0 100-6.3 3.15 3.15 0 000 6.3z"
            fill={color}
          />
        </>
      )}
    </Svg>
  );
}

const LocationSvg = React.memo(SvgComponent);
export { LocationSvg };
