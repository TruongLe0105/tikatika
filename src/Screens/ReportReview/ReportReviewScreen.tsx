/**
 * Màn hình báo cáo review
 * @param {Review} review //get từ route
 * @param {Function} onDone //Gọi khi báo cáo xog
 */

import { storeRateApi } from "@/api/storeRate.api";
import { EButton } from "@/components/Button/EButton";
import { EInput } from "@/components/Input/EInput";
import { Loading } from "@/components/Loading/Loading";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { colors } from "@/styles/theme";
import { Review } from "@/types/review";
import { Navigation } from "@/utils/Navigation";
import { isEqual } from "lodash";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReportReasonCheckItem } from "./components/ReportReasonCheckItem";

export const ReportReviewScreen = ({ route }) => {
  const review: Review = route.params?.review;
  const onDone: () => void = route.params?.onDone;
  const [reasons, setReasons] = useState([
    {
      content: "Review không đúng sự thật",
    },
    {
      content: "Review có kèm hình ảnh nhạy cảm",
    },
    {
      content: "Review nhầm quán",
    },
    {
      content: "Lý do khác",
    },
  ]);
  const [selectedReasons, setSelectedReasons] = useState<string>("");
  const [reason, setReason] = useState("");

  const handleCheck = (value) => {
    setSelectedReasons(value);
  };

  const handleReport = async () => {
    try {
      Loading.load();
      const data = {
        reason,
        title: selectedReasons,
      };
      await storeRateApi.report(review.id, data);
      onDone?.();
    } finally {
      Loading.hide();
    }
  };

  return (
    <EScreen
      headerTitle="Báo cáo review"
      showHeaderTool
      edges={["bottom"]}
      enableKeyboardAware
      style={{ flexGrow: 1, padding: 16 }}
    >
      <Typography
        preset="mediumParagraph"
        color="#000"
        style={{ marginTop: 8 }}
      >
        Vui lòng chọn lý do báo cáo:
      </Typography>
      {/* ds lý do */}
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={reasons}
          renderItem={({ item }) => (
            <ReportReasonCheckItem
              onCheck={handleCheck}
              isChecked={isEqual(item.content, selectedReasons)}
              content={item.content}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: colors.background,
                marginVertical: 16,
              }}
            />
          )}
        />
      </View>

      <EInput
        containerStyle={{ marginTop: 16 }}
        value={reason}
        placeholder="Nội dung review"
        multiline
        onChangeText={setReason}
        inputStyle={{ backgroundColor: "#fff" }}
        style={{ height: 120, textAlignVertical: "top" }}
      />

      <EButton text="Gửi" onPress={handleReport} style={{ marginTop: 24 }} />
    </EScreen>
  );
};
