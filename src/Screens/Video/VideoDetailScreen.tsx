/**
 * Mh chi tiết video giới thiệu món ăn
 *  @param {Video} video get từ route
 */

import { TimeSvg } from "@/assets/svg/TimeSvg";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { BASE_URL } from "@/config";
import { foodOrderStore } from "@/store/foodOrderStore";
import { alignJustify, appStyle, colors } from "@/styles/theme";
import { Video as VideoType } from "@/types/video";
import { ScreenName } from "@/utils/enum";
import { formatDateTime } from "@/utils/helper";
import { Navigation } from "@/utils/Navigation";
import { useIsFocused } from "@react-navigation/native";
import { AVPlaybackStatus, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AppState,
  AppStateStatus,
  Share,
  ActivityIndicator,
} from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import { VideoDetailHeader } from "./components/VideoDetailHeader";
import { storeVideoApi } from "@/api/storeVideo.api";

export const VideoDetailScreen = ({ route }) => {
  const [isMuted, setIsMuted] = useState(false);
  const video: VideoType = route.params?.video;
  const videoRef = useRef<Video>(null);
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState("");
  const [loading, setLoading] = useState(true);

  useKeepAwake();

  useEffect(() => {
    updateView();
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", handleChangeAppState);
    return () => {
      AppState.removeEventListener("change", handleChangeAppState);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isFocused) {
        videoRef.current?.playAsync();
      } else {
        videoRef.current?.pauseAsync();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (appState == "active") {
      if (videoRef.current) {
        videoRef.current?.pauseAsync();
        setTimeout(() => {
          videoRef.current?.playAsync();
        }, 1000);
      }
    }
  }, [appState]);

  const updateView = async () => {
    await storeVideoApi.viewIncrease(video.id, { value: "" });
  };

  const handleChangeAppState = (state: AppStateStatus) => {
    console.log("handleChangeAppState", state);

    setAppState(state);
  };

  const handlePressShop = () => {
    foodOrderStore.setSelectedShop(video.store);
    Navigation.navigate(ScreenName.ShopDetail);
  };

  const handleClose = () => {
    Navigation.goBack();
  };

  const handlePressMute = useCallback(() => {
    setIsMuted(!isMuted);
    videoRef.current.setIsMutedAsync(!isMuted);
  }, [isMuted]);

  const handleErrVideo = useCallback(() => {
    console.log("handleErrVideo");
  }, []);

  const handleChangePlayback = async (status: AVPlaybackStatus) => {
    console.log("handleChangePlayback", status);
  };

  const handleLoad = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setLoading(false);
      videoRef.current?.playAsync();
    }
  };

  const handleShare = async () => {
    let message = "Link video: ";
    if (!video?.url.includes("https://")) {
      message += BASE_URL + video?.url;
    } else {
      message += video?.url;
    }
    const result = await Share.share({
      message,
    });
  };

  const videoPath = useMemo(() => {
    if (video?.url?.includes("https://") || video?.url?.includes("http://")) {
      return video?.url;
    } else {
      return BASE_URL + video?.url;
    }
  }, [video]);

  return (
    <EScreen hideHeader style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        {!!video?.url && (
          <Video
            onError={handleErrVideo}
            source={{
              uri: videoPath,
            }}
            ref={videoRef}
            isLooping
            onPlaybackStatusUpdate={handleChangePlayback}
            style={appStyle.image}
            onLoad={handleLoad}
            resizeMode="cover"
            rate={1.0}
            volume={1.0}
          />
        )}
        {loading && (
          <View style={{ ...StyleSheet.absoluteFillObject, ...alignJustify() }}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        )}
      </View>

      {/* header */}
      <VideoDetailHeader
        video={video}
        foodShop={video?.store}
        isMuted={isMuted}
        onPressShop={handlePressShop}
        onClose={handleClose}
        onPressMute={handlePressMute}
        onShare={handleShare}
      />
      <View style={{ flex: 1 }} />
      {/* mô tả về video món ăn, dạng scroll, max-height cõ 200 */}
      <LinearGradient
        colors={["rgba(26, 26, 26, 0)", "rgba(26, 26, 26, 0.5)"]}
        start={[0, 0]}
        end={[0, 1]}
        style={{ height: 240, justifyContent: "flex-end", paddingBottom: 16 }}
      >
        <ScrollView
          style={{ maxHeight: 200 }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <RowView>
            <TimeSvg color={colors.secondaryText} size={16} />
            <Typography
              preset="smallParagraph"
              colorPreset="background"
              style={{ marginLeft: 8, flex: 1 }}
            >
              {formatDateTime(video?.createdAt)}
            </Typography>
          </RowView>

          <Typography
            preset="mediumParagraph"
            color="#fff"
            style={{ marginTop: 8 }}
          >
            {/* {video?.description} */}
            {video?.store?.description}
          </Typography>
        </ScrollView>
      </LinearGradient>
    </EScreen>
  );
};
