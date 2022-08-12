/**
 * Bật tắt sử dụng điểm
 * @param {boolean} isEnable
 * @param {Function} onSwitch
 */

import { PointSvg } from "@/assets/svg/PointSvg";
import { CustomSwitch } from "@/components/Switch/CustomSwitch";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type UsingPointProps = {
  isEnable: boolean;
  onSwitch: (value: boolean) => void;
  canUse: boolean; //Có thể sử dùng nếu số điểm trong ví đủ
  usedPoint: number; //Số điểm
  myPoint: number; //Số điểm hiện có
};

export const UsingPoint = React.memo(
  (props: UsingPointProps) => {
    return (
      <View>
        <RowView
          style={{ opacity: props.canUse ? 1 : 0.3 }}
          justifyContent="space-between"
        >
          <RowView>
            <PointSvg />
            <Typography
              preset="mediumLabel"
              colorPreset="primary"
              style={{ marginLeft: 8 }}
            >
              Bạn có {formatNumber(props.usedPoint)} điểm
            </Typography>
          </RowView>

          <RowView>
            <Typography
              preset="mediumParagraph"
              colorPreset="secondaryText"
              style={{ marginRight: 8 }}
            >
              -{formatNumber(props.usedPoint)} đ
            </Typography>

            <CustomSwitch
              disabled={!props.canUse}
              value={props.isEnable}
              onValueChange={props.onSwitch}
            />
          </RowView>
        </RowView>
        {!props.canUse && (
          <Typography
            style={{ marginLeft: 4, marginTop: 4 }}
            size={12}
            color={colors.error}
          >
            Số điểm của bạn không đủ để sử dụng ({formatNumber(props.myPoint)}đ)
          </Typography>
        )}
      </View>
    );
  },
  (prev, next) => isEqual(prev, next)
);
