/**
 * Chi tiết phí đơn food
 * @param {number} moneyDistance
 * @param {number} point
 * @param {number} moneyFinal
 */

import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { PaymentType, PaymentTypeTrans } from "@/types/payment";
import { formatNumber } from "@/utils/helper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FoodOrderPricingProps = {
  moneyDistance: number;
  point: number;
  moneyFinal: number;
  moneyDiscount: number;
  moneyTotal: number;
  moneyRushHour?: number;
  paymentType: PaymentType;
};

export const FoodOrderPricing = React.memo(
  ({
    moneyDistance,
    moneyFinal,
    point,
    moneyDiscount,
    moneyTotal,
    moneyRushHour,
    paymentType,
  }: FoodOrderPricingProps) => {
    return (
      <View>
        <RowView justifyContent="space-between">
          <Typography style={styles.label}>Phí vận chuyển</Typography>
          <Typography color={"#F44336"} style={styles.value}>
            {formatNumber(moneyDistance)}đ
          </Typography>
        </RowView>

        <RowView justifyContent="space-between">
          <Typography style={styles.label}>Tiền đồ ăn</Typography>
          <Typography color={"#F44336"} style={styles.value}>
            {formatNumber(moneyTotal)}đ
          </Typography>
        </RowView>

        {!!moneyRushHour && (
          <RowView justifyContent="space-between">
            <Typography style={styles.label}>Phí giờ cao điểm</Typography>
            <Typography color={"#F44336"} style={styles.value}>
              {formatNumber(moneyRushHour)}đ
            </Typography>
          </RowView>
        )}

        {/* {point > 0 && (
        <RowView justifyContent="space-between">
          <Typography style={styles.label}>Điểm tích luỹ</Typography>
          <Typography color="#4CAF50" style={styles.value}>
            {formatNumber(point)} đ
          </Typography>
        </RowView>
      )} */}

        {moneyDiscount > 0 && (
          <RowView justifyContent="space-between">
            <Typography style={styles.label}>Khuyến mãi</Typography>
            <Typography color="#4CAF50" style={styles.value}>
              -{formatNumber(moneyDiscount)}đ
            </Typography>
          </RowView>
        )}

        <View
          style={{ height: 1, backgroundColor: "#D7D9D9", marginVertical: 12 }}
        ></View>

        <RowView justifyContent="space-between">
          <Typography
            style={{ alignSelf: "flex-start" }}
            color="#000"
            family="bold"
            size={16}
          >
            TỔNG CỘNG
          </Typography>
          <View style={{ alignItems: "flex-end" }}>
            <Typography color={"#F44336"} family="bold" size={16}>
              {formatNumber(moneyFinal)}đ
            </Typography>
            <Typography color="#9FA0A0" family="medium">
              {PaymentTypeTrans[paymentType]}
            </Typography>
          </View>
        </RowView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    lineHeight: 20,
    color: "#000",
  },
  value: {
    fontSize: 12,
    lineHeight: 12,
  },
});
