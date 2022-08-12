import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Platform } from "react-native";

export const Shadow = () => {
  return Platform.OS === "android" ? (
    <LinearGradient
      style={{ width: "100%", height: 8 }}
      colors={["rgba(0,0,0,0.15)", "#fff"]}
      start={[0.0, 0.0]}
      end={[0.0, 1]}
    ></LinearGradient>
  ) : (
    <LinearGradient
      style={{ width: "100%", height: 30, marginTop: -22, zIndex: -1 }}
      colors={["rgba(0,0,0,0.15)", "#fff"]}
      start={[0.0, 0.0]}
      end={[0.0, 1]}
    ></LinearGradient>
  );
};
