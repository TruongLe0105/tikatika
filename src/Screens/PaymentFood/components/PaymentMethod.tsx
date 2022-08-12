/**
 * Chọn phương thức thanh toán
 *  @param {PaymentType} selectPaymentMethod
 *  @param {Function} onSelect
 */

import { CODSvg } from "@/assets/svg/CODSvg";
import { MomoSvg } from "@/assets/svg/MomoSvg";
import { PaymentMethodSvg } from "@/assets/svg/PaymentMethodSvg";
import { VNPaySvg } from "@/assets/svg/VNPaySvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { border } from "@/styles/border";
import { colors } from "@/styles/theme";
import { PaymentType } from "@/types/payment";
import { isEqual } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PaymentMethodProps = {
  selectPaymentMethod: PaymentType;
  onSelect: (val: PaymentType) => void;
  canUsePoint?: boolean;
};

export const PaymentMethod = React.memo(
  (props: PaymentMethodProps) => {
    const paymentCash = useRef(PaymentType.Cash);
    const paymentMethods = useMemo(() => {
      if (props.selectPaymentMethod != PaymentType.VnPay) {
        paymentCash.current = props.selectPaymentMethod;
      }
      return [
        {
          value: PaymentType.Cash,
          label: "Tiền mặt",
          icon: CODSvg, //
          visible: true,
        },
        {
          value: PaymentType.Point,
          label: "Điểm",
          icon: CODSvg, //
          visible: props.canUsePoint,
        },
        {
          value: PaymentType.VnPay,
          label: "VNPay",
          icon: VNPaySvg, //
          visible: true,
        },
        // {
        //   value: PaymentType.Momo,
        //   label: "Momo",
        //   icon: MomoSvg, //
        // },
      ];
    }, [props.selectPaymentMethod, props.canUsePoint]);

    return (
      <View>
        <RowView>
          <PaymentMethodSvg />
          <Typography
            preset="mediumLabel"
            colorPreset="primary"
            style={{ marginLeft: 8 }}
          >
            Phương thức thanh toán
          </Typography>
        </RowView>

        <RowView justifyContent="space-between" style={{ marginTop: 12 }}>
          {paymentMethods.map((e) => (
            <Pressable
              key={e.value}
              onPress={() => props.onSelect(e.value)}
              disabled={!e.visible}
              style={{
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 8,
                flex: 1,
                alignItems: "center",
                marginHorizontal: 6,
                ...border(
                  1,
                  props.selectPaymentMethod == e.value
                    ? colors.primary
                    : colors.background
                ),
              }}
            >
              <e.icon />
              <Typography
                preset="smallLabel"
                color="#000"
                style={{ marginTop: 6 }}
              >
                {e.label}
              </Typography>
              {!e.visible && (
                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "rgba(0,0,0,0.1)",
                    borderRadius: 8,
                  }}
                />
              )}
            </Pressable>
          ))}
        </RowView>
      </View>
    );
  },
  (prev, next) => isEqual(prev, next)
);
