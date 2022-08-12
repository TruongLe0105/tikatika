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
} from "react-native";
import { FoodItem } from "./FoodItem";
import { MenuList } from "./MenuList";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface Props extends ScrollViewProps {
  listRef?: any;
  headerHeight?: number;
  menuList: Menu[];
  onPressItem: (data) => void;
  isClosed?: boolean;
}

export const FoodList = ({ ...props }: Props) => {
  const [menuSelected, setMenuSelected] = useState<Menu>(
    props.menuList[0] || null
  );

  useEffect(() => {
    if (props.menuList.length != 0) {
      setMenuSelected(props.menuList[0]);
    } else {
      setMenuSelected(null);
    }
  }, [props.menuList]);

  const handlePressMenu = useCallback((menu) => {
    setMenuSelected(menu);
  }, []);

  return (
    <AnimatedFlatList
      scrollToOverflowEnabled={true}
      data={menuSelected?.products}
      renderItem={({ item }: any) => (
        <FoodItem
          food={item}
          onPressAdd={props.onPressItem}
          isClosed={props.isClosed}
        />
      )}
      ListHeaderComponent={
        <MenuList
          menu={props.menuList}
          onPress={handlePressMenu}
          selected={menuSelected}
        />
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
