import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@/Screens/Home/HomeScreen";
import Typography from "@/components/Text/Typography";
import { HomeSvg } from "@/assets/svg/HomeSvg";

import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import appStore from "@/store/appStore";
import { FoodOrderHistoryScreen } from "@/Screens/FoodOrderHistory/FoodOrderHistoryScreen";
import VideoScreen from "@/Screens/Video/VideoScreen";
import { ScreenName } from "@/utils/enum";
import { FoodCartScreen } from "@/Screens/FoodCart/FoodCartScreen";
import { MyPageScreen } from "@/Screens/MyPage/MyPageScreen";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CartSvg } from "@/assets/svg/CartSvg";
import { boxShadow, colors } from "@/styles/theme";
import { TabbarHistorySvg } from "@/assets/svg/TabbarHistorySvg";
import { TabbarMyPageSvg } from "@/assets/svg/TabbarMyPageSvg";
import { TabbarLiveSvg } from "@/assets/svg/TabbarLiveSvg";
import { TabbarHomeSvg } from "@/assets/svg/TabbarHomeSvg";
import { CartTabSvg } from "@/assets/svg/CartTabSvg";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ({ route }) => {
  const [routeName, setRouteName] = useState(
    route.params?.tabName || "HomeScreen"
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      lazy
      initialRouteName={routeName}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: TabbarHomeSvg,
        }}
      />

      <Tab.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          tabBarLabel: "Video",
          tabBarIcon: TabbarLiveSvg,
        }}
      />

      {/* <Tab.Screen
        name={ScreenName.FoodOrderHistory}
        component={FoodOrderHistoryScreen}
        options={{
          tabBarLabel: "Lịch sử",
          tabBarIcon: TabbarHistorySvg,
        }}
      /> */}

      <Tab.Screen
        name={ScreenName.FoodCart}
        options={{
          tabBarLabel: "Giỏ hàng",
          tabBarIcon: CartTabSvg,
        }}
      >
        {(props) => <FoodCartScreen {...props} isTab={true} />}
      </Tab.Screen>

      <Tab.Screen
        name={ScreenName.MyPage}
        component={MyPageScreen}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: TabbarMyPageSvg,
        }}
      />
    </Tab.Navigator>
  );
};

const MyTabBar = observer(({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          height: isIphoneX() ? 100 : 65,
          paddingVertical: 12,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          ...boxShadow("rgba(0, 0, 0, 0.08)", 0, -2, 4),
          elevation: 10,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon = options.tabBarIcon;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={{
                selected: isFocused,
              }}
              activeOpacity={0.8}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center", marginHorizontal: 4 }}
            >
              <Icon color={colors.primary} selected={isFocused} />
              <Typography
                preset="superSmallLabel"
                color={isFocused ? "#000" : colors.secondaryText}
                style={{ marginTop: 4 }}
              >
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
});
