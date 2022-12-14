import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { boxShadow } from "@/styles/theme";

interface Tab {
  name: any;
}

interface StaticTabbarProps {
  tabs: Tab[];
  value: Animated.Value;
  width: number;
  onChangeIndex: (index) => void;
}

export default class StaticTabbar extends React.PureComponent<
  StaticTabbarProps
> {
  values: Animated.Value[] = [];

  constructor(props: StaticTabbarProps) {
    super(props);
    const { tabs } = this.props;
    this.values = tabs.map(
      (tab, index) => new Animated.Value(index === 0 ? 1 : 0)
    );
  }

  onPress = (index: number) => {
    const { value, tabs } = this.props;
    const tabWidth = this.props.width / tabs.length;
    Animated.sequence([
      Animated.parallel(
        this.values.map((v) =>
          Animated.timing(v, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          })
        )
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: tabWidth * index,
          useNativeDriver: true,
        }),
        Animated.spring(this.values[index], {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    this.props.onChangeIndex(index);
  };

  render() {
    const { onPress } = this;
    const { tabs, value } = this.props;
    return (
      <View style={styles.container}>
        {tabs.map((tab, key) => {
          const tabWidth = this.props.width / tabs.length;
          const cursor = tabWidth * key;
          const opacity = value.interpolate({
            inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
            outputRange: [1, 0, 1],
            extrapolate: "clamp",
          });
          const translateY = this.values[key].interpolate({
            inputRange: [0, 1],
            outputRange: [64, 0],
            extrapolate: "clamp",
          });
          const opacity1 = this.values[key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          });
          return (
            <React.Fragment {...{ key }}>
              <TouchableWithoutFeedback onPress={() => onPress(key)}>
                <Animated.View style={[styles.tab, { opacity }]}>
                  <tab.name size={24} />
                </Animated.View>
              </TouchableWithoutFeedback>
              <Animated.View
                style={{
                  position: "absolute",
                  top: -8,
                  left: tabWidth * key,
                  width: tabWidth,
                  height: 64,
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: opacity1,
                  transform: [{ translateY }],
                }}
              >
                <View style={styles.activeIcon}>
                  <tab.name size={30} selected />
                </View>
              </Animated.View>
            </React.Fragment>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeIcon: {
    backgroundColor: "white",
    width: 60,
    aspectRatio: 1 / 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -37,
    ...boxShadow("rgba(0, 0, 0, 0.2)", 0, 2, 3),
  },
});
