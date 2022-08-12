/**
 * Ghi chú do đơn hàng
 * @param {string} note
 * @param {Function} onPress //Nhấn để update note
 */

import { NoteSvg } from "@/assets/svg/NoteSvg";
import { EInput } from "@/components/Input/EInput";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { isEqual } from "lodash";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type PaymentNoteProps = {
  note: string;
  onPress: () => void;
};

export const PaymentNote = React.memo(
  ({ note, onPress }: PaymentNoteProps) => {
    return (
      <View>
        <RowView>
          <NoteSvg />
          <Typography
            preset="mediumLabel"
            colorPreset="primary"
            style={{ marginLeft: 8 }}
          >
            Ghi chú
          </Typography>
        </RowView>

        <Pressable onPress={onPress}>
          <EInput
            containerStyle={{ marginTop: 12 }}
            value={note}
            placeholder="Bạn có muốn dặn dò thêm gì không?"
            multiline
            pointerEvents="none"
            editable={Platform.OS === "ios"}
            inputStyle={{ backgroundColor: "#fff" }}
            style={{ height: 100, textAlignVertical: "top" }}
          />
        </Pressable>
      </View>
    );
  },
  (prev, next) => isEqual(prev, next)
);
