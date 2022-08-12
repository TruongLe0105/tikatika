/**
 * Hiển thị mã giảm giá đc chọn, và số tiền đc giảm
 * @param {number} moneyDiscount
 * @param {Promotion} promotion
 * @param {Function} onPress //Khi nhấn chọn coupon
 */

import { ArrowRightSvg } from "@/assets/svg/ArrowRightSvg";
import { CouponSvg } from "@/assets/svg/CouponSvg";
import { TicketSvg } from "@/assets/svg/TicketSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type CouponPaymentProps = {
  moneyDiscount: number;
  promotion: Promotion;
  onPress: () => void;
};

export const CouponPayment = React.memo(
  ({ moneyDiscount, promotion, onPress }: CouponPaymentProps) => {
    console.log("promotion", promotion);
    return (
      <View>
        <RowView justifyContent="space-between">
          <RowView>
            <CouponSvg />
            <Typography
              preset="mediumLabel"
              colorPreset="primary"
              style={{ marginLeft: 8 }}
            >
              Coupon
            </Typography>
          </RowView>

          <Pressable onPress={onPress}>
            <RowView>
              {promotion ? (
                <RowView
                  style={{
                    marginRight: 8,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    backgroundColor: "rgba(253, 108, 159, 0.08)",
                    borderRadius: 4,
                  }}
                >
                  <TicketSvg size={16} />
                  <Typography
                    preset="smallLabel"
                    colorPreset="primary"
                    lineHeight={Platform.OS === "ios" ? 0 : null}
                    style={{ marginLeft: 4 }}
                  >
                    {promotion.code}
                  </Typography>
                </RowView>
              ) : (
                <Typography
                  preset="smallParagraph"
                  colorPreset="primary"
                  lineHeight={12}
                  style={{ marginRight: 8 }}
                >
                  Chọn Coupon
                </Typography>
              )}
              <ArrowRightSvg />
            </RowView>
          </Pressable>
        </RowView>

        <RowView justifyContent="space-between" style={{ marginTop: 12 }}>
          <Typography preset="mediumParagraph" color="#000">
            Tiền được giảm
          </Typography>
          <Typography preset="smallTitle" colorPreset="secondaryText">
            {formatNumber(moneyDiscount)} đ
          </Typography>
        </RowView>
      </View>
    );
  },
  (prev, next) => isEqual(prev, next)
);
