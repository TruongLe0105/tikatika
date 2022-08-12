import { BASE_URL } from "@/config";
import { appStyle } from "@/styles/theme";
import { Video } from "expo-av";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

type VideoProductProps = {
  videoPath?: string;
  isPause: boolean;
  poster?: string;
  isViewing: boolean;
  onPlaybackStatusUpdate: (status) => void;
  onSeekToStart: () => void;
};

export const VideoProduct = React.memo(
  ({
    poster,
    isViewing,
    isPause,
    videoPath,
    onPlaybackStatusUpdate,
    onSeekToStart,
  }: VideoProductProps) => {
    const videoRef = useRef<Video>(null);

    useEffect(() => {
      isPause && videoRef.current?.pauseAsync();
      !isPause && videoRef.current?.playAsync();
    }, [isPause]);

    useEffect(() => {
      (async () => {
        if (isViewing) {
          videoRef.current?.playAsync();
        } else {
          //   await videoRef.current.playFromPositionAsync(0);
          //   await videoRef.current.pauseAsync();
          onSeekToStart();
          videoRef.current?.setPositionAsync(0, {
            toleranceMillisAfter: 10,
            toleranceMillisBefore: 10,
          });
        }
      })();
    }, [isViewing]);

    return (
      <Video
        ref={videoRef}
        source={{
          uri: videoPath?.includes("https://")
            ? videoPath
            : BASE_URL + videoPath,
        }}
        // source={{
        //   uri: "https://file-annyeonghaseyo-app.s3.ap-northeast-2.amazonaws.com/videos/m3u8/a_main.m3u8",
        // }}
        rate={1.0}
        volume={1.0}
        // isMuted
        resizeMode="cover"
        style={appStyle.image}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        posterSource={poster && { uri: BASE_URL + poster }}
        usePoster
        posterStyle={{
          resizeMode: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    );
  }
);
