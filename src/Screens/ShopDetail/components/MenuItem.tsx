import { EBadge } from "@/components/Badge/EBadge";
import Typography from "@/components/Text/Typography";
import { colors } from "@/styles/theme";
import { Menu } from "@/types/food-order";
import { isEqual } from "lodash";
import React from "react";
import { View, Text, Pressable } from "react-native";

interface Prosp {
  menu: Menu;
  onPress: (menu) => void;
  selected?: boolean;
}

export const MenuItem = React.memo(
  ({ menu, onPress, selected }: Prosp) => {
    return (
      <Pressable onPress={() => onPress(menu)}>
        <EBadge
          fill={selected}
          size={36}
          style={{
            paddingHorizontal: 16,
            backgroundColor: selected ? colors.primary : colors.placeholder,
            borderColor: colors.background,
            borderWidth: selected ? 0 : 1,
          }}
        >
          <Typography
            preset="mediumLabel"
            family={selected ? "semibold" : "regular"}
            color={selected ? "#fff" : colors.regularText}
          >
            {menu.name}
          </Typography>
        </EBadge>
      </Pressable>
    );
  },
  (prev, next) => isEqual(prev, next)
);
