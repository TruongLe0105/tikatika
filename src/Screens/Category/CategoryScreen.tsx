/**
 * Màn hình category
 *
 */

import { bannerApi } from "@/api/banner.api";
import { categoryApi } from "@/api/category.api";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { Banner } from "@/types/banner";
import { FoodCategory } from "@/types/category";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryBanner } from "./components/CategoryBanner";
import { CategoryHeader } from "./components/CategoryHeader";
import { CategoryItem } from "./components/CategoryItem";

export const CategoryScreen = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    fetchBanner();
    fetchCategories();
    inputRef.current.focus();
  }, []);

  const handleBack = () => {
    Navigation.goBack();
  };

  const handleDoneSearch = (search) => {
    Navigation.navigate(ScreenName.SearchResult, { search });
  };

  const fetchBanner = async () => {
    const res = await bannerApi.findAll({ page: 1, limit: 10 });
    setBanners(res.data.banners);
  };

  const fetchCategories = async () => {
    const res = await categoryApi.findAll({ page: 0, limit: 0 });
    setCategories(res.data.categories);
  };

  const handlePress = (category) => {
    Navigation.navigate(ScreenName.SearchResult, { category });
  };

  const handlePressBanner = useCallback((news) => {
    Navigation.navigate(ScreenName.NewsDetail, { news, aspectRatio: 4 / 1 });
  }, []);

  const renderCategoryItem = useCallback(({ item }) => {
    return (
      <View style={{ width: (SCREEN_WIDTH - 16) / 2 }}>
        <CategoryItem foodCategory={item} onPress={handlePress} />
      </View>
    );
  }, []);

  return (
    <EScreen
      showHeaderTool
      componentLeft={
        // Header của category chứa nút back, input, nút clear
        <CategoryHeader
          inputRef={inputRef}
          onDoneSearch={handleDoneSearch}
          onBack={handleBack}
        />
      }
      edges={["bottom"]}
      showRight={false}
      style={{ flex: 1 }}
    >
      {/* Banner quảng cáo (Ratio: 4:1) */}
      <CategoryBanner banners={banners} onPress={handlePressBanner} />

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 8 }}
        numColumns={2}
        style={{ flexGrow: 1 }}
        ListHeaderComponent={
          <Typography
            preset="smallTitle"
            color={"#000"}
            align="center"
            style={{ marginBottom: 8 }}
          >
            Categories
          </Typography>
        }
      />
    </EScreen>
  );
};
