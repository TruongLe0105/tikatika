import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function SvgComponent({ size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={12} fill="#F1F1F1" />
      <Path
        opacity={0.4}
        d="M18.247 11.593v3.994a3.335 3.335 0 01-3.334 3.333H9.087a3.335 3.335 0 01-3.334-3.333V11.64c.507.547 1.227.86 2.007.86.84 0 1.647-.42 2.153-1.093A2.503 2.503 0 0012 12.5c.853 0 1.613-.4 2.073-1.067.514.66 1.307 1.067 2.134 1.067.806 0 1.54-.327 2.04-.907z"
        fill="#9FA0A0"
      />
      <Path
        d="M13.993 4.833h-4L9.5 9.74c-.04.453.027.88.193 1.267.387.906 1.294 1.493 2.307 1.493 1.027 0 1.913-.573 2.313-1.487.12-.286.194-.62.2-.96v-.126l-.52-5.094z"
        fill="#9FA0A0"
      />
      <Path
        opacity={0.6}
        d="M18.907 9.513l-.194-1.846c-.28-2.014-1.193-2.834-3.146-2.834h-2.56l.493 5c.007.067.013.14.013.267.04.347.147.667.307.953.48.88 1.413 1.447 2.387 1.447.886 0 1.686-.393 2.186-1.087.4-.533.58-1.206.514-1.9zM8.393 4.833c-1.96 0-2.866.82-3.153 2.854L5.06 9.52a2.74 2.74 0 00.547 1.947c.506.66 1.286 1.033 2.153 1.033.973 0 1.907-.567 2.38-1.433.173-.3.287-.647.32-1.007l.52-5.22H8.393v-.007z"
        fill="#9FA0A0"
      />
      <Path
        d="M11.567 15.107a1.663 1.663 0 00-1.487 1.66v2.153h3.833V17c.007-1.393-.813-2.053-2.346-1.893z"
        fill="#9FA0A0"
      />
    </Svg>
  );
}

const StoreDefaultSvg = React.memo(SvgComponent);
export { StoreDefaultSvg };