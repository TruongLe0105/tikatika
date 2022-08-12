/**
 * Hiển thị 2 picker để chọn ngày
 * @param {string} fromDate
 * @param {string} toDate
 * @param {Function} onChange
 */

import { EDatePicker } from "@/components/Picker/EDatePicker";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { isEqual } from "lodash";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

type DateRangeProps = {
  fromDate: string;
  toDate: string;
  onChange: ({ from, to }) => void;
  format?: string;
};

const DateRange = ({ fromDate, toDate, onChange, format }: DateRangeProps) => {
  const handleChangeFrom = useCallback(
    (from) => {
      onChange({ from, to: toDate });
    },
    [toDate]
  );

  const handleChangeTo = useCallback(
    (to) => {
      onChange({ from: fromDate, to });
    },
    [fromDate]
  );

  return (
    <RowView justifyContent="space-between">
      <EDatePicker
        date={fromDate}
        placeholder="Từ ngày"
        onDateChange={handleChangeFrom}
        containerStyle={{ flex: 1 }}
        format={format}
      />
      <Typography
        preset="smallLabel"
        colorPreset={"regularText"}
        style={{ marginHorizontal: 8 }}
      >
        -
      </Typography>
      <EDatePicker
        date={toDate}
        placeholder="Đến ngày"
        onDateChange={handleChangeTo}
        containerStyle={{ flex: 1 }}
        format={format}
      />
    </RowView>
  );
};

export default React.memo(DateRange, (prev, next) => isEqual(prev, next));

const styles = StyleSheet.create({});
