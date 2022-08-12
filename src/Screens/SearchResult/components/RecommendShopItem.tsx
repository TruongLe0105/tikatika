/**
 * Hiển thị quán đề xuất
 * @param {FoodShop} foodShop
 * @param {Function} onPress
 */

import { FavoriteSvg } from "@/assets/svg/FavoriteSvg";
import { StarSvg } from "@/assets/svg/StarSvg";
import { EBadge } from "@/components/Badge/EBadge";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { DotView } from "@/components/View/DotView";
import { RowView } from "@/components/View/RowView";
import appStore from "@/store/appStore";
import { foodOrderStore } from "@/store/foodOrderStore";
import { colors } from "@/styles/theme";
import { FoodShop, StoreStatus } from "@/types/food-order";
import { convertDistanceToTime, formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import { observer } from "mobx-react";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { EventRegisterType } from "@/types/screen";
import { calcDistance } from "@/utils/location";
import { userStore } from "@/store/userStore";

type RecommendShopItemProps = {
  foodShop: FoodShop;
  onPress: (foodShop: FoodShop) => void;
  onFavorite: (foodShop: FoodShop) => void;
};

export const RecommendShopItem = observer(
  ({ foodShop, onPress, onFavorite }: RecommendShopItemProps) => {
    const [shop, setShop] = useState({ ...foodShop });

    useEffect(() => {
      setShop({ ...foodShop });
    }, [foodShop]);

    useEffect(() => {
      const listener: any = EventRegister.addEventListener(
        EventRegisterType.LikedShop,
        (data: FoodShop) => {
          if (data?.id == shop?.id) {
            setShop({ ...data });
          }
        }
      );
      return () => {
        EventRegister.removeEventListener(listener);
      };
    }, [shop]);

    const distance = useMemo(() => {
      return calcDistance(
        { latitude: shop?.lat, longitude: shop?.long },
        {
          latitude: userStore.location.latitude,
          longitude: userStore.location.longitude,
        }
      );
    }, [shop, userStore.location]);

    const isClosed = useMemo(() => {
      const now = moment();
      const close = moment(shop.closeTime, "HH:mm").diff(now, "minutes");
      const open = now.diff(moment(shop.openTime, "HH:mm"), "minutes");
      return open < 0 || close < 0;
    }, [shop]);

    return (
      <Pressable onPress={() => onPress(shop)}>
        <ShadowCard style={{ width: 274, height: 260 }}>
          <View
            style={{
              width: "100%",
              aspectRatio: 274 / 157,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              overflow: "hidden",
            }}
          >
            <EImage source={{ uri: shop.thumbnail }} />

            <RowView
              justifyContent="space-between"
              style={{ position: "absolute", width: "100%", padding: 12 }}
            >
              <EBadge fill>
                <StarSvg size={16} strokeColor={colors.yellow} />
                <Typography
                  preset="superSmallLabel"
                  color={"#fff"}
                  style={{ marginLeft: 4 }}
                >
                  {formatNumber(shop.totalStar / shop.totalRate, 1)} (
                  {shop.totalRate})
                </Typography>
              </EBadge>

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
            </RowView>
          </View>

          <View style={{ padding: 12 }}>
            <Typography preset="smallTitle" color={"#000"} numberOfLines={1}>
              {shop.name}
            </Typography>
            <RowView style={{ marginTop: 6 }}>
              <Typography preset="smallLabel" colorPreset="secondaryText">
                {formatNumber(distance, 1)} km
              </Typography>
              <DotView style={{ marginHorizontal: 8 }} />
              <Typography preset="smallLabel" colorPreset="secondaryText">
                {convertDistanceToTime(distance)} phút
              </Typography>
            </RowView>
            <RowView style={{ marginTop: 6 }}>
              <Typography
                preset="smallParagraph"
                colorPreset="secondaryText"
                numberOfLines={2}
                style={{ flex: 1 }}
              >
                {shop.description}
              </Typography>

              <Pressable hitSlop={30} onPress={() => onFavorite(shop)}>
                <FavoriteSvg
                  isFavorite={shop.isFavorite}
                  strokeColor={colors.secondaryText}
                />
              </Pressable>
            </RowView>
          </View>
        </ShadowCard>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({});
