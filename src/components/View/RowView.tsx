import React from "react";
import { View, Text, ViewProps } from "react-native";

type FlexAlignType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";
type JustifyContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

interface RowViewProps extends ViewProps {
  children?: React.ReactNode;
  justifyContent?: JustifyContentType;
  alignItems?: FlexAlignType;
}

export const RowView = ({
  children,
  justifyContent,
  alignItems = "center",
  ...props
}: RowViewProps) => {
  return (
    <View
      style={[
        { flexDirection: "row", alignItems, justifyContent },
        props.style,
      ]}
    >
      {children}
    </View>
  );
};
