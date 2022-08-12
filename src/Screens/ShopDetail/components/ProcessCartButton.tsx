/**
 * Nút ở mh shop detail, nhấn để qua mh cart
 * @param {number} total //số món ăn
 * @param {number} money //số tiền
 * @param {Function} onPress
 */

import { CartSvg } from "@/assets/svg/CartSvg";
import { CartTabSvg } from "@/assets/svg/CartTabSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { formatNumber } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ProcessCartButtonProps = {
  total: number;
  money: number;
  onPress: () => void;
};

const initialTime = 5; // initial time countdown

export const ProcessCartButton = ({
  total,
  money,
  onPress,
}: ProcessCartButtonProps) => {
  if (total == 0) {
    return null;
  }

  return (
    <Pressable onPress={onPress} style={{ padding: 16 }}>
      <ShadowCard
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: colors.primary,
        }}
      >
        <CartTabSvg selected />
        <Typography
          preset="mediumLabel"
          color="#fff"
          style={{ marginLeft: 8, flex: 1 }}
        >
          {total} món
        </Typography>
        <Typography preset="mediumTitle" color="#fff">
          {formatNumber(money)}đ
        </Typography>
      </ShadowCard>
    </Pressable>
  );
};
