import { StarSvg } from "@/assets/svg/StarSvg";
import { BImage } from "@/components/Image/BImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { appStyle, colors } from "@/styles/theme";
import { Review } from "@/types/review";
import { formatDate } from "@/utils/helper";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

type ReviewItemProps = {
  data: Review;
};

export const ReviewItem = observer(({ data }: ReviewItemProps) => {
  const renderStar = () => {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(i);
    }
    return (
      <RowView style={{ marginTop: 2 }}>
        {arr.map((e) => (
          <StarSvg size={15} />
        ))}
      </RowView>
    );
  };

  return (
    <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
      <RowView justifyContent="space-between">
        <Typography family="bold" size={16}>
          {data.customer.name}
        </Typography>
        <Typography color={colors.placeholder} size={16}>
          {formatDate(data.createdAt)}
        </Typography>
      </RowView>
      {renderStar()}
      <Typography style={{ marginTop: 4 }} size={16}>
        {data.comment}
      </Typography>
    </View>
  );
});
