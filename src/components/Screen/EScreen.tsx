import React from "react";

import {
  View,
  StyleProp,
  ViewStyle,
  Platform,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Box, Center, Container } from "native-base";
import { EHeader, HeaderProps } from "../Header/EHeader";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { boxShadow, colors } from "@/styles/theme";
import OptimizedHeavyScreen from "react-navigation-heavy-screen/src/heavy-screen";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { KeyboardSpacer } from "../Keyboard/KeyboardSpacer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IAppProps extends HeaderProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  enableKeyboardAware?: boolean;
  hideHeader?: boolean;
  edges?: Edge[];
}

export const EScreen = ({
  style, // style view dưới header
  headerTitle, // title của header
  containerStyle, // style nguyên screen
  children,
  scrollEnabled = true,
  enableKeyboardAware = false, // có scroll hay không
  componentLeft, //component custom cho bên trái header
  componentRight, //component custom cho bên phải header
  componentTitle, //component custom cho title header
  showHeaderTool = false, // hiện trái phải header
  showLeft = true, // hiện trái header
  showRight = true, // hiện phải header
  hideShadow = false, // ẩn shadow header
  headerColor = "#fff", // màu của header
  fixedHeader = false, // để header cố định 1 chỗ
  onPressBack, // xử lí nut back
  hideHeader = false, // ẩn header
  edges = ["left", "right"], //cạnh safearea
  ...props
}: IAppProps) => (
  <Box
    style={[
      { flexGrow: 1, backgroundColor: colors.borderBase },
      containerStyle,
    ]}
  >
    {!hideHeader && (
      <View
        style={!hideShadow && { ...boxShadow("rgba(0, 0, 0, 0.15)", 0, 2, 4) }}
      >
        <EHeader
          {...{
            headerTitle,
            componentLeft,
            componentRight,
            componentTitle,
            showHeaderTool,
            hideShadow,
            showLeft,
            showRight,
            headerColor,
            fixedHeader,
            onPressBack,
            ...props,
          }}
        />
      </View>
    )}

    <OptimizedHeavyScreen style={{ flex: 1 }} placeHolder={PlaceholderView}>
      <SafeAreaView edges={edges} style={{ flex: 1 }}>
        {enableKeyboardAware ? (
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            scrollEnabled={scrollEnabled}
            nestedScrollEnabled
            enableOnAndroid
            enableAutomaticScroll={Platform.OS === "ios"}
            contentContainerStyle={[style]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableResetScrollToCoords
          >
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View style={style}>{children}</View>
        )}
      </SafeAreaView>
    </OptimizedHeavyScreen>
  </Box>
);

export const PlaceholderView = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
