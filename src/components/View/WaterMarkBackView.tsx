import React from "react";
import { View, Text, Image } from "react-native";
import { WaterMarkSvg } from "@/assets/svg/WaterMarkSvg";
import { colors, appStyle } from "@/styles/theme";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/styles/dimensions";

export const WaterMarkBackView = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        aspectRatio: 414 / 325,
      }}
    >
      <Image
        source={require("@/assets/images/Banner.png")}
        resizeMode={"cover"}
        style={appStyle.image}
      />
    </View>
  );
};
