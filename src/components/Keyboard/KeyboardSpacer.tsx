import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Keyboard,
  LayoutAnimation,
  View,
  Dimensions,
  ViewPropTypes,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { SCREEN_HEIGHT } from "@/styles/dimensions";

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

interface KeyboardSpacerProps {
  topSpacing?: number;
  onToggle?: Function;
  style?: StyleProp<ViewStyle>;
}

export const KeyboardSpacer = ({
  topSpacing = 0,
  onToggle = () => null,
  style,
}: KeyboardSpacerProps) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);
  let _listeners = null;

  useEffect(() => {
    const updateListener =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const resetListener =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    _listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];
    return () => {
      _listeners.forEach((listener) => listener.remove());
    };
  }, []);

  const updateKeyboardSpace = (event) => {
    if (!event.endCoordinates) {
      return;
    }

    let animationConfig: any = defaultAnimation;
    if (Platform.OS === "ios") {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    // get updated on rotation
    const screenHeight = SCREEN_HEIGHT;
    // when external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however only the keyboard toolbar is showing if there should be one
    const keyboardSpace =
      screenHeight - event.endCoordinates.screenY + topSpacing;

    setKeyboardSpace(keyboardSpace);
    setIsKeyboardOpened(true);
    onToggle(true, keyboardSpace);
  };

  const resetKeyboardSpace = (event) => {
    let animationConfig: any = defaultAnimation;
    if (Platform.OS === "ios") {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    setKeyboardSpace(0);
    setIsKeyboardOpened(false);
    onToggle(false, 0);
  };

  return <View style={[styles.container, { height: keyboardSpace }, style]} />;
};
