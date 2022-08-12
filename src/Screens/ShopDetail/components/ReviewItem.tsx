/**
 * Hiển thị đánh giá của user
 * @param {Review} review
 * @param {Function} onReport //Khi nhấn báo cáo
 */

import { StarSvg } from "@/assets/svg/StarSvg";
import { TimeSvg } from "@/assets/svg/TimeSvg";
import { WarningSvg } from "@/assets/svg/WarningSvg";
import { EAvatar } from "@/components/Avatar/EAvatar";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import appStore from "@/store/appStore";
import { userStore } from "@/store/userStore";
import { colors } from "@/styles/theme";
import { Review } from "@/types/review";
import { formatDate, formatDateTime } from "@/utils/helper";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Stars from "react-native-stars";

type ReviewItemProps = {
  review: Review;
  onReport: (val: Review) => void;
};

export const ReviewItem = React.memo(
  ({ review, onReport }: ReviewItemProps) => {
    const [update, setUpdate] = useState(false);

    useEffect(() => {
      setUpdate(true);

      setTimeout(() => {
        setUpdate(false);
      }, 100);
    }, [review]);

    return (
      <View>
        <RowView>
          <EAvatar size={28} image={review?.customer?.avatar} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Typography preset="smallLabel" color="#000">
              {review?.customer?.name}
            </Typography>

            <View style={{ marginTop: 5, alignItems: "flex-start" }}>
              {!update && (
                <Stars
                  display={review?.star}
                  count={5}
                  half={false}
                  disabled
                  fullStar={
                    <StarSvg
                      size={14}
                      starColor={colors.primary}
                      strokeColor={colors.primary}
                    />
                  }
                  emptyStar={
                    <StarSvg
                      size={14}
                      starColor="transparent"
                      strokeColor={colors.primary}
                    />
                  }
                  spacing={2}
                />
              )}
            </View>
          </View>

          {!!appStore.token && (
            <Pressable
              onPress={() => onReport(review)}
              hitSlop={30}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <WarningSvg size={16} />
              <Typography
                preset="superSmallParagraph"
                colorPreset="error"
                style={{ marginLeft: 4 }}
              >
                Báo cáo
              </Typography>
            </Pressable>
          )}
        </RowView>

        <Typography
          preset="mediumParagraph"
          colorPreset="regularText"
          style={{ marginTop: 12 }}
        >
          {review?.comment}
        </Typography>

        {review?.image != "" && (
          <View
            style={{
              width: "100%",
              aspectRatio: 2 / 1,
              borderRadius: 8,
              overflow: "hidden",
              marginTop: 12,
            }}
          >
            <EImage
              source={{ uri: review?.image }}
              resizeMode="contain"
              showZoom
            />
          </View>
        )}

        <RowView style={{ marginTop: 12 }}>
          <TimeSvg color={colors.secondaryText} size={16} />
          <Typography
            preset="smallParagraph"
            colorPreset="secondaryText"
            style={{ marginLeft: 8 }}
          >
            {formatDateTime(review?.createdAt)}
          </Typography>
        </RowView>
      </View>
    );
  },
  (prev, next) => isEqual(prev.review, next.review)
);
