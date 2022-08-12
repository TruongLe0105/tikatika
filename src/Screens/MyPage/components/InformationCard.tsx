/**
 * Hiển thị thông tin ng dùng
 */

import { ArrowRightSvg } from "@/assets/svg/ArrowRightSvg";
import { EAvatar } from "@/components/Avatar/EAvatar";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { UserInfo } from "@/store/userStore";
import { colors } from "@/styles/theme";
import { formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  onPress: () => void;
  info: UserInfo;
}

export const InformationCard = React.memo(
  ({ onPress, info }: Props) => {
    console.log("info", info);
    return (
      <ShadowCard style={{ backgroundColor: colors.primary, padding: 16 }}>
        <RowView>
          <EAvatar size={48} image={info.avatar} />
          <Typography
            preset="mediumTitle"
            color={"#fff"}
            style={{ marginLeft: 12, flex: 1 }}
          >
            {info?.name}
          </Typography>
        </RowView>
        <Typography
          preset="smallParagraph"
          colorPreset="placeholder"
          style={{ marginTop: 16 }}
        >
          Tài khoản hiện đang có
        </Typography>
        <RowView style={{ marginTop: 4 }} justifyContent="space-between">
          <Typography preset="mediumTitle" colorPreset="yellow">
            {formatNumber(info?.balance, 0)} point
          </Typography>

          <Pressable
            onPress={onPress}
            hitSlop={50}
            style={{ flexDirection: "row", alignItems: "center", opacity: 0.5 }}
          >
            <Typography
              preset="smallLabel"
              color="#fff"
              lineHeight={0}
              style={{ marginRight: 4 }}
            >
              Xem chi tiết
            </Typography>
            <ArrowRightSvg size={16} color="#fff" />
          </Pressable>
        </RowView>
      </ShadowCard>
    );
  },
  (prev, next) => isEqual(prev, next)
);
