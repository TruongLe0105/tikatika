import React from "react";
import { Composer } from "react-native-gifted-chat";
import { colors } from "@/styles/theme";

export const CustomComposer = (props) => {
  return (
    <Composer
      {...props}
      textInputStyle={{
        color: colors.regularText,
        fontSize: 16,
        fontFamily: "text-regular",
        lineHeight: 24,
      }}
      placeholderTextColor={colors.background}
    />
  );
};
