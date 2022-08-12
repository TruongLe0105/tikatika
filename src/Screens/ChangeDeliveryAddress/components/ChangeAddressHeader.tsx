/**
 *  header chứa nút search, input, icon map để navigation chọn trên map
 *  @param {string} search
 *  @param {Function} onPressMapIcon
 */

import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { ClearTextSvg } from "@/assets/svg/ClearTextSvg";
import { MapSvg } from "@/assets/svg/MapSvg";
import { EInput } from "@/components/Input/EInput";
import { RowView } from "@/components/View/RowView";
import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type ChangeAddressHeaderProps = {
  onBack: () => void;
  onSearch: (search: string) => void;
  onPressMapIcon: () => void;
};

const ChangeAddressHeader = (props: ChangeAddressHeaderProps) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <RowView>
      <Pressable onPress={props.onBack} hitSlop={50}>
        <ArrowLeftSvg />
      </Pressable>

      <EInput
        inputRef={inputRef}
        containerStyle={{ flex: 1 }}
        inputStyle={{ borderWidth: 0 }}
        placeholder="Bạn muốn giao đến đâu?"
        onChangeText={props.onSearch}
        componentRight={
          <Pressable onPress={props.onPressMapIcon}>
            <MapSvg />
          </Pressable>
        }
      />
    </RowView>
  );
};

export default ChangeAddressHeader;

const styles = StyleSheet.create({});
