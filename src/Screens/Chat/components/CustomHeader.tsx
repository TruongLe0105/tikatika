import React from "react";
import { RowView } from "@/components/View/RowView";
import Typography from "@/components/Text/Typography";

import { BImage } from "@/components/Image/BImage";
import { width } from "styled-system";
import { Pressable, View } from "react-native";
import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { EAvatar } from "@/components/Avatar/EAvatar";
import { EImage } from "@/components/Image/EImage";

export const CustomHeader = ({ name, avatar, onBack }) => {
  return (
    <RowView style={{ flex: 1 }}>
      <Pressable onPress={onBack} hitSlop={50}>
        <ArrowLeftSvg />
      </Pressable>
      <View
        style={{
          marginLeft: 10,
          height: 40,
          aspectRatio: 1,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <EImage source={{ uri: avatar }} />
      </View>
      <Typography preset="mediumTitle" color="#000" style={{ marginLeft: 10 }}>
        {name}
      </Typography>
    </RowView>
  );
};
