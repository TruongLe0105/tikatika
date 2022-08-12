import React from "react";
import { MessageText } from "react-native-gifted-chat";
import { colors } from "@/styles/theme";
import { SCREEN_WIDTH } from "@/styles/dimensions";

export const CustomMessageText = (props) => {
  return (
    <MessageText
      {...props}
      containerStyle={{
        left: {
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 5,
          alignSelf: "flex-start",
          maxWidth: (SCREEN_WIDTH * 2) / 3,
        },
        right: {
          backgroundColor: colors.primary,
          borderRadius: 10,
          padding: 5,
          maxWidth: (SCREEN_WIDTH * 2) / 3,
          alignSelf: "flex-end",
        },
      }}
      textStyle={{
        left: { color: "#000" },
        right: { color: "#fff" },
      }}
      customTextStyle={{
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "text-regular",
      }}
    />
  );
};
