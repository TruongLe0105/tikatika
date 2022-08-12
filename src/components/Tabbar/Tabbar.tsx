import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Platform,
} from "react-native";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";

import StaticTabbar from "./StaticTabbar";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { colors } from "@/styles/theme";
import { HomeSvg } from "@/assets/svg/tabbar/HomeSvg";
import { LiveSvg } from "@/assets/svg/tabbar/LiveSvg";
import { StoreSvg } from "@/assets/svg/tabbar/StoreSvg";
import { CartSvg } from "@/assets/svg/tabbar/CartSvg";
import { MyAccountSvg } from "@/assets/svg/tabbar/MyAccountSvg";
import { ShadowCard } from "../Card/ShadowCard";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const width = SCREEN_WIDTH - 40;
const height = 64;
const tabs = [
  {
    name: HomeSvg,
  },
  {
    name: LiveSvg,
  },
  {
    name: StoreSvg,
  },
  {
    name: CartSvg,
  },
  {
    name: MyAccountSvg,
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = "white";

const getPath = (): string => {
  const left = shape
    .line()
    .x((d) => d[0])
    .y((d) => d[1])([
    [0, 0],
    [width, 0],
  ]);
  const number = Platform.OS === "android" ? 10 : 1;
  const tab = shape
    .line()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(shape.curveBasis)([
    [width - number * 2, 0],
    [width + number + 5, 0],
    [width + 4, 8],
    [width + 15 + number, height - 20],
    [width + tabWidth - 15 - number, height - 20],
    [width + tabWidth - 4, 8],
    [width + tabWidth - number - 5, 0],
    [width + tabWidth + number * 2, 0],
  ]);
  const right = shape
    .line()
    .x((d) => d[0])
    .y((d) => d[1])([
    [width + tabWidth, 0],
    [width * 2, 0],
    [width * 2, height],
    [0, height],
    [0, 0],
  ]);
  return `${left} ${tab} ${right}`;
};
const d = getPath();
interface TabbarProps {
  onChangeIndex: (index) => void;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  value = new Animated.Value(0);

  render() {
    const { value } = this;
    const translateX = value.interpolate({
      inputRange: [0, width],
      outputRange: [-width, 0],
    });
    return (
      <>
        <ShadowCard
          style={{
            position: "relative",
            bottom: 20,
            marginHorizontal: 20,
            alignSelf: "center",
            backgroundColor: colors.placeholder,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <View {...{ height, width }}>
            <View
              style={{
                overflow: "hidden",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              <AnimatedSvg
                width={width * 2}
                {...{ height }}
                viewBox={`0 0 ${width * 2} ${height}`}
                style={{ transform: [{ translateX }] }}
              >
                <Path fill={backgroundColor} {...{ d }} />
              </AnimatedSvg>
            </View>

            <View style={StyleSheet.absoluteFill}>
              <StaticTabbar
                {...{ tabs, value }}
                width={width}
                onChangeIndex={this.props.onChangeIndex}
              />
            </View>
          </View>
        </ShadowCard>

        <SafeAreaView style={styles.container} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
