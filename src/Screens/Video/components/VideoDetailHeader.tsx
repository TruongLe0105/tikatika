/**
 * Hiển thị thông tin cửa hàng, quán, control âm than, nút close
 * @param {boolean} isMuted
 * @param {Function} onPressShop gọi khi nhấn vào quán, cửa hàng,
 * @param {Function} onClose gọi khi nhấn đóng
 * @param {Function} onPressMute gọi khi nhấn nút loa
 * @param {Function} onShare gọi khi nhấn share
 * @param {FoodShop} foodShop
 * @param {Video} video
 */

import { CloseSvg } from "@/assets/svg/CloseSvg";
import { ShareSvg } from "@/assets/svg/ShareSvg";
import { StarSvg } from "@/assets/svg/StarSvg";
import { StoreDefaultSvg } from "@/assets/svg/StoreDefaultSvg";
import { TimeSvg } from "@/assets/svg/TimeSvg";
import { ViewerSvg } from "@/assets/svg/ViewerSvg";
import { VolumeSvg } from "@/assets/svg/VolumeSvg";
import { EAvatar } from "@/components/Avatar/EAvatar";
import Typography from "@/components/Text/Typography";
import { DotView } from "@/components/View/DotView";
import { RowView } from "@/components/View/RowView";
import { userStore } from "@/store/userStore";
import { colors } from "@/styles/theme";
import { FoodShop } from "@/types/food-order";
import { Video } from "@/types/video";
import { convertDistanceToTime, formatNumber } from "@/utils/helper";
import { calcDistance } from "@/utils/location";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "native-base";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type VideoDetailHeaderProps = {
  isMuted: boolean;
  onPressShop: () => void;
  onClose: () => void;
  onPressMute: () => void;
  onShare: () => void;
  foodShop: FoodShop;
  video: Video;
};

export const VideoDetailHeader = (props: VideoDetailHeaderProps) => {
  const distance = useMemo(() => {
    return calcDistance(
      { latitude: props.foodShop?.lat, longitude: props.foodShop?.long },
      {
        latitude: userStore.location.latitude,
        longitude: userStore.location.longitude,
      }
    );
  }, [props.foodShop, userStore.location]);
  return (
    <LinearGradient
      colors={["rgba(26, 26, 26, 0.8)", "rgba(26, 26, 26, 0)"]}
      start={[0, 0]}
      end={[0, 1]}
      style={{
        width: "100%",
      }}
    >
      <Box safeAreaTop />
      <RowView style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
        <Pressable
          onPress={props.onPressShop}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <EAvatar
            size={48}
            defaultComponent={StoreDefaultSvg}
            image={props.foodShop?.thumbnail}
          />
          <View style={{ marginLeft: 8, flex: 1 }}>
            <Typography preset="mediumLabel" color="#fff">
              {props.foodShop?.name}
            </Typography>
            <RowView style={{ marginTop: 8 }}>
              <ViewerSvg size={16} />
              <Typography
                preset="smallLabel"
                color="#fff"
                style={{ marginLeft: 5 }}
              >
                {formatNumber(props.video.view)}
              </Typography>
            </RowView>
          </View>
        </Pressable>

        <Pressable onPress={props.onPressMute} hitSlop={10}>
          <VolumeSvg on={!props.isMuted} />
        </Pressable>
        <Pressable
          onPress={props.onShare}
          hitSlop={10}
          style={{ marginHorizontal: 16 }}
        >
          <ShareSvg color="#fff" />
        </Pressable>
        <Pressable onPress={props.onClose} hitSlop={10}>
          <CloseSvg />
        </Pressable>
      </RowView>

      <RowView style={{ marginTop: 8, paddingHorizontal: 16 }}>
        <StarSvg size={16} />
        <Typography preset="mediumLabel" colorPreset="placeholder">
          {formatNumber(
            props.foodShop?.totalStar / props.foodShop?.totalRate,
            1
          )}{" "}
          ({props.foodShop?.totalRate})
        </Typography>
        <DotView
          color={colors.background}
          size={4}
          style={{ marginHorizontal: 12 }}
        />
        <Typography
          preset="mediumLabel"
          colorPreset="placeholder"
          style={{ flex: 1 }}
        >
          {formatNumber(distance)} km
        </Typography>

        <TimeSvg color={colors.placeholder} size={16} />
        <Typography
          preset="mediumLabel"
          colorPreset="placeholder"
          style={{ marginLeft: 8 }}
        >
          {convertDistanceToTime(distance)} phút
        </Typography>
      </RowView>
    </LinearGradient>
  );
};
