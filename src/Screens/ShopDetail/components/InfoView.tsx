import Typography from "@/components/Text/Typography";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, appStyle, colors } from "@/styles/theme";
import { Food, Menu } from "@/types/food-order";
import { Navigation } from "@/utils/Navigation";
import { useIsFocused } from "@react-navigation/core";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Animated,
  RefreshControl,
  ScrollViewProps,
  Platform,
  ScrollView,
} from "react-native";
import { FoodItem } from "./FoodItem";
import { MenuList } from "./MenuList";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface Props extends ScrollViewProps {
  listRef?: any;
  headerHeight?: number;
  description: string;
}

export const InfoView = ({ ...props }: Props) => {
  return (
    <AnimatedFlatList
      scrollToOverflowEnabled={true}
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <Typography preset="mediumParagraph" colorPreset="regularText">
          {props.description}
        </Typography>
      }
      keyExtractor={(item: Food, index) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      ref={props.listRef}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 16 }}
      contentInset={{ top: props.headerHeight }}
      contentOffset={{
        x: 0,
        y: Platform.select({ ios: -props.headerHeight, android: 0 }),
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: colors.background,
            marginVertical: 16,
          }}
        />
      )}
      // onEndReachedThreshold={0.3}
      // onEndReached={fetchLiveStreams}
      ListFooterComponent={<View style={{ height: 50 }} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      {...props}
    />
  );
};
