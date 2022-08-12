import React, { useState } from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-switch";
import { colors } from "@/styles/theme";

export const CustomSwitch = ({ value, onValueChange, disabled = false }) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      circleSize={16}
      barHeight={24}
      circleBorderWidth={0}
      backgroundActive={colors.primary}
      backgroundInactive={colors.background}
      circleActiveColor={"#fff"}
      circleInActiveColor={"#fff"}
      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
      innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={1.5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={1.5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={3} // multipled by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={12} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    />
  );
};
