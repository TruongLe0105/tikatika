import React from "react";
import { Time } from "react-native-gifted-chat";
import { colors } from "@/styles/theme";

export const CustomTime = (props) => {
  return (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: colors.background,
          fontFamily: "text-regular",
          fontSize: 14,
          lineHeight: 16,
        },
        right: {
          color: colors.background,
          fontFamily: "text-regular",
          fontSize: 14,
          lineHeight: 16,
        },
      }}
      containerStyle={{
        left: { marginTop: 5 },
        right: { marginTop: 5 },
      }}
    />
  );
};
