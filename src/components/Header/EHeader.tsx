import { BackSvg } from "@/assets/svg/BackSvg";
import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, boxShadow, colors } from "@/styles/theme";
import { Navigation } from "@/utils/Navigation";
import { HStack, Button, StatusBar, Box } from "native-base";
import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  Pressable,
  LayoutChangeEvent,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { SafeAreaView } from "react-native-safe-area-context";
import { EButton } from "../Button/EButton";
import Typography from "../Text/Typography";
import { RowView } from "../View/RowView";
import { Shadow } from "../View/Shadow";

export interface HeaderProps {
  headerTitle?: string;
  componentLeft?: React.ReactNode;
  componentRight?: React.ReactNode;
  componentTitle?: React.ReactNode;
  showHeaderTool?: boolean;
  showLeft?: boolean;
  showRight?: boolean;
  headerStyle?: ViewStyle;
  hideShadow?: boolean;
  headerColor?: string;
  fixedHeader?: boolean;
  onPressBack?: () => void;
  leftContainerStyle?: ViewStyle;
}

export const EHeader = ({
  showLeft = true,
  showRight = true,
  ...props
}: HeaderProps) => {
  const [disableButton, setDisableButton] = useState(false);

  const onBack = useCallback(() => {
    if (!disableButton) {
      if (typeof props.onPressBack == "function") {
        props.onPressBack();
      } else {
        Navigation.pop();
      }
      setDisableButton(true);
    }
  }, [disableButton]);

  return (
    <>
      <StatusBar
        backgroundColor={props.headerColor}
        barStyle={"dark-content"}
      />
      <Box safeAreaTop backgroundColor={props.headerColor} />
      <View
        style={[
          {
            // zIndex: 9999,
            backgroundColor: props.headerColor,
            overflow: "hidden",
          },
          props.fixedHeader && {
            position: "absolute",
            top: 0,
            width: SCREEN_WIDTH,
          },
          !props.hideShadow && boxShadow("rgba(0, 0, 0, 0.15)", 0, 2, 4),
        ]}
      >
        <HStack
          style={[
            {
              backgroundColor: props.headerColor,
              borderBottomWidth: 0,
              marginHorizontal: 0,
              borderTopWidth: 0,
              paddingTop: 0,
              height: 56,
              ...props.headerStyle,
            },
          ]}
        >
          <RowView
            style={{
              flex: 1,
              paddingHorizontal: 10,
              backgroundColor: "transparent",
            }}
          >
            {showLeft && props.showHeaderTool && (
              <HStack style={{ flex: 1, ...props.leftContainerStyle }}>
                {props.componentLeft || (
                  <Pressable
                    onPress={onBack}
                    disabled={disableButton}
                    hitSlop={50}
                  >
                    <ArrowLeftSvg />
                  </Pressable>
                )}
              </HStack>
            )}

            {(props.componentTitle || props.headerTitle) && (
              <HStack style={{ flex: 5, height: "100%", ...alignJustify() }}>
                {props.componentTitle || (
                  <Typography
                    preset="smallTitle"
                    align="center"
                    colorPreset={"primary"}
                    style={{ width: "100%" }}
                    numberOfLines={2}
                  >
                    {props.headerTitle}
                  </Typography>
                )}
              </HStack>
            )}

            {showRight && props.showHeaderTool && (
              <HStack style={{ flex: 1 }}>{props.componentRight}</HStack>
            )}
          </RowView>
        </HStack>
      </View>
    </>
  );
};
