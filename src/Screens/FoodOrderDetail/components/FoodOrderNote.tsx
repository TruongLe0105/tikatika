/**
 * Hiển thị ghi chú đơn food
 * @param {string} note
 */

import { NoteSvg } from "@/assets/svg/NoteSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FoodOrderNoteProps = {
  note: string;
};

export const FoodOrderNote = React.memo(({ note }: FoodOrderNoteProps) => {
  return (
    <View>
      <RowView>
        <NoteSvg size={24} />
        <Typography
          color="#FD6C9F"
          family="medium"
          style={{ marginLeft: 10 }}
          size={14}
          lineHeight={20}
        >
          Ghi chú
        </Typography>
      </RowView>
      <View style={{ marginTop: 12 }}>
        <Typography color="#5B5B5B" size={14} lineHeight={21}>
          {note}
        </Typography>
      </View>
    </View>
  );
});
