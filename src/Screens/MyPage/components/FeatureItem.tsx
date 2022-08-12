/**
 * Hiển thị tên tính năng của mypage
 */

import { ArrowRightSvg } from "@/assets/svg/ArrowRightSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { notificationStore } from "@/store/notificationStore";
import { border } from "@/styles/border";
import { colors } from "@/styles/theme";
import { isEqual } from "lodash";
import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type Feature = {
  label: string;
  icon: React.JSXElementConstructor<any>;
  onPress: () => void;
  type?: string;
};

type FeatureItemProps = {
  feature: Feature;
};

export const FeatureItem = observer(({ feature }: FeatureItemProps) => {
  return (
    <Pressable onPress={feature.onPress}>
      <RowView justifyContent="space-between">
        <RowView>
          <feature.icon size={24} color={colors.primary} selected />
          <Typography
            preset="mediumLabel"
            color={"#000"}
            style={{ marginLeft: 8 }}
          >
            {feature.label}
          </Typography>
        </RowView>

        <RowView>
          {feature?.type == "notification" && !!notificationStore.totalUnseen && (
            <View
              style={{
                height: 12,
                aspectRatio: 1,
                borderRadius: 6,
                ...border(5, colors.error),
                marginRight: 8,
              }}
            />
          )}

          <ArrowRightSvg color={colors.secondaryText} />
        </RowView>
      </RowView>
    </Pressable>
  );
});
