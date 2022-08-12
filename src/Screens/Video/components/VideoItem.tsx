/**
 * Hiển thi video Item ỏ mh ds video món ăn
 * @param {Video} video
 * @param {Function} onPress gọi khi nhấn vào item
 */

import { StoreSvg } from "@/assets/svg/StoreSvg";
import { ViewerSvg } from "@/assets/svg/ViewerSvg";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { Video } from "@/types/video";
import { formatNumber } from "@/utils/helper";
import { LinearGradient } from "expo-linear-gradient";
import { isEqual } from "lodash";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type VideoItemProps = {
  video: Video;
  onPress: (video: Video) => void;
};

export const VideoItem = ({ video, onPress }: VideoItemProps) => {
  return (
    <Pressable style={{ margin: 8 }} onPress={() => onPress(video)}>
      <View
        style={{
          borderRadius: 8,
          width: "100%",
          aspectRatio: 1 / 2,
          overflow: "hidden",
        }}
      >
        <EImage
          resizeMode="cover"
          source={{
            uri: video?.thumbnail,
          }}
          defaultSource={require("@/assets/images/com-ga.jpeg")}
        />

        <Header totalViews={video?.view} />

        <Footer description={video.description} />
      </View>

      <RowView style={{ marginTop: 8 }}>
        <StoreSvg />
        <Typography
          preset="smallLabel"
          color="#1A1A1A"
          style={{ marginLeft: 8, flex: 1 }}
        >
          {video.store?.name}
        </Typography>
      </RowView>
    </Pressable>
  );
};

const Header = React.memo(
  ({ totalViews }: any) => {
    return (
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0)"]}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
        }}
      >
        <RowView style={{ padding: 8, justifyContent: "flex-end" }}>
          <ViewerSvg size={16} />
          <Typography
            preset="smallLabel"
            color="#fff"
            style={{ marginLeft: 5 }}
          >
            {formatNumber(totalViews)}
          </Typography>
        </RowView>
      </LinearGradient>
    );
  },
  (prev, next) => isEqual(prev, next)
);

const Footer = React.memo(
  ({ description }: any) => {
    return (
      <LinearGradient
        colors={["rgba(26, 26, 26, 0)", "rgba(26, 26, 26, 0.5)"]}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          position: "absolute",
          bottom: 0,
          height: "50%",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ padding: 8, width: "100%" }}>
          <Typography
            preset="smallParagraph"
            color={"#fff"}
            align="center"
            numberOfLines={2}
          >
            {description}
          </Typography>
        </View>
      </LinearGradient>
    );
  },
  (prev, next) => isEqual(prev, next)
);
