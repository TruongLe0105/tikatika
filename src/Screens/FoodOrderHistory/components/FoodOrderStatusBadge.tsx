import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { OrderFoodStatus, OrderFoodStatusTrans } from "@/types/food-order";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/theme";

type FoodOrderStatusBadgeProps = {
  status: OrderFoodStatus;
};

export const FoodOrderStatusBadge = ({ status }: FoodOrderStatusBadgeProps) => {
  return (
    <RowView style={[styles[status], styles.container, { borderRadius: 12 }]}>
      <View
        style={[
          {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: fontStyles[status]?.color || "#fff",
            marginRight: 4,
          },
        ]}
      ></View>
      <Typography
        family="medium"
        style={[{ fontSize: 10, lineHeight: 12 }, fontStyles[status]]}
      >
        {OrderFoodStatusTrans[status]}
      </Typography>
    </RowView>
  );
};

const fontStyles = StyleSheet.create({
  [OrderFoodStatus.AcceptOrder]: {
    color: "#fff",
  },
  [OrderFoodStatus.FindDriver]: {
    color: "#fff",
  },
  [OrderFoodStatus.Delivering]: {
    color: "#fff",
  },
  [OrderFoodStatus.Waiting]: {
    color: "#fff",
  },
  [OrderFoodStatus.DriverCancel]: {
    color: "#fff",
  },
  [OrderFoodStatus.CustomerCancel]: {
    color: "#fff",
  },
  [OrderFoodStatus.AdminCancel]: {
    color: "#fff",
  },
  [OrderFoodStatus.StoreCancel]: {
    color: "#fff",
  },
  [OrderFoodStatus.PendingPayment]: {
    color: "#fff",
  },
  [OrderFoodStatus.Cook]: {
    color: "#5B5B5B",
  },
  [OrderFoodStatus.Complete]: {
    color: "#fff",
  },
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  [OrderFoodStatus.AcceptOrder]: {
    backgroundColor: "#FF9800",
  },
  [OrderFoodStatus.DriverCancel]: {
    backgroundColor: colors.error,
  },
  [OrderFoodStatus.CustomerCancel]: {
    backgroundColor: colors.error,
  },
  [OrderFoodStatus.AdminCancel]: {
    backgroundColor: colors.error,
  },
  [OrderFoodStatus.StoreCancel]: {
    backgroundColor: colors.error,
  },
  [OrderFoodStatus.FindDriver]: {
    backgroundColor: "#FF9800",
  },
  [OrderFoodStatus.Delivering]: {
    backgroundColor: "#2196F3",
  },
  [OrderFoodStatus.PendingPayment]: {
    backgroundColor: "#2196F3",
  },
  [OrderFoodStatus.Waiting]: {
    backgroundColor: "#2196F3",
  },
  [OrderFoodStatus.Cook]: {
    backgroundColor: "#FFFF00",
  },
  [OrderFoodStatus.Complete]: {
    backgroundColor: colors.success,
  },
});
