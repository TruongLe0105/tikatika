/**
 * Hiện thị kết quả tìm địa chỉ
 * @param {IAddress} address
 * @param {Function} onSelect //Khi nhấn select
 */

import Typography from "@/components/Text/Typography";
import { IAddress } from "@/types/address";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ResultSearchAddressItemProps = {
  address: IAddress;
  onSelect: (address: IAddress) => void;
};

const ResultSearchAddressItem = ({
  address,
  onSelect,
}: ResultSearchAddressItemProps) => {
  return (
    <Pressable
      onPress={() => onSelect(address)}
      style={{ paddingVertical: 16 }}
    >
      <Typography preset="mediumParagraph" color={"#000"}>
        {address.formattedAddress}
      </Typography>
    </Pressable>
  );
};

export default ResultSearchAddressItem;

const styles = StyleSheet.create({});
