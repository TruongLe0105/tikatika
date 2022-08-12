/**
 * Header của màn hình kết quả search, gồm nút back và địa chỉ giao
 * @param {string} address
 * @param {Function} onPressAddress
 */

import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { ClearTextSvg } from "@/assets/svg/ClearTextSvg";
import { LocationSvg } from "@/assets/svg/LocationSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EInput } from "@/components/Input/EInput";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SearchResultHeaderProps = {
  address: string;
  onPressAddress: () => void;
  onBack: () => void;
};

const SearchResultHeader = (props: SearchResultHeaderProps) => {
  return (
    <RowView>
      <Pressable onPress={props.onBack} hitSlop={50}>
        <ArrowLeftSvg />
      </Pressable>

      <Pressable onPress={props.onPressAddress} style={{ flex: 1 }}>
        <RowView
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            width: "100%",
          }}
        >
          <LocationSvg />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Typography
              preset="superSmallParagraph"
              colorPreset="secondaryText"
            >
              Giao đến
            </Typography>
            <Typography preset="mediumLabel" color={"#000"} numberOfLines={2}>
              {props.address}
            </Typography>
          </View>
        </RowView>
      </Pressable>
    </RowView>
  );
};

export default SearchResultHeader;

const styles = StyleSheet.create({});
