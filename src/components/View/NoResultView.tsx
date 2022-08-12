import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import Typography from "@/components/Text/Typography";

interface NoResultProps {
  icon?: React.ReactNode;
  title: string;
  content?: string;
}

export const NoResultView = ({ icon, title, content }: NoResultProps) => {
  return (
    <View style={{ marginHorizontal: 16, alignItems: "center" }}>
      {icon}
      <Typography
        align="center"
        preset="smallTitle"
        colorPreset="primaryText"
        style={{ marginTop: 24 }}
      >
        {title}
      </Typography>

      <Typography
        align="center"
        preset="mediumParagraph"
        colorPreset="secondaryText"
        style={{ marginTop: 4 }}
      >
        {content}
      </Typography>
    </View>
  );
};
