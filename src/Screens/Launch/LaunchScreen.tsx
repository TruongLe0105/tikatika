import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  StyleSheet,
  Platform,
} from "react-native";
import { colors, appStyle } from "@/styles/theme";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/styles/dimensions";
import { LogoAppSvg } from "@/assets/svg/LogoAppSvg";
import { MaterialIndicator } from "react-native-indicators";
import * as Progress from "react-native-progress";
import { EImage } from "@/components/Image/EImage";
import { SafeAreaView } from "react-native-safe-area-context";

export const LaunchScreen = ({ startAsync, onFinish }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    startAsync().then(() => {
      setProgress(1);
      setTimeout(() => {
        onFinish();
      }, 500);
    });
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <LogoAppSvg size={200} /> */}
      {Platform.OS === "android" && (
        <EImage
          source={require("@/assets/splashscreen.png")}
          defaultSource={require("@/assets/splashscreen.png")}
        />
      )}
      {Platform.OS === "ios" && (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "50%", aspectRatio: 3 / 1 }}>
            <EImage
              source={require("@/assets/tika_logo.png")}
              defaultSource={require("@/assets/tika_logo.png")}
            />
          </View>
        </SafeAreaView>
      )}

      <View
        style={{
          width: "80%",
          height: "100%",
          position: "absolute",
          justifyContent: "center",
          top: 100,
        }}
      >
        <Progress.Bar
          style={{
            // position: "absolute",
            left: 0,
            bottom: 0,
            // backgroundColor: "blue",
            transform: [
              {
                translateY: 4.5,
              },
            ],
          }}
          progress={1}
          width={null}
          height={4}
          animationType="timing"
          borderRadius={0}
          color={"#dc45344d"}
          unfilledColor={"rgba(255,255,255,0.4)"}
          borderWidth={0}
        />
        <Progress.Bar
          progress={progress}
          width={null}
          height={4}
          animated
          animationType="timing"
          borderRadius={0}
          color={"#fff"}
          unfilledColor={"rgba(255,255,255,0.4)"}
          borderWidth={0}
        />
      </View>
    </View>
  );
};
