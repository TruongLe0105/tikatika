import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import { colors, appStyle } from "@/styles/theme";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/styles/dimensions";
import Typography from "@/components/Text/Typography";
import { Video } from "expo-av";
import * as Sentry from "@sentry/react-native";
import appStore from "@/store/appStore";

export const SplashScreen = ({ onLoad, videoRef, onError, onFinish }) => {
  const _onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      onFinish();
    }
  };

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
      }}
    >
      <Video
        ref={videoRef}
        onLoad={onLoad}
        source={require("@/assets/splash.mp4")}
        style={appStyle.image}
        resizeMode={"cover"}
        onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
        onError={(error) => {
          onError();
          Sentry.captureMessage(error);
          Sentry.captureException(error);
        }}
      />
    </View>
  );
};
