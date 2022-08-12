/**
 * Hiển thị địa chỉ giao ở mh thanh toán
 * @param {string} address
 * @param {Function} onPress
 */

import { ArrowRightSvg } from "@/assets/svg/ArrowRightSvg";
import { LocationSvg } from "@/assets/svg/LocationSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PaymentDeliveryAddressProps = {
  address: string;
  onPress: () => void;
};

export const PaymentDeliveryAddress = (props: PaymentDeliveryAddressProps) => {
  return (
    <Pressable onPress={props.onPress}>
      <ShadowCard
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 12,
          width: "100%",
        }}
      >
        <LocationSvg />
        <View style={{ marginHorizontal: 8, flex: 1 }}>
          <Typography preset="superSmallParagraph" colorPreset="secondaryText">
            Giao đến
          </Typography>
          <Typography preset="mediumLabel" color={"#000"} numberOfLines={2}>
            {props.address}
          </Typography>
        </View>
        <ArrowRightSvg />
      </ShadowCard>
    </Pressable>
  );
};
