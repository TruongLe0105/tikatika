import * as React from "react";
import { TouchableOpacity, Image, View } from "react-native";

import EStyleSheet from "react-native-extended-stylesheet";
import { appStyle } from "@/styles/theme";
import { useState, useEffect } from "react";
import { StarSvg } from "@/assets/svg/StarSvg";
import { RowView } from "../View/RowView";

interface StarRatingProps {
  numberStarActive: number;
  onPress?: (arg: any) => void;
  height?: number;
  disableButton?: boolean;
  starSize?: number;
}

export const StarRating = ({
  numberStarActive = 5,
  height = 21,
  onPress,
  disableButton,
  starSize = 30,
}: StarRatingProps) => {
  const arr = ["", "", "", "", ""];
  const [numberStart, setNumberStart] = useState(numberStarActive);

  useEffect(() => {
    setNumberStart(numberStarActive);
  }, [numberStarActive]);

  const pressStar = (index: number) => {
    setNumberStart(index + 1);
    if (onPress) {
      onPress(index + 1);
    }
  };

  return (
    <RowView
      style={{
        alignSelf: "center",
        height: height,
        width: "100%",
      }}
      justifyContent={"space-between"}
    >
      {arr.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ height: starSize }}
            key={index.toString()}
            onPress={() => pressStar(index)}
            disabled={disableButton}
          >
            <StarSvg size={starSize} selected={index < numberStart} />
          </TouchableOpacity>
        );
      })}
    </RowView>
  );
};
