import React from "react";
import { View, Text, ViewProps } from "react-native";
import { boxShadow } from "@/styles/theme";

interface ShadowCardProps extends ViewProps {
  children?: React.ReactNode;
}

export const ShadowCard = ({ children, ...props }: ShadowCardProps) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#fff",
          borderRadius: 8,
          ...boxShadow("rgba(0, 0, 0, 0.08)", 0, 2, 4),
        },
        props.style,
      ]}
    >
      {children}
    </View>
  );
};
