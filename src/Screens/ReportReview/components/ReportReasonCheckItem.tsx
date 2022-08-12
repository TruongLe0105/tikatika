/**
 * Checkbox chọn lý do report
 * @param {string} content
 * @param {number} value
 * @param {boolean} isChecked //đã chọn hay chưa
 * @param {Function} onCheck
 */

import { IconCheckSvg } from "@/assets/svg/IconCheckSvg";
import Typography from "@/components/Text/Typography";
import { Checkbox, Icon } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ReportReasonCheckProps = {
  content: string;
  isChecked: boolean;
  onCheck: (val: string) => void;
};

export const ReportReasonCheckItem = (props: ReportReasonCheckProps) => {
  return (
    <View>
      <Checkbox
        value={props.content}
        justifyContent={"flex-start"}
        isChecked={props.isChecked}
        width={"100%"}
        onTouchStart={() => props.onCheck(props.content)}
      >
        <Typography
          preset="mediumParagraph"
          color={"#000"}
          style={{ marginLeft: 8, flex: 1 }}
        >
          {props.content}
        </Typography>
      </Checkbox>
    </View>
  );
};
