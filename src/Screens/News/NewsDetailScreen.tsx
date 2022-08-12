import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { BackSvg } from "@/assets/svg/BackSvg";
import { EHeader } from "@/components/Header/EHeader";
import { EImage } from "@/components/Image/EImage";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { News } from "@/store/newsStore";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { colors } from "@/styles/theme";
import { Navigation } from "@/utils/Navigation";
import { Box } from "native-base";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AutoHeightWebView from "react-native-autoheight-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export const NewsDetailScreen = ({ route }) => {
  const news: News = route.params?.news;
  const aspectRatio = route.params?.aspectRatio || 2 / 1;

  return (
    <EScreen
      hideHeader
      edges={["top", "bottom"]}
      enableKeyboardAware
      style={{ flexGrow: 1 }}
    >
      {/* <View
        style={{
          backgroundColor: colors.primary,
          height: 500,
          marginTop: -500,
        }}
      /> */}
      <View style={{ width: SCREEN_WIDTH, aspectRatio }}>
        <EImage source={{ uri: news.thumbnail }} resizeMode={"cover"} />
        <EHeader fixedHeader showHeaderTool />
      </View>

      <Typography
        family="bold"
        size={25}
        lineHeight={30}
        style={{ margin: 20 }}
      >
        {news.title}
      </Typography>

      <AutoHeightWebView
        scrollEnabled={false}
        originWhitelist={["*"]}
        source={{
          html: `<div class="body">${news.body}</div>`,
        }}
        customStyle={`
            * {
              font-family: 'Roboto', sans-serif;
            }
            p {
              font-style: normal;
              font-weight: normal;
              font-size: 18px;
              line-height: 27px;
            }
          `}
        startInLoadingState={true}
        style={{
          width: SCREEN_WIDTH - 40,
          backgroundColor: "transparent",
          marginLeft: 20,
        }}
      />
    </EScreen>
  );
};
