/**
 * Hiển thị mã giới thiêu, nút share
 * @param {string} code
 * @param {Function} onPress
 */

import { ShareSvg } from "@/assets/svg/ShareSvg";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SharePanelProps = {
  code: string;
  onPress: () => void;
};

export const SharePanel = ({ code, onPress }: SharePanelProps) => {
  return (
    <ShadowCard
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginTop: 8,
      }}
    >
      <View style={{ flex: 1 }}>
        <Typography preset="smallParagraph" color="#000">
          Mã giới thiệu của bạn
        </Typography>
        <Typography
          preset="mediumTitle"
          colorPreset="primary"
          style={{ marginTop: 5 }}
        >
          {code}
        </Typography>
      </View>
      <EButton
        onPress={onPress}
        componentLeft={<ShareSvg size={16} color="#fff" />}
        text="Chia sẻ"
        containerStyle={{ paddingVertical: 8 }}
      />
    </ShadowCard>
  );
};
