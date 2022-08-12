import React, { FC, useState, useRef, useCallback, useEffect } from "react";
import { PanResponder, Dimensions } from "react-native";
import Svg, {
  Path,
  Circle,
  G,
  Text,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface Props {
  btnRadius?: number;
  dialRadius?: number;
  dialWidth?: number;
  meterColor?: string;
  textColor?: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  textSize?: number;
  value?: number;
  min?: number;
  max?: number;
  xCenter?: number;
  yCenter?: number;
  onValueChange?: (x: number) => number;
}

const CircleSlider: FC<Props> = ({
  btnRadius = 15,
  dialRadius = 130,
  dialWidth = 5,
  meterColor = "url(#prefix__paint0_linear)",
  textColor = "#fff",
  fillColor = "none",
  strokeColor = "#fff",
  strokeWidth = 0.5,
  textSize = 10,
  value = 0,
  min = 0,
  max = 359,
  xCenter = Dimensions.get("window").width / 2,
  yCenter = Dimensions.get("window").height / 2,
  onValueChange = (x) => x,
}) => {
  const [angle, setAngle] = useState(value);

  useEffect(() => {
    console.log('interval ne ', value);
    setAngle(value)
  }, [value])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        let xOrigin = xCenter - (dialRadius + btnRadius);
        let yOrigin = yCenter - (dialRadius + btnRadius);
        let a = cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);

        if (a <= min) {
          setAngle(min);
        } else if (a >= max) {
          setAngle(max);
        } else {
          setAngle(a);
        }
      },
    })
  ).current;

  const polarToCartesian = useCallback(
    (angle) => {
      let r = dialRadius;
      let hC = dialRadius + btnRadius;
      let a = ((angle - 90) * Math.PI) / 180.0;

      let x = hC + r * Math.cos(a);
      let y = hC + r * Math.sin(a);
      return { x, y };
    },
    [dialRadius, btnRadius]
  );

  const cartesianToPolar = useCallback(
    (x, y) => {
      let hC = dialRadius + btnRadius;

      if (x === 0) {
        return y > hC ? 0 : 180;
      } else if (y === 0) {
        return x > hC ? 90 : 270;
      } else {
        return (
          Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
          (x > hC ? 90 : 270)
        );
      }
    },
    [dialRadius, btnRadius]
  );

  const width = (dialRadius + btnRadius) * 2;
  const bR = btnRadius;
  const dR = dialRadius;
  const startCoord = polarToCartesian(0);
  var endCoord = polarToCartesian(angle);

  return (
    <Svg width={width} height={width}>
      <G>
        <Circle
          r={dR}
          cx={width / 2}
          cy={width / 2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={fillColor}
        />
        <Text
          x={width / 2}
          y={width / 2 + textSize / 3}
          fontSize={textSize}
          fill={textColor}
          textAnchor="middle"
        >
          {onValueChange(angle) + ""}
        </Text>
      </G>

      <Path
        stroke={meterColor}
        strokeWidth={dialWidth}
        fill="none"
        d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${angle > 180 ? 1 : 0
          } 1 ${endCoord.x} ${endCoord.y}`}
      />

      <G x={endCoord.x - bR} y={endCoord.y - bR}>
        <Circle
          r={bR}
          cx={bR}
          cy={bR}
          fill={"#fff"}
          strokeWidth={3}
          stroke={"rgba(0, 153, 255, 0.15)"}
          {...panResponder.panHandlers}
        />
      </G>

      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={60.87}
          y1={0.568}
          x2={16.841}
          y2={0.568}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#00C6FF" />
          <Stop offset={1} stopColor="#0072FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default React.memo(CircleSlider);
