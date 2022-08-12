import { colors } from "@/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export const PinLocation = ({ heightMapBox, translateOriginPoint }) => {
  const topPinLocation = useMemo(() => {
    if (heightMapBox) {
      return heightMapBox / 2 - 40;
    }
    return 0;
  }, [heightMapBox]);

  return (
    <View
      style={{
        alignItems: "center",
        position: "absolute",
        left: "50%",
        right: "50%",
        top: topPinLocation,
      }}
    >
      <View
        style={{
          height: 60,
          aspectRatio: 30 / 37,
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#9b9b9b",
            width: 4,
            aspectRatio: 1 / 1,
            borderRadius: 3.5,
            transform: [{ scaleX: 2 }],
            position: "absolute",
            bottom: 8,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 1,
          }}
        />
        <Animated.View
          style={[
            {
              width: 3,
              height: 11,
              borderRadius: 1.5,
              backgroundColor: "white",
              position: "absolute",
              bottom: 10,
              elevation: 2,
              alignSelf: "center",
            },
            {
              transform: [{ translateY: translateOriginPoint }],
            },
          ]}
        />
        <View
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 3,
          }}
        >
          <LinearGradient
            style={{
              width: 30,
              aspectRatio: 1 / 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            colors={[colors.primary, colors.primary]}
            start={[0.0, 0.0]}
            end={[1.0, 0.0]}
          />
          <LinearGradient
            style={{
              position: "absolute",
              top: 2.5,
              left: 2.4,
              width: 25,
              aspectRatio: 1 / 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12.5,
            }}
            colors={["#fff", "#fff"]}
            start={[0.0, 0.0]}
            end={[0.0, 1.0]}
          />
          <LinearGradient
            style={{
              height: 10,
              aspectRatio: 1 / 1,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 10,
              left: 10,
            }}
            colors={[colors.primary, colors.primary]}
            start={[0.0, 0.0]}
            end={[0.0, 1.0]}
          />
        </View>
      </View>
    </View>
  );
};
