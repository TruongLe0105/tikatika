/**
 * Hiển thị item kết quả tìm kiếm quán
 *  @param {FoodShop} foodShop
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
import { FoodShop } from "@/types/food-order";
import { convertDistanceToTime, formatNumber } from "@/utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { EventRegisterType } from "@/types/screen";
import { userStore } from "@/store/userStore";
import { calcDistance } from "@/utils/location";

type SearchResultShopItemProps = {
  foodShop: FoodShop;
  onPress: (foodShop: FoodShop) => void;
  onFavorite: (foodShop: FoodShop) => void;
};

const SearchResultShopItem = observer(
  ({ foodShop, onPress, onFavorite }: SearchResultShopItemProps) => {
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
        <ShadowCard style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              aspectRatio: 343 / 220,
              borderRadius: 8,
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

            <LinearGradient
              colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
              start={[0, 1]}
              end={[0, 0]}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 12,
              }}
            >
              <Typography
                preset="smallTitle"
                color={"#fff"}
                numberOfLines={1}
                style={{ marginTop: 44 }}
              >
                {shop.name}
              </Typography>
              <RowView style={{ marginTop: 6 }}>
                <Typography preset="smallLabel" colorPreset="background">
                  {formatNumber(distance, 1)} km
                </Typography>
                <DotView
                  color={colors.background}
                  style={{ marginHorizontal: 8 }}
                />
                <Typography preset="smallLabel" colorPreset="background">
                  {convertDistanceToTime(distance)} phút
                </Typography>
              </RowView>
              <RowView style={{ marginTop: 6 }}>
                <Typography
                  preset="smallParagraph"
                  colorPreset="background"
                  numberOfLines={2}
                  style={{ flex: 1 }}
                >
                  {shop.description}
                </Typography>

                {!!appStore.token && (
                  <Pressable hitSlop={30} onPress={() => onFavorite(shop)}>
                    <FavoriteSvg isFavorite={shop.isFavorite} />
                  </Pressable>
                )}
              </RowView>
            </LinearGradient>
          </View>
        </ShadowCard>
      </Pressable>
    );
  }
);

export default SearchResultShopItem;

const styles = StyleSheet.create({});
