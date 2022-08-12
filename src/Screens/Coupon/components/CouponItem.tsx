/**
 * Hiển thị coupon item
 * @param {Promotion} promotion
 * @param {Function} onPress
 * */

import { CheckSvg } from "@/assets/svg/CheckSvg";
import { StoreSvg } from "@/assets/svg/StoreSvg";
import { TicketSvg } from "@/assets/svg/TicketSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { border } from "@/styles/border";
import { colors } from "@/styles/theme";
import { Promotion } from "@/types/promotion";
import { formatDate } from "@/utils/helper";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Dash from "react-native-dash";

type CouponItemProps = {
  promotion: Promotion;
  onPress: (promotion: Promotion) => void;
  isSelected?: boolean;
};

export const CouponItem = ({
  promotion,
  onPress,
  isSelected,
}: CouponItemProps) => {
  return (
    <Pressable onPress={() => onPress(promotion)}>
      <ShadowCard
        style={{
          ...border(1, isSelected ? colors.primary : colors.placeholder),
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          {promotion.store && (
            <RowView>
              <StoreSvg size={16} />
              <Typography
                preset="smallLabel"
                colorPreset="primary"
                style={{ marginLeft: 8, flex: 1 }}
              >
                {promotion.store.name}
              </Typography>
              {isSelected && <CheckSvg />}
            </RowView>
          )}

          <RowView style={{ marginTop: 8 }}>
            <TicketSvg size={32} />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Typography preset={"mediumLabel"} color="#000" numberOfLines={2}>
                {promotion.name}
              </Typography>
              <Typography
                preset="smallParagraph"
                colorPreset="regularText"
                numberOfLines={1}
                style={{ marginTop: 4 }}
              >
                {promotion.description}
              </Typography>
            </View>
          </RowView>
        </View>

        <Dash
          style={{
            width: "100%",
            height: 1,
          }}
          dashColor={colors.background}
          dashThickness={2}
          dashGap={2}
          dashLength={5}
        />

        <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
          <Typography preset="smallParagraph" colorPreset={"secondaryText"}>
            Hạn dùng đến {formatDate(promotion.end)}
          </Typography>
        </View>
      </ShadowCard>
    </Pressable>
  );
};
