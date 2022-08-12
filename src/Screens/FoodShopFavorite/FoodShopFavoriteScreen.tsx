/**
 *  Mh ds quán yêu thích
 */

import { storeApi } from "@/api/store.api";
import { RightMenuFavoriteSvg } from "@/assets/svg/RightMenuFavoriteSvg";
import { RightMenuReviewSvg } from "@/assets/svg/RightMenuReviewSvg";
import { EScreen } from "@/components/Screen/EScreen";
import { NoResultView } from "@/components/View/NoResultView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { userStore } from "@/store/userStore";
import { alignJustify } from "@/styles/theme";
import { FoodShop } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { calcDistance } from "@/utils/location";
import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchResultShopItem from "../SearchResult/components/SearchResultShopItem";

export const ShopFoodFavoriteScreen = observer(() => {
  const [foodShops, setFoodShops] = useState<FoodShop[]>([]);
  const listQuery = useRef({
    page: 1,
    limit: 10,
  });
  const total = useRef(0);
  const isFetching = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchFavoriteStore();
  }, []);

  const dataFoodShops = useMemo(() => {
    return foodShops.map((e) => {
      e.distance = calcDistance(
        {
          latitude: userStore.location.latitude,
          longitude: userStore.location.longitude,
        },
        {
          latitude: e.lat,
          longitude: e.long,
        }
      );
      return e;
    });
  }, [foodShops, userStore.location]);

  const handlePress = (shop: FoodShop) => {
    foodOrderStore.setSelectedShop(shop);
    Navigation.navigate(ScreenName.ShopDetail);
  };

  const fetchFavoriteStore = async () => {
    try {
      setIsRefreshing(true);
      isFetching.current = true;
      listQuery.current.page = 1;
      const res = await storeApi.findAllFavorite(listQuery.current);
      total.current = res.data.total;
      setFoodShops(res.data.stores);
    } finally {
      isFetching.current = false;
      setIsRefreshing(false);
    }
  };

  const loadMore = async () => {
    try {
      if (!isFetching.current && foodShops.length != total.current) {
        listQuery.current.page++;
        isFetching.current = true;
        const res = await storeApi.findAllFavorite(listQuery.current);
        setFoodShops([...foodShops, ...res.data.stores]);
        total.current = res.data.total;
      }
    } finally {
      isFetching.current = false;
    }
  };

  const handlePressFavorite = async (foodShop: FoodShop) => {
    await foodOrderStore.favoriteShop(foodShop);
  };

  return (
    <EScreen
      headerTitle="Quán yêu thích"
      showHeaderTool
      edges={["bottom"]}
      style={{ flex: 1, padding: 16 }}
    >
      {/* ds cửa hàng yêu thích */}
      <FlatList
        data={dataFoodShops}
        renderItem={({ item }) => (
          <SearchResultShopItem
            onPress={handlePress}
            foodShop={item}
            onFavorite={handlePressFavorite}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={fetchFavoriteStore}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={{ flex: 1, ...alignJustify() }}>
            <NoResultView
              icon={<RightMenuFavoriteSvg size={48} />}
              title={"Bạn chưa có quán yêu thích nào!"}
              content={
                "Hãy bấm vào biểu tượng trái tim ở mỗi quán để thêm quán vào danh sách yêu thích."
              }
            />
          </View>
        }
      />
    </EScreen>
  );
});
