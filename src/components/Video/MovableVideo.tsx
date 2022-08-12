import { FullscreenOpenSvg } from "@/assets/svg/FullscreenOpenSvg";
import { usePrevious } from "@/hooks/usePrevious";
import { liveStreamStore } from "@/store/livestreamStore";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, appStyle } from "@/styles/theme";
import { NavigationScreens } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { Video } from "expo-av";
import Constants from "expo-constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  PanResponder,
  Animated,
  PanResponderInstance,
  StyleSheet,
  StatusBar,
  Easing,
  Modal,
  TouchableOpacity,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";

const heightVideo = 200;
const widthVideo = (heightVideo * 2) / 3;
const bottomPadding = isIphoneX() ? 100 : 60;

export const MovableVideo = ({ onDismiss, playbackId }) => {
  const prevPlayback = usePrevious(playbackId);
  const _panAnimation = useRef<Animated.ValueXY>(
    new Animated.ValueXY({
      x: SCREEN_WIDTH - widthVideo - 8,
      y: SCREEN_HEIGHT - heightVideo - bottomPadding - 10,
    })
  ).current;
  let xOffset = useRef(SCREEN_WIDTH - widthVideo - 8).current;
  let yOffset = useRef(SCREEN_HEIGHT - heightVideo - bottomPadding - 10)
    .current;
  let positionMillis = useRef(liveStreamStore.positionMillis).current;

  const _panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          //return true if user is swiping, return false if it's a single click
          return !(gestureState.dx === 0 && gestureState.dy === 0);
        },
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dy: _panAnimation.y,
              dx: _panAnimation.x,
            },
          ],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gestureState) => {
          _handlePan(gestureState);
        },
        onPanResponderGrant: (e, gestureState) => {
          _panAnimation.setOffset({ x: xOffset, y: yOffset });
          _panAnimation.setValue({ x: 0, y: 0 });
        },
      }),
    []
  );

  useEffect(() => {
    const prevPlaybackId = prevPlayback || "";
    const newPlaybackId = playbackId || "";
    if (!newPlaybackId) {
      return onDismiss();
    }
  }, [playbackId]);

  useEffect(() => {
    const id = _panAnimation.addListener((value) => {
      xOffset = value.x;
      yOffset = value.y;
    });
    return () => {
      _panAnimation.removeListener(id);
    };
  }, []);

  const onPressVideo = () => {
    liveStreamStore.playbackId = null;
    liveStreamStore.positionMillis = positionMillis;
    Navigation.navigate(NavigationScreens.DetailLiveStream, {
      screen: NavigationScreens.DetailLiveStream,
      params: {
        onBack: (playbackId) => (liveStreamStore.playbackId = playbackId),
      },
    });
  };

  const _handlePan = useCallback((gestureState) => {
    _panAnimation.flattenOffset();

    let newXOffset = 8;
    let newYOffset = 8 + Constants.statusBarHeight;

    // dismiss animation
    if (xOffset < -(widthVideo * 0.2)) {
      Animated.timing(_panAnimation, {
        toValue: { x: -widthVideo, y: yOffset },
        duration: 300,
        useNativeDriver: false,
      }).start(onDismiss);
      return;
    }
    if (xOffset > SCREEN_WIDTH - widthVideo * 0.8) {
      Animated.timing(_panAnimation, {
        toValue: { x: SCREEN_WIDTH, y: yOffset },
        duration: 300,
        useNativeDriver: false,
      }).start(onDismiss);
      return;
    }

    // pan animation
    if (xOffset > (SCREEN_WIDTH - widthVideo) / 2) {
      newXOffset = SCREEN_WIDTH - widthVideo - 8;
    }
    if (yOffset > (SCREEN_HEIGHT - heightVideo) / 2) {
      newYOffset = SCREEN_HEIGHT - heightVideo - bottomPadding - 10;
    }
    Animated.timing(_panAnimation, {
      toValue: { x: newXOffset, y: newYOffset },
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, []);

  const onProgress = (data) => {
    if (data.isPlaying) {
      positionMillis = Math.floor(data.positionMillis);
    }
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }} pointerEvents="box-none">
      <Animated.View
        style={[
          {
            height: heightVideo,
            width: widthVideo,
            backgroundColor: "#000",
            borderRadius: 8,
            overflow: "hidden",
          },
          _panAnimation.getLayout(),
        ]}
        {..._panResponder.panHandlers}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={appStyle.image}
          onPress={onPressVideo}
        >
          <Video
            shouldPlay
            source={{
              uri: `https://stream.mux.com/${playbackId}.m3u8`,
            }}
            rate={1.0}
            volume={1.0}
            resizeMode="cover"
            style={appStyle.image}
            useNativeControls={false}
            onPlaybackStatusUpdate={onProgress}
            positionMillis={positionMillis}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
