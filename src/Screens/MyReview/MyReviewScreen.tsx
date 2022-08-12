/**
 * ds nhữ quán đã đánh giá
 */

import { storeRateApi } from "@/api/storeRate.api";
import { RightMenuReviewSvg } from "@/assets/svg/RightMenuReviewSvg";
import { EScreen } from "@/components/Screen/EScreen";
import { NoResultView } from "@/components/View/NoResultView";
import { alignJustify } from "@/styles/theme";
import { Review } from "@/types/review";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyReviewItem } from "./components/MyReviewItem";

export const MyReviewScreen = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const listQuery = useRef({
    page: 1,
    limit: 10,
  });
  const total = useRef(0);
  const isFetching = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchStoreRate();
  }, []);

  const fetchStoreRate = async () => {
    try {
      setIsRefreshing(true);
      isFetching.current = true;
      listQuery.current.page = 1;
      const res = await storeRateApi.findAllOwn(listQuery.current);
      total.current = res.data.total;
      setMyReviews(res.data.storeRates);
    } finally {
      isFetching.current = false;
      setIsRefreshing(false);
    }
  };

  const loadMore = async () => {
    try {
      if (!isFetching.current && myReviews.length != total.current) {
        listQuery.current.page++;
        isFetching.current = true;
        const res = await storeRateApi.findAllOwn(listQuery.current);
        setMyReviews([...myReviews, ...res.data.storeRates]);
        total.current = res.data.total;
      }
    } finally {
      isFetching.current = false;
    }
  };

  return (
    <EScreen
      headerTitle="Đánh giá của tôi"
      showHeaderTool
      edges={["bottom"]}
      style={{ flex: 1 }}
    >
      <FlatList
        data={myReviews}
        renderItem={({ item }) => <MyReviewItem review={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchStoreRate}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
        ListEmptyComponent={
          <View style={{ flex: 1, ...alignJustify() }}>
            <NoResultView
              icon={<RightMenuReviewSvg size={48} />}
              title={"Bạn chưa đánh giá bất kỳ quán nào"}
              content={
                "Hãy trải nghiệm dịch vụ và viết bình luận ngay thôi nào"
              }
            />
          </View>
        }
      />
    </EScreen>
  );
};
