/**
 * Modal lấy hóa đơn điện tử
 * @param {FoodOrder} foodOrder
 * @param {boolean} visible
 * @param {Function} onDone
 * @param {Function} onClose
 */

import { foodOrderApi } from "@/api/foodOrder.api";
import { Alert } from "@/components/Alert/Alert";
import { Loading } from "@/components/Loading/Loading";
import { userStore } from "@/store/userStore";
import { FoodOrder } from "@/types/food-order";
import { validateEmail } from "@/utils/helper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type GetReceiptModalProps = {
  foodOrder: Partial<FoodOrder>;
  visible: boolean;
  onDone: () => void;
  onClose: () => void;
};

export const GetReceiptModal = ({
  visible,
  onClose,
  foodOrder,
  onDone,
}: GetReceiptModalProps) => {
  const handleConfirm = async (text) => {
    console.log("handleConfirm", text);
    onClose();
    if (!validateEmail(text)) {
      setTimeout(() => {
        Alert.alert({
          title: "Cảnh báo",
          message: "Địa chỉ email không hợp lệ!",
        });
      }, 500);
    } else {
      Loading.load();
      try {
        await foodOrderApi.invoice(foodOrder.id, { email: text });
        Alert.alert({
          title: "Thông báo",
          message:
            "Thông tin của bạn đã được gửi cho công ty. Công ty sẽ liên hệ lại với bạn trong thời gian sớm nhất. Xin cảm ơn!",
        });
        onDone?.();
      } finally {
        Loading.hide();
      }
    }
  };

  React.useEffect(() => {
    if (visible) {
      Alert.prompt({
        title: "Lấy hóa đơn điện tử",
        message: "Vui lòng nhập email để nhận hóa đơn.",
        cancelButtonText: "Để sau",
        confirmButtonText: "Lấy hóa đơn",
        onGetText: handleConfirm,
        onClose,
        defaultValue: userStore.info.email,
      });
    }
  }, [visible]);

  return <></>;
};
