import {
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  Animated,
  Image,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import React, { Component, useState, useEffect } from "react";

import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "@/styles/theme";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { ShadowCardView } from "../View/ShadowCardView";
import { boxShadow } from "@/styles/boxShadow";
import Swiper from "react-native-swiper";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface TabBarItemProps {
  children: React.ReactNode;
  selectedIcon: React.ReactNode;
  icon: React.ReactNode;
  title: string;
}

class TabBarItem extends Component<TabBarItemProps, {}> {
  constructor(props: TabBarItemProps) {
    super(props);
  }
  render() {
    let child = this.props.children;

    return <View style={{ flex: 1 }}>{child}</View>;
  }
}

interface TabBarProps {
  children: React.ReactElement<TabBarItemProps>[];
  bgNavBar?: string;
  bgNavBarSelector?: string;
  stroke?: string;
  style?: StyleProp<ViewStyle>;
}

interface TabBarState {
  selectedIndex: number;
  defaultPage: number;
  navFontSize: number;
  navTextColor: string;
  navTextColorSelected: string;
  circleRadius: Animated.Value;
  pathD: Animated.Value;
  value: string;
  showIcon: boolean;
}

export default class TabBar extends Component<TabBarProps, TabBarState> {
  private _myCircle: any;
  static Item: typeof TabBarItem;
  private _swiperRef: Swiper;
  constructor(props: TabBarProps) {
    super(props);

    this.state = {
      selectedIndex: 0,
      defaultPage: 1,
      navFontSize: 12,
      navTextColor: "rgb(148, 148, 148)",
      navTextColorSelected: "rgb(51, 163, 244)",
      circleRadius: new Animated.Value(58),
      pathD: new Animated.Value(108),
      value: "108",
      showIcon: true,
    };

    this.state.circleRadius.addListener((circleRadius) => {
      if (this._myCircle) {
        this._myCircle.setNativeProps({ cx: circleRadius.value.toString() });
      }
    });

    this.state.pathD.addListener(({ value }) => {
      this.setState({
        value: value.toString(),
      });
    });
  }

  render() {
    const { children } = this.props;
    const { selectedIndex, showIcon } = this.state;

    return (
      <View style={[styles.container, this.props.style]}>
        {children.length > 0 && (
          <Swiper
            ref={(ref) => (this._swiperRef = ref)}
            showsPagination={false}
            loop={false}
            autoplay={false}
            scrollEnabled={false}
          >
            {React.Children.map(children, (child, i) => {
              return <View style={{ flex: 1 }}>{child}</View>;
            })}
          </Swiper>
        )}

        {/* {children[selectedIndex]} */}

        <View style={[styles.content]}>
          <View
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              width: "100%",
              height: 72,
              bottom: 0,
            }}
          ></View>
          <View style={styles.subContent}>
            {React.Children.map(children, (child, i) => {
              const imgSrc =
                selectedIndex === i && showIcon ? (
                  <View style={styles.circle}>{child.props.selectedIcon}</View>
                ) : (
                  child.props.icon
                );

              return (
                <TouchableHighlight
                  key={i}
                  underlayColor={"transparent"}
                  style={styles.navItem}
                  onPress={() => this.update(i)}
                >
                  {imgSrc}
                </TouchableHighlight>
              );
            })}
          </View>
          <View style={{ ...boxShadow("rgba(0, 0, 0, 0.2)", 0, 2, 3) }}>
            {console.log("ha")}
            <AnimatedTabbar
              value={this.state.value}
              refCircle={(ref) => (this._myCircle = ref)}
            />
          </View>
        </View>
      </View>
    );
  }

  update(index) {
    let that = this;

    if (this.state.selectedIndex == index) {
      return;
    }

    this._swiperRef.scrollTo(index);

    that.setState({
      selectedIndex: index,
      showIcon: false,
    });

    Animated.spring(that.state.pathD, {
      toValue: 108 + index * 88,
      friction: 10,
      useNativeDriver: false,
    }).start();
    setTimeout(function () {
      that.setState({
        showIcon: true,
      });
    }, 100);
    Animated.spring(that.state.circleRadius, {
      toValue: 58 + index * 88,
      friction: 10,
      useNativeDriver: false,
    }).start();
  }
}

TabBar.Item = TabBarItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  content: {
    flexDirection: "column",
    zIndex: 0,
    width: Dimensions.get("window").width - 30,
    // left: "4%",
    // right: "4%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  subContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
    marginBottom: 10,
    zIndex: 1,
    elevation: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 50,
    width: "100%",
  },
  navItem: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  circle: {
    bottom: 25,
  },
});

interface AnimatedTabbarProps {
  value: string;
  refCircle: any;
}

const AnimatedTabbar = React.memo(
  ({ value, refCircle }: AnimatedTabbarProps) => {
    const [parseValue, setParseValue] = useState(null);

    useEffect(() => {
      let data = {
        pathX1: value.toString(),
        pathX2: (parseInt(value + "") - 100).toString(),
        pathX3: (parseInt(value + "") - 6).toString(),
        pathX4: (parseInt(value + "") - 10).toString(),
        pathX5: (parseInt(value + "") - 11).toString(),
        pathX6: (parseInt(value + "") - 16).toString(),
        pathX7: (parseInt(value + "") - 32).toString(),
        pathX8: (parseInt(value + "") - 50).toString(),
        pathX9: (parseInt(value + "") - 69).toString(),
        pathX10: (parseInt(value + "") - 85).toString(),
        pathX11: (parseInt(value + "") - 90).toString(),
        pathX12: (parseInt(value + "") - 91).toString(),
        pathX13: (parseInt(value + "") - 95).toString(),
      };
      setParseValue(data);
    }, [value]);

    if (!parseValue) {
      return null;
    }
    return (
      <AnimatedSvg
        id="bottom-bar"
        x="0px"
        y="0px"
        width="100%"
        height="100"
        viewBox="0 0 380 93"
      >
        {console.log("render animate")}
        <AnimatedPath
          fill={"#fff"}
          stroke={"rgba(0,0,0, 0.1)"}
          strokeWidth={1}
          d={`M8 38C5.23858 38 3 40.2386 3 43V68C3 79.0457 11.9543 88 23 88H${parseValue?.pathX2}V87.9717H${parseValue?.pathX1}V88H357C368.046 88 377 79.0457 377 68V43C377 40.2386 374.761 38 372 38H${parseValue?.pathX1}C${parseValue?.pathX3}.926 38.3835 ${parseValue?.pathX4}.945 42.6154 ${parseValue?.pathX5}.605 47.6155C${parseValue?.pathX6}.918 65.0989 ${parseValue?.pathX7}.962 77.9717 ${parseValue?.pathX8} 77.9717C${parseValue?.pathX9}.038 77.9717 ${parseValue?.pathX10}.082 65.0989 ${parseValue?.pathX11}.395 47.6155C${parseValue?.pathX12}.055 42.6154 ${parseValue?.pathX13}.074 38.3835 ${parseValue?.pathX2} 38H8Z`}
        />
        <AnimatedCircle
          ref={refCircle}
          fill={"#fff"}
          stroke={"rgba(0,0,0, 0.1)"}
          strokeWidth={1}
          cx="58"
          cy="37"
          r="36"
        />
      </AnimatedSvg>
    );
  }
);
