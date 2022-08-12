/**
 * Header của mh chi tiết quán, gồm nút back, title hiển thi bị screen bị scroll xuống, nút like
 * @param {string} title
 * @param {boolean}  isLiked
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ShopDetailHeaderProps = {
  title: string;
  isLiked: boolean;
};

export const ShopDetailHeader = (props: ShopDetailHeaderProps) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};
