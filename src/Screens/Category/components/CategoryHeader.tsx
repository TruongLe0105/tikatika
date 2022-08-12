/**
 * Header của category chứa nút back, input, nút clear
 *
 *
 */

import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { ClearTextSvg } from "@/assets/svg/ClearTextSvg";
import { EInput } from "@/components/Input/EInput";
import { RowView } from "@/components/View/RowView";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CategoryHeaderProps = {
  onDoneSearch: (search: string) => void;
  onBack: () => void;
  inputRef: any;
};

export const CategoryHeader = (props: CategoryHeaderProps) => {
  const [search, setSearch] = useState("");

  const clearText = () => {
    setSearch("");
  };

  return (
    <RowView>
      <Pressable onPress={props.onBack} hitSlop={50}>
        <ArrowLeftSvg />
      </Pressable>

      <EInput
        onSubmitEditing={() => props.onDoneSearch(search)}
        containerStyle={{ flex: 1 }}
        inputStyle={{ borderWidth: 0 }}
        placeholder="Bạn muốn ăn gì?"
        value={search}
        returnKeyType="search"
        onChangeText={setSearch}
        componentRight={
          search != "" && (
            <Pressable onPress={clearText}>
              <ClearTextSvg />
            </Pressable>
          )
        }
        inputRef={props.inputRef}
      />
    </RowView>
  );
};
