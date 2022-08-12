/**
 * Nút thanh toán ở mh food cart
 * @param {number} money //Tạm tình
 * @param {Function} onPress
 * @param {Boolean} loading
 * @param {String} title
 */

import { MoneySvg } from "@/assets/svg/MoneySvg";
import { EButton } from "@/components/Button/EButton";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { alignJustify, colors } from "@/styles/theme";
import { formatNumber } from "@/utils/helper";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type FoodCartButtonProps = {
  money: number;
  onPress: () => void;
  loading?: boolean;
  title?: string;
  disabled?: boolean;
};

export const FoodCartButton = ({
  money,
  onPress,
  loading,
  title = "TẠM TÍNH",
  disabled,
}: FoodCartButtonProps) => {
  return (
    <RowView
      justifyContent="space-between"
      style={{
        backgroundColor: "rgba(253, 108, 159, 0.12)",
        borderRadius: 8,
        paddingLeft: 16,
        marginTop: 24,
      }}
    >
      <RowView style={{ flex: 1 }}>
        <MoneySvg />
        <View style={{ flex: 1, marginLeft: 8 }}>
          {!!title && (
            <Typography preset="superSmallParagraph" colorPreset="error">
              {title}
            </Typography>
          )}

          <Typography preset="mediumTitle" colorPreset="error">
            {formatNumber(money)}đ
          </Typography>
        </View>
      </RowView>

      <View>
        <EButton text="Thanh toán" onPress={onPress} disabled={disabled} />
        {loading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              ...alignJustify(),
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          >
            <ActivityIndicator color={colors.primary} />
          </View>
        )}
      </View>
    </RowView>
  );
};
