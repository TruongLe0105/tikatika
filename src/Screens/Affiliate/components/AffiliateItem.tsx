/**
 * Hiển thị ng giới thiệu
 * @param {Affiliate} affiliate
 */
import { EAvatar } from "@/components/Avatar/EAvatar";
import { EButton } from "@/components/Button/EButton";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { Affiliate } from "@/types/affilicate";
import { formatDateTime, formatNumber } from "@/utils/helper";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type AffiliateItemProps = {
  affiliate: Affiliate;
};

export const AffiliateItem = ({ affiliate }: AffiliateItemProps) => {
  console.log("object", affiliate);
  const colorLevel = useMemo(() => {
    switch (affiliate.level) {
      case 1:
        return "#AED581";
      case 2:
        return "#4DB6AC";
      case 3:
        return "#4FC3F7";
      case 4:
        return "#7986CB";
      case 5:
        return "#BA68C8";

      default:
        return "#AED581";
    }
  }, []);

  return (
    <RowView>
      <EAvatar size={48} image={affiliate.children?.avatar} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Typography preset="mediumLabel" color="#000">
          {affiliate.children.name}
        </Typography>
        <Typography
          preset="smallParagraph"
          colorPreset="secondaryText"
          style={{ marginTop: 4 }}
        >
          Kích hoạt: {formatDateTime(affiliate.createdAt)}
        </Typography>
        <Typography
          preset="smallLabel"
          color={colorLevel}
          style={{ marginTop: 4 }}
        >
          Cấp {affiliate.level}
        </Typography>
      </View>

      <EButton
        border
        color={[colors.success]}
        text={`+${formatNumber(affiliate.pointAdd, 0)} điểm`}
        style={{ maxWidth: 100 }}
        containerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
      />
    </RowView>
  );
};
