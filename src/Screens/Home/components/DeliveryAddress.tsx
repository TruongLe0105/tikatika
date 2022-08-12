/**
 * Hiển thị địa chỉ giao và từ khoá tìm kiếm (Làm  giao diện giống now)
 * @param {string} address //địa chỉ giao
 */

import { LocationSvg } from "@/assets/svg/LocationSvg";
import { SearchSvg } from "@/assets/svg/SearchSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EInput } from "@/components/Input/EInput";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { observer } from "mobx-react";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type DeliveryAddressProps = {
  onPressAddress: () => void;
  onPressSearch: () => void;
  address: string;
};

export const DeliveryAddress = observer((props: DeliveryAddressProps) => {
  return (
    <ShadowCard style={{ marginHorizontal: 8, marginTop: 8 }}>
      <Pressable onPress={props.onPressAddress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            paddingVertical: 8,
            paddingHorizontal: 12,
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
            <Typography
              size={12}
              preset="mediumLabel"
              color={"#000"}
              numberOfLines={1}
            >
              {props.address}
            </Typography>
          </View>
        </View>
      </Pressable>
      <View
        style={{ height: 1, backgroundColor: "#D7D9D9", width: "100%" }}
      ></View>

      <Pressable style={{ padding: 8 }} onPress={props.onPressSearch}>
        <RowView
          style={{
            width: "100%",
            alignItems: "center",
            height: 40,
            paddingLeft: 8,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
          }}
        >
          <SearchSvg />
          <Typography size={13} style={{ marginLeft: 4 }}>
            Hôm nay bạn muốn ăn gì?
          </Typography>
        </RowView>
        {/* <EInput
          value="Hôm nay bạn muốn ăn gì?"
          containerStyle={{ marginTop: 8 }}
          inputStyle={{
            paddingVertical: Platform.OS === "ios" ? 8 : 0,
            backgroundColor: "#fff",
          }}
          pointerEvents={"none"}
          editable={Platform.OS === "ios"}
          componentRight={<SearchSvg />}
        /> */}
      </Pressable>
    </ShadowCard>
  );
});

const styles = StyleSheet.create({});
