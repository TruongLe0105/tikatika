import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export function StepDoneSvg({ size = 16 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={5} fill="#fff" />
      <Path
        d="M12 6c-3.315 0-6 2.685-6 6 0 1.125.315 2.19.87 3.09A5.955 5.955 0 0012 18c2.19 0 4.095-1.17 5.13-2.91.555-.9.87-1.965.87-3.09 0-3.315-2.685-6-6-6zm2.955 5.505L11.76 14.46c-.21.195-.495.3-.765.3-.285 0-.57-.105-.795-.33l-1.485-1.485a1.132 1.132 0 010-1.59 1.132 1.132 0 011.59 0l.72.72 2.4-2.22c.45-.42 1.17-.39 1.59.06.42.45.39 1.17-.06 1.59z"
        fill="#4CAF50"
      />
    </Svg>
  );
}
