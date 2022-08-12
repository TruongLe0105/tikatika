import { EBadge } from "@/components/Badge/EBadge";
import Typography from "@/components/Text/Typography";
import { HEADER_MARGIN_TOP } from "@/styles/dimensions";
import { colors } from "@/styles/theme";
import { Menu } from "@/types/food-order";
import { isEqual } from "lodash";
import React, { useMemo } from "react";
import { View, FlatList, Pressable, Platform } from "react-native";
import { FoodItem } from "./FoodItem";
import { MenuItem } from "./MenuItem";

interface Props {
  menu: Menu[];
  onPress: (menu: Menu) => void;
  selected: Menu;
}

export const MenuList = React.memo(
  ({ menu, onPress, selected }: Props) => {
    return (
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <MenuItem
            menu={item}
            onPress={onPress}
            selected={isEqual(item.id, selected?.id)}
          />
        )}
        keyExtractor={(item, index) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        horizontal
        style={{
          marginBottom: 16,
          marginTop: Platform.OS === "ios" ? -HEADER_MARGIN_TOP : 0,
        }}
      />
    );
  },
  (prev, next) => isEqual(prev, next)
);
