/**
 * Chi tiết của quán (Card panel): tên, phone, address, close or open time
 * @param {FoodShop} foodShop
 * @param {boolean} isClosed
 */

import { CallSvg } from "@/assets/svg/CallSvg";
import { DistanceSvg } from "@/assets/svg/DistanceSvg";
import { FooterRibbonSvg } from "@/assets/svg/FooterRibbonSvg";
import { LocationSvg } from "@/assets/svg/LocationSvg";
import { ShareSvg } from "@/assets/svg/ShareSvg";
import { StarSvg } from "@/assets/svg/StarSvg";
import { EBadge } from "@/components/Badge/EBadge";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import { DotView } from "@/components/View/DotView";
import { RowView } from "@/components/View/RowView";
import { getEnvironment } from "@/enviroment";
import { userStore } from "@/store/userStore";
import { border } from "@/styles/border";
import { alignJustify, colors } from "@/styles/theme";
import { FoodShop } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { convertDistanceToTime, formatNumber } from "@/utils/helper";
import { calcDistance } from "@/utils/location";
import { Navigation } from "@/utils/Navigation";
import moment from "moment";
import React, { useMemo } from "react";
import {
  LayoutChangeEvent,
  Linking,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ShopDetailCardProps = {
  foodShop: FoodShop;
  isClosed?: boolean;
};

export const ShopDetailCard = ({ foodShop, isClosed }: ShopDetailCardProps) => {
  const handleCall = () => {
    Linking.openURL(`tel:${foodShop.phone}`);
  };

  const handleShare = async () => {
    // let content = "Giới thiệu cửa hàng: " + foodShop.name;
    // const message = content.replace(/\{code\}/g, foodShop.name);
    const message = `${getEnvironment().shareUrl}?storeId=${foodShop.id}`;
    const result = await Share.share({
      message,
    });
  };

  const handlePressCategory = (category) => {
    Navigation.navigate(ScreenName.SearchResult, { category });
  };

  const handleReviewStore = () => {
    Navigation.navigate(ScreenName.ReviewStore);
  };

  const distance = useMemo(() => {
    return calcDistance(
      { latitude: foodShop?.lat, longitude: foodShop?.long },
      {
        latitude: userStore.location.latitude,
        longitude: userStore.location.longitude,
      }
    );
  }, [foodShop, userStore.location]);

  return (
    <ShadowCard
      style={{
        marginHorizontal: 16,
        paddingBottom: 12,
        paddingHorizontal: 12,
        ...border(1, colors.background),
      }}
    >
      <RowView justifyContent="space-between" alignItems="flex-start">
        <View style={{ flex: 1 }}>
          {foodShop.categories?.length > 0 && (
            <RowView
              style={{ flexWrap: "wrap", margin: -4, marginTop: 12 }}
              alignItems="flex-start"
            >
              {foodShop.categories?.map((e) => (
                <TouchableOpacity
                  key={e.id}
                  style={{ alignSelf: "flex-start", margin: 4 }}
                  onPress={() => handlePressCategory(e)}
                >
                  <EBadge text={e.name} />
                </TouchableOpacity>
              ))}
            </RowView>
          )}

          <Typography
            preset="mediumTitle"
            color="#000"
            style={{ marginTop: 4 }}
          >
            {foodShop.name}
          </Typography>
        </View>

        <TouchableOpacity onPress={handleReviewStore}>
          <View
            style={{
              backgroundColor: colors.primary,
              marginTop: 0,
              paddingVertical: 8,
              paddingHorizontal: 4,
              alignItems: "center",
            }}
          >
            <StarSvg size={12} strokeColor={colors.yellow} />
            <Typography
              preset="smallLabel"
              color="#fff"
              style={{ marginTop: 2 }}
            >
              {formatNumber(foodShop.totalStar / foodShop.totalRate, 1)}
            </Typography>
          </View>
          <FooterRibbonSvg size={30} />
        </TouchableOpacity>
      </RowView>

      <RowView style={{ marginTop: 16 }}>
        <LocationSvg size={16} />
        <Typography
          preset="smallParagraph"
          colorPreset="regularText"
          style={{ flex: 1, marginLeft: 4 }}
        >
          {foodShop.address}
        </Typography>
      </RowView>

      <RowView style={{ marginTop: 12 }}>
        <DistanceSvg size={16} />
        <Typography
          preset="smallParagraph"
          colorPreset="regularText"
          style={{ flex: 1, marginLeft: 4 }}
        >
          {formatNumber(distance, 1)}km ~ {convertDistanceToTime(distance)} phút
        </Typography>
      </RowView>

      <RowView justifyContent="space-between" style={{ marginTop: 16 }}>
        <RowView>
          <EBadge
            fill
            badgeColor={isClosed ? colors.background : colors.success}
          >
            <DotView color={isClosed ? colors.regularText : "#fff"} />
            <Typography
              preset="superSmallLabel"
              color={isClosed ? colors.regularText : "#fff"}
              style={{ marginLeft: 4 }}
            >
              {isClosed ? "Tạm đóng cửa" : " Đang mở cửa"}
            </Typography>
          </EBadge>

          <Typography
            preset="smallParagraph"
            colorPreset="regularText"
            style={{ marginLeft: 12 }}
          >
            {foodShop.openTime} - {foodShop.closeTime}
          </Typography>
        </RowView>

        <RowView>
          {!!foodShop.phone && (
            <Pressable
              onPress={handleCall}
              style={{
                height: 32,
                aspectRatio: 1,
                borderRadius: 16,
                ...alignJustify(),
                ...border(1, colors.primary),
                marginRight: 8,
              }}
            >
              <CallSvg size={32} />
            </Pressable>
          )}

          <Pressable
            onPress={handleShare}
            style={{
              height: 32,
              aspectRatio: 1,
              borderRadius: 16,
              ...alignJustify(),
              ...border(1, colors.primary),
            }}
          >
            <ShareSvg size={16} />
          </Pressable>
        </RowView>
      </RowView>
    </ShadowCard>
  );
};

const styles = StyleSheet.create({});
