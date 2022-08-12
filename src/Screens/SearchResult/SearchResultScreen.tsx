/**
 * Màn hình hiển thị kết quả tìm kiếm món ăn
 */

import { storeApi } from "@/api/store.api";
import { MenuSvg } from "@/assets/svg/MenuSvg";
import { NoStoreSvg } from "@/assets/svg/NoStoreSvg";
import { StoreSvg } from "@/assets/svg/StoreSvg";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { NoResultView } from "@/components/View/NoResultView";
import { RowView } from "@/components/View/RowView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { locationStore } from "@/store/locationStore";
import { userStore } from "@/store/userStore";
import { alignJustify, colors } from "@/styles/theme";
import { FoodShop } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecommendShopItem } from "./components/RecommendShopItem";
import SearchResultHeader from "./components/SearchResultHeader";
import SearchResultShopItem from "./components/SearchResultShopItem";

export const SearchResultScreen = observer(({ route }) => {
  const search = route.params?.search;
  const category = route.params?.category;
  const [recommendShops, setRecommendShops] = useState<FoodShop[]>([]);
  const [searchResults, setSearchResults] = useState<FoodShop[]>([]);
  const listQuery = useRef({
    page: 1,
    limit: 10,
    lat: userStore.location.latitude,
    long: userStore.location.longitude,
    maxDistance: 5,
  });
  const total = useRef(0);
  const isFetching = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const disablePressShop = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchSearchResult();
    }, [category, search])
  );

  useEffect(() => {
    fetchRecommendStore();
  }, []);

  const handleBack = () => {
    Navigation.goBack();
  };

  const handlePressAddress = () => {
    Navigation.navigate(ScreenName.ChangeDeliveryAddress, {
      location: userStore.location,
      onDone: async (address) => {
        await userStore.setLocation(address);
        fetchRecommendStore();
      },
    });
  };

  const handlePressFoodShop = async (foodShop: FoodShop) => {
    foodOrderStore.setSelectedShop(foodShop);
    await foodOrderStore.fetchDetailShop();
    if (!disablePressShop.current) {
      requestAnimationFrame(() => {
        Navigation.navigate(ScreenName.ShopDetail);
      });
      disablePressShop.current = true;
    }

    setTimeout(() => {
      disablePressShop.current = false;
    }, 200);
  };

  const handlePressFavorite = async (foodShop: FoodShop) => {
    await foodOrderStore.favoriteShop(foodShop);
  };

  const fetchSearchResult = async () => {
    const res = await storeApi.findAll({
      ...listQuery.current,
      page: 1,
      search,
      categoryId: category?.id,
      maxDistance: null,
    });
    setSearchResults(res.data.stores);
  };

  const loadMore = async (event) => {
    let position =
      event.nativeEvent.contentOffset.y +
      event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;

    if (Math.abs(position - contentHeight) <= 50) {
      try {
        if (!isFetching.current && recommendShops.length != total.current) {
          listQuery.current.page++;
          isFetching.current = true;
          const res = await storeApi.findAll({
            ...listQuery.current,
            search,
          });
          setRecommendShops([...recommendShops, ...res.data.stores]);
          total.current = res.data.total;
        }
      } finally {
        isFetching.current = false;
      }
    }
  };

  const fetchRecommendStore = async () => {
    try {
      setIsRefreshing(true);
      isFetching.current = true;
      listQuery.current.page = 1;
      const res = await storeApi.findAll(listQuery.current);
      total.current = res.data.total;
      setRecommendShops(res.data.stores);
    } finally {
      isFetching.current = false;
      setIsRefreshing(false);
    }
  };

  return (
    <EScreen
      showHeaderTool
      componentLeft={
        // Header của màn hình kết quả search, gồm nút back và địa chỉ giao
        <SearchResultHeader
          onBack={handleBack}
          onPressAddress={handlePressAddress}
          address={userStore.location.formattedAddress}
        />
      }
      edges={["bottom"]}
      showRight={false}
      style={{ flex: 1 }}
    >
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // bounces={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              fetchRecommendStore();
              fetchSearchResult();
            }}
          />
        }
        scrollEventThrottle={16}
        onScroll={loadMore}
      >
        <RowView style={{ padding: 16 }}>
          <MenuSvg />
          <Typography
            preset="mediumTitle"
            color={"#000"}
            style={{ marginLeft: 8 }}
          >
            {category?.name || search}
          </Typography>
        </RowView>
        {/* Hiển thị ds quán đề xuất */}
        <View>
          <Typography
            preset="mediumLabel"
            color={"#000"}
            style={{ marginTop: 8, marginLeft: 16 }}
          >
            Các quán được đề xuất
          </Typography>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <RecommendShopItem
                onPress={handlePressFoodShop}
                foodShop={item}
                onFavorite={handlePressFavorite}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              flexGrow: 1,
            }}
            ListEmptyComponent={
              <View style={{ ...alignJustify(), width: SCREEN_WIDTH - 32 }}>
                <NoResultView
                  icon={<StoreSvg color={colors.primary} size={48} />}
                  title={"Không tìm được quán ăn"}
                  content={
                    "Bạn hãy thử lại với các từ khóa khác như: Cơm trưa, bún đậu..."
                  }
                />
              </View>
            }
          />
        </View>

        {/* Hiển thị ds kết quả tìm */}
        <View style={{ flex: 1, marginVertical: 16 }}>
          <Typography
            preset="mediumLabel"
            color={"#000"}
            style={{ marginBottom: 8, marginLeft: 16 }}
          >
            Quán gần đây
          </Typography>
          <FlatList
            data={recommendShops}
            renderItem={({ item }) => (
              <SearchResultShopItem
                onPress={handlePressFoodShop}
                foodShop={item}
                onFavorite={handlePressFavorite}
              />
            )}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListEmptyComponent={
              <View style={{ flex: 1, ...alignJustify() }}>
                <NoResultView
                  icon={<NoStoreSvg size={48} />}
                  title={"Không tìm thấy quán phù hợp."}
                  content={"Bạn hãy thử các từ khóa khác xem sao"}
                />
              </View>
            }
          />
        </View>
      </ScrollView>
    </EScreen>
  );
});
