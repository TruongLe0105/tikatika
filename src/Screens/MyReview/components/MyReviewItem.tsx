/**
 * Hiển thị chi tiết đánh giá quán
 * @param {Review} review
 *
 */

import { LocationSvg } from "@/assets/svg/LocationSvg";
import { StarSvg } from "@/assets/svg/StarSvg";
import { StoreSvg } from "@/assets/svg/StoreSvg";
import { TimeSvg } from "@/assets/svg/TimeSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { Review } from "@/types/review";
import { formatDateTime } from "@/utils/helper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Stars from "react-native-stars";

type MyReviewItemProps = {
  review: Review;
};

export const MyReviewItem = ({ review }: MyReviewItemProps) => {
  return (
    <ShadowCard>
      <View style={{ padding: 8 }}>
        <RowView>
          <StoreSvg />
          <Typography
            preset="mediumLabel"
            colorPreset="primary"
            style={{ marginLeft: 8, flex: 1 }}
          >
            {review.store?.name}
          </Typography>
        </RowView>
        <RowView style={{ marginTop: 8 }}>
          <LocationSvg border size={16} />
          <Typography
            preset="smallParagraph"
            colorPreset="secondaryText"
            style={{ marginLeft: 8, flex: 1 }}
          >
            {review.store?.address}
          </Typography>
        </RowView>
        <RowView style={{ marginTop: 8 }}>
          <TimeSvg color={colors.secondaryText} size={16} />
          <Typography
            preset="smallParagraph"
            colorPreset="secondaryText"
            style={{ marginLeft: 8, flex: 1 }}
          >
            {formatDateTime(review.createdAt)}
          </Typography>

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
        </RowView>

        <Typography
          preset="mediumParagraph"
          colorPreset="regularText"
          style={{ marginTop: 12 }}
        >
          {review.comment}
        </Typography>
      </View>

      {review.image != "" && (
        <View
          style={{
            width: "100%",
            aspectRatio: 2 / 1,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            overflow: "hidden",
          }}
        >
          <EImage
            source={{ uri: review?.image }}
            showZoom
            resizeMode="contain"
          />
        </View>
      )}
    </ShadowCard>
  );
};
