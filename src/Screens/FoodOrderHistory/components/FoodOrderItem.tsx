/**
 * Hiển thị tổng quan đơn đặt hàng
 * @param {FoodOrder} foodOrder
 * @param {Function} onPress gọi khi nhấn tổng quan
 * @param {Function} onPressReceipt gọi khi nhấn icon hóa đơn
 * @param {boolean} visibleReceipt hiển thị icon hoá đơn, khi đơn đã hoàn thành
 */

import { BillSvg } from "@/assets/svg/BillSvg";
import { StoreSvg } from "@/assets/svg/StoreSvg";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { appStyle, boxShadow, colors } from "@/styles/theme";
import { FoodOrder, OrderFoodStatus } from "@/types/food-order";
import { formatDateTime, formatNumber } from "@/utils/helper";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dash from "react-native-dash";
import { FoodOrderStatusBadge } from "./FoodOrderStatusBadge";

type FoodOrderItemProps = {
  foodOrder: FoodOrder;
  onPress: (val: FoodOrder) => void;
  visibleReceipt?: boolean;
  onPressReceipt?: (val: FoodOrder) => void;
};

export const FoodOrderItem = observer(
  ({
    foodOrder,
    onPress,
    visibleReceipt,
    onPressReceipt,
  }: FoodOrderItemProps) => {
    return (
      <View
        style={{
          ...boxShadow("rgba(0,0,0,0.08)", 0, 2, 4),
          backgroundColor: "#fff",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={() => onPress?.(foodOrder)}
          activeOpacity={0.7}
        >
          {/* store name */}
          <RowView
            style={{
              paddingVertical: 14,
              paddingHorizontal: 12,
              justifyContent: "space-between",
            }}
          >
            <RowView>
              <StoreSvg />
              <Typography
                style={{ marginLeft: 12 }}
                family="medium"
                size={14}
                color="#000"
                numberOfLines={1}
              >
                {foodOrder.store?.name}
              </Typography>
            </RowView>

            {/* receipt */}
            {foodOrder.status == OrderFoodStatus.Complete && (
              <TouchableOpacity
                onPress={() => onPressReceipt?.(foodOrder)}
                activeOpacity={0.7}
                style={{ paddingHorizontal: 4 }}
              >
                <BillSvg size={24} />
              </TouchableOpacity>
            )}
          </RowView>
          {/* line */}
          <Dash
            style={{
              width: "100%",
              height: 1,
              // marginVertical: 24,
            }}
            dashColor={colors.background}
            dashThickness={2}
            dashGap={2}
            dashLength={5}
          />
          <RowView style={{ padding: 12 }}>
            <View
              style={{
                width: 80,
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <EImage
                style={appStyle.image}
                source={{ uri: foodOrder.store?.thumbnail }}
              />
            </View>
            <View
              style={{
                height: "100%",
                flex: 1,
                marginLeft: 12,
                alignSelf: "flex-start",
              }}
            >
              <View style={{ flex: 1 }}>
                <Typography
                  style={{ fontSize: 12, lineHeight: 16, color: "#5B5B5B" }}
                >
                  {foodOrder.code} - {formatDateTime(foodOrder.createdAt)}
                </Typography>
                <Typography
                  style={{ fontSize: 12, lineHeight: 16, color: "#5B5B5B" }}
                >
                  {foodOrder.orderDetails?.length} món
                </Typography>
              </View>

              {/* price - status */}
              <RowView style={{ justifyContent: "space-between" }}>
                {/* price */}
                <Typography size={14} family="bold" color="#F44336">
                  {formatNumber(
                    foodOrder.isUseBalancePromotion ? 0 : foodOrder.moneyFinal
                  )}{" "}
                  đ
                </Typography>
                {/* status */}
                <FoodOrderStatusBadge status={foodOrder.status} />
              </RowView>
            </View>
          </RowView>
        </TouchableOpacity>
      </View>
    );
  }
);
