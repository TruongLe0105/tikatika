/**
 *  input để search mã coupon
 *  @param {string} search
 *  @param {Function} onSearch
 */
import { SearchSvg } from "@/assets/svg/SearchSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EInput } from "@/components/Input/EInput";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CouponInputSearchProps = {
  search: string;
  onSearch: (val: string) => void;
  onFinishSearch: (val: string) => void;
};

export const CouponInputSearch = (props: CouponInputSearchProps) => {
  return (
    <ShadowCard style={{ marginTop: 16 }}>
      <EInput
        value={props.search}
        placeholder="Nhập mã khuyến mãi"
        onChangeText={props.onSearch}
        inputStyle={{ borderWidth: 0 }}
        componentRight={
          <TouchableOpacity onPress={() => props.onFinishSearch(props.search)}>
            <SearchSvg />
          </TouchableOpacity>
        }
      />
    </ShadowCard>
  );
};
