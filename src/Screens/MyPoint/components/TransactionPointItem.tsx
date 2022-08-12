/**
 *  Hiển thị loại giao dịch của point
 *  @param {TransactionPoint} transactionPoint
 */

import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { formatDateTime } from "@/utils/helper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TransactionPointItemProps = {
  transactionPoint: TransactionPoint;
};

export const TransactionPointItem = ({
  transactionPoint,
}: TransactionPointItemProps) => {
  console.log("transactionPoint", transactionPoint);
  return (
    <ShadowCard
      style={{ padding: 12, flexDirection: "row", alignItems: "center" }}
    >
      <View style={{ flex: 1 }}>
        <Typography preset="smallParagraph" colorPreset="secondaryText">
          {formatDateTime(transactionPoint.createdAt)}
        </Typography>
        <Typography
          preset="mediumParagraph"
          colorPreset="regularText"
          style={{ marginTop: 3 }}
        >
          {transactionPoint.body}
        </Typography>
      </View>

      <EButton
        text={transactionPoint.title}
        containerStyle={{ paddingVertical: 12, paddingHorizontal: 12 }}
        border
        color={[colors.success]}
      />
    </ShadowCard>
  );
};
