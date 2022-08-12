import { colors } from "@/styles/theme";
import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import Typography from "../Text/Typography";

export const EPopupBottom = ({ visible, title, onClose, children }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.borderBase,
            borderRadius: 2,
            height: 4,
            width: 100,
            marginVertical: 16,
          }}
        />
        <Typography preset="body" colorPreset="primaryText" align="center">
          {title}
        </Typography>
        <View style={{ width: "100%" }}>{children}</View>
      </View>
    </Modal>
  );
};
