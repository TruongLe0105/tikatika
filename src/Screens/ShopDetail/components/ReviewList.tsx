/**
 * Hiển thị danh sách review
 * @param {number} foodShopId //
 */

import { storeRateApi } from "@/api/storeRate.api";
import { EditSvg } from "@/assets/svg/EditSvg";
import { Alert } from "@/components/Alert/Alert";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import appStore from "@/store/appStore";
import { border } from "@/styles/border";
import { colors } from "@/styles/theme";
import { Review } from "@/types/review";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Platform,
  Pressable,
  ScrollViewProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ReviewItem } from "./ReviewItem";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface ReviewListProps extends ScrollViewProps {
  foodShopId: number;
  listRef?: any;
  headerHeight?: number;
}

export const ReviewList = ({
  foodShopId,
  listRef,
  headerHeight,
  ...props
}: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchStoreRate();
  }, []);

  const handlePress = () => {
    if (!appStore.token) {
      Navigation.navigate("AuthStack");
    } else {
      Navigation.navigate(ScreenName.Review, {
        onDone: () => {
          fetchStoreRate();
          Navigation.goBack();
        },
      });
    }
  };

  const handleReport = (review) => {
    const current = moment();
    Navigation.navigate(ScreenName.ReportReview, {
      review,
      onDone: () => {
        Alert.alert({
          title: "Gửi báo cáo thành công",
          message: `Vào ngày ${current.format(
            "DD/MM/YYYY"
          )} thời gian ${current.format(
            "HH:mm"
          )} bạn đã tố cáo thành công tài khoản ${
            review?.customer?.name
          }. Hệ thống sẽ xác nhận lại.`,
        });
        requestAnimationFrame(() => {
          Navigation.goBack();
        });
      },
    });
  };

  const fetchStoreRate = async () => {
    const res = await storeRateApi.findAll({
      page: 1,
      limit: 10,
      storeId: foodShopId,
    });
    setReviews(res.data.storeRates);
  };

  return (
    <AnimatedFlatList
      scrollToOverflowEnabled={true}
      data={reviews}
      renderItem={({ item }: any) => (
        <ReviewItem onReport={handleReport} review={item} />
      )}
      // ListHeaderComponent={<ReviewInput onPress={handlePress} />}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      ref={listRef}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{ marginVertical: 16 }}
      contentInset={{ top: headerHeight }}
      contentOffset={{
        x: 0,
        y: Platform.select({ ios: -headerHeight, android: 0 }),
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: colors.background,
            marginVertical: 16,
          }}
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      {...props}
    />
  );
};

type ReviewInputProps = {
  onPress: () => void;
};

const ReviewInput = ({ onPress }: ReviewInputProps) => {
  return (
    <ShadowCard style={{ ...border(1, colors.background), marginBottom: 16 }}>
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <Typography
          preset="mediumParagraph"
          colorPreset="secondaryText"
          style={{ flex: 1 }}
        >
          Bạn thấy món ăn ở đây thế nào?
        </Typography>
        <EditSvg />
      </Pressable>
    </ShadowCard>
  );
};
