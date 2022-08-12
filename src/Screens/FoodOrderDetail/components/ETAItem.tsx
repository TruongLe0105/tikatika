/**
 * Hiển thị chi tiết của 1 thời gian dự kiến
 * @param {string} label ex: nhận đơn, đang giao,...
 * @param {string} status // pending, complete
 * @param {time} number
 */

import { StepCurrentSvg } from "@/assets/svg/StepCurrentSvg";
import { StepDoneSvg } from "@/assets/svg/StepDoneSvg";
import { StepWaitingSvg } from "@/assets/svg/StepWaitingSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { OrderFoodStatus } from "@/types/food-order";
import { formatDateTime } from "@/utils/helper";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type ETAItemProps = {
  label: string;
  currentStatus: OrderFoodStatus; // trạng thái đơn hiện tại,
  status: OrderFoodStatus; //Loại trạng thái của step này
  time: number;
  isSelected: boolean;
  visibleLine?: boolean;
  visibleWaiting?: boolean;
};

export const ETAItem = ({
  label,
  status,
  time,
  isSelected,
  currentStatus,
  visibleLine = true,
  visibleWaiting = true,
}: ETAItemProps) => {
  const statusDefine = [
    OrderFoodStatus.Waiting,
    OrderFoodStatus.FindDriver,
    OrderFoodStatus.AcceptOrder,
    OrderFoodStatus.Delivering,
    OrderFoodStatus.Complete,
  ];

  const currentStatusIndex = useMemo(
    () => statusDefine.findIndex((e) => e == currentStatus),
    [currentStatus]
  );

  const statusIndex = useMemo(
    () => statusDefine.findIndex((e) => e == status),
    []
  );

  const renderStepIcon = () => {
    if (
      (currentStatusIndex < statusIndex && currentStatusIndex > -1) ||
      currentStatus == OrderFoodStatus.Waiting
    ) {
      return <StepWaitingSvg size={30} />;
    } else if (
      currentStatusIndex == statusIndex &&
      currentStatus != OrderFoodStatus.Complete
    ) {
      return <StepCurrentSvg size={30} />;
    } else if (
      currentStatusIndex > statusIndex ||
      currentStatus == OrderFoodStatus.Complete
    ) {
      return <StepDoneSvg size={30} />;
    }
  };

  return (
    <RowView style={{ height: 24 }}>
      {visibleLine && (
        <View
          style={{
            position: "absolute",
            width: 2,
            height: 30,
            top: 12,
            left: 14,
            backgroundColor:
              currentStatusIndex > statusIndex ? "#4CAF50" : "#F1F1F1",
          }}
        ></View>
      )}

      {renderStepIcon()}

      <RowView style={{ flex: 1 }} justifyContent="space-between">
        <Typography
          size={14}
          lineHeight={24}
          color="#000"
          family={isSelected ? "bold" : "regular"}
        >
          {label}
        </Typography>
        <Typography size={12} lineHeight={16}>
          {time > 0 ? formatDateTime(time) : "--"}
        </Typography>
      </RowView>
    </RowView>
  );
};
