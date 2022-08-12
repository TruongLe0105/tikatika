import { CheckSvg } from "@/assets/svg/CheckSvg";
import { StarSvg } from "@/assets/svg/StarSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";

import { appStyle, colors } from "@/styles/theme";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { RateFilterData } from "../ReviewStoreScreen";

type RateFilterItemProps = {
  data: RateFilterData;
  isSelected: boolean;
  onPress: (data: RateFilterData) => void;
};

export const RateFilterItem = ({
  data,
  isSelected,
  onPress,
}: RateFilterItemProps) => {
  const renderStar = () => {
    let arr = [];
    for (let i = 0; i < data.value; i++) {
      arr.push(i);
    }
    return (
      <RowView justifyContent="center">
        {arr.map((e, i) => (
          <StarSvg
            key={i}
            size={10}
            starColor={colors.primary}
            strokeColor={colors.primary}
          />
        ))}
      </RowView>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress(data);
      }}
      style={[
        {
          paddingVertical: 2,
          paddingHorizontal: 4,
          minHeight: 35,
          minWidth: 80,
          margin: 2,
          justifyContent: "center",
          backgroundColor: "#f7f7f7",
        },
        isSelected && styles.active,
      ]}
    >
      {isSelected && (
        <View style={{ position: "absolute", top: 2, left: 2 }}>
          <CheckSvg color={colors.primary} size={12} />
        </View>
      )}
      <View>
        {data.value > -1 ? (
          renderStar()
        ) : (
          <Typography
            style={{ textAlign: "center", fontSize: 12 }}
            family={isSelected ? "bold" : "medium"}
          >
            {data.label}
          </Typography>
        )}

        <Typography style={styles.text}>({data.count})</Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: "#ccc",
  },
});
