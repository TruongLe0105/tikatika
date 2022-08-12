/**
 * Màn hình hiển thị ds video món ăn //giống màn live ở 181
 */

import { bannerVideoApi } from "@/api/bannerVideo.api";
import { storeVideoApi } from "@/api/storeVideo.api";
import { NoVideoSvg } from "@/assets/svg/NoVideoSvg";
import { EScreen } from "@/components/Screen/EScreen";
import { NoResultView } from "@/components/View/NoResultView";
import { useNetwork } from "@/hooks/useNetwork";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, colors } from "@/styles/theme";
import { Banner } from "@/types/banner";
import { Video } from "@/types/video";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BannerCarousel } from "./components/BannerCarousel";
import { VideoItem } from "./components/VideoItem";

const VideoScreen = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const listQuery = useRef({
    page: 1,
    limit: 10,
  });
  const total = useRef(0);
  const isFetching = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const isFocused = useIsFocused();
  const [isNetworkConnected] = useNetwork();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("dark-content");
    }
  }, [isFocused]);

  useEffect(() => {
    if (isNetworkConnected) {
      fetchBanner();
      fetchVideo(false);
    }
  }, [isNetworkConnected]);

  const handlePress = (video: Video) => {
    Navigation.navigate(ScreenName.VideoDetail, {
      video,
    });
  };

  const handlePressBanner = useCallback((news) => {
    Navigation.navigate(ScreenName.NewsDetail, { news });
  }, []);

  const fetchBanner = async () => {
    const res = await bannerVideoApi.findAll({ page: 1, limit: 10 });
    setBanners(res.data.bannerVideos);
  };

  const fetchVideo = async (isRefreshing = true) => {
    try {
      setIsRefreshing(isRefreshing);
      isFetching.current = true;
      listQuery.current.page = 1;
      const res = await storeVideoApi.findAll(listQuery.current);
      total.current = res.data.total;
      setVideos(res.data.storeVideos);
    } finally {
      isFetching.current = false;
      setIsRefreshing(false);
      setIsFetched(true);
    }
  };

  const loadMore = async () => {
    try {
      if (!isFetching.current && setVideos.length != total.current) {
        listQuery.current.page++;
        isFetching.current = true;
        const res = await storeVideoApi.findAll(listQuery.current);
        setVideos([...videos, ...res.data.storeVideos]);
        total.current = res.data.total;
      }
    } finally {
      isFetching.current = false;
    }
  };

  return (
    <EScreen hideHeader edges={["top"]} style={{ flex: 1 }}>
      {/* ds banner */}
      {!!banners.length && (
        <BannerCarousel banners={banners} onPress={handlePressBanner} />
      )}

      {/* ds video */}
      {isFetched ? (
        <FlatList
          style={{ flex: 1, marginTop: 8 }}
          data={videos}
          renderItem={({ item }) => (
            <View style={{ width: (SCREEN_WIDTH - 16) / 2 }}>
              <VideoItem onPress={handlePress} video={item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={fetchVideo} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 8 }}
          ListEmptyComponent={
            <View style={{ flex: 1, ...alignJustify() }}>
              <NoResultView
                icon={<NoVideoSvg size={48} />}
                title={"Chưa có cửa hàng nào đăng video"}
                content={"Vui lòng quay lại sau. Xin cảm ơn!"}
              />
            </View>
          }
        />
      ) : (
        <View style={{ ...StyleSheet.absoluteFillObject, ...alignJustify() }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
    </EScreen>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
