/**
 * Hiển thị tổng quan số điểm
 * @param {number} totalPoint
 * @param {number} pointIn điểm vào
 * @param {number} pointOut điểm ra
 */

import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { isEqual } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SummaryPointProps = {
  totalPoint: number;
  pointIn: number;
  pointOut: number;
};

export const SummaryPoint = React.memo(
  (props: SummaryPointProps) => {
    return (
      <RowView style={{}} justifyContent="space-between">
        <View style={{ alignItems: "center", flex: 1 }}>
          <Typography
            preset="smallLabel"
            align="center"
            colorPreset="primaryText"
          >
            Điểm vào
          </Typography>
          <Typography
            preset="mediumTitle"
            align="center"
            colorPreset="success"
            style={{ marginTop: 4 }}
          >
            +{props.pointIn}
          </Typography>
        </View>
        <View style={{ alignItems: "center", flex: 1, marginHorizontal: 8 }}>
          <Typography
            preset="smallLabel"
            align="center"
            colorPreset="primaryText"
          >
            Điểm ra
          </Typography>
          <Typography
            preset="mediumTitle"
            align="center"
            colorPreset="error"
            style={{ marginTop: 4 }}
          >
            -{props.pointOut}
          </Typography>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Typography
            preset="smallLabel"
            align="center"
            colorPreset="primaryText"
          >
            Tổng hiện tại
          </Typography>
          <Typography
            preset="mediumTitle"
            align="center"
            colorPreset="primary"
            style={{ marginTop: 4 }}
          >
            {props.totalPoint}
          </Typography>
        </View>
      </RowView>
    );
  },
  (prev, next) => isEqual(prev, next)
);
