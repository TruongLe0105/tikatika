/**
 * mh Setting
 */

import { authApi } from "@/api/auth";
import { ArrowRightSvg } from "@/assets/svg/ArrowRightSvg";
import { RightMenuNotificationSvg } from "@/assets/svg/RightMenuNotificationSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { Loading } from "@/components/Loading/Loading";
import { EScreen } from "@/components/Screen/EScreen";
import { CustomSwitch } from "@/components/Switch/CustomSwitch";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { userStore } from "@/store/userStore";
import { colors } from "@/styles/theme";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SettingScreen = observer(() => {
  const [enableNotify, setEnableNotify] = useState(false);

  const handleEnableNotify = async () => {
    try {
      Loading.load();
      await authApi.updateProfile({
        customer: {
          isAcceptNotification: !userStore.info.isAcceptNotification,
        },
      });
      userStore.info.isAcceptNotification =
        !userStore.info.isAcceptNotification;
    } finally {
      Loading.hide();
    }
  };

  return (
    <EScreen
      headerTitle="Cài đặt"
      showHeaderTool
      edges={["bottom"]}
      style={{ flex: 1, padding: 16 }}
    >
      <ShadowCard
        style={{ flexDirection: "row", alignItems: "center", padding: 12 }}
      >
        <RightMenuNotificationSvg />
        <Typography
          preset="mediumParagraph"
          color="#000"
          style={{ marginHorizontal: 8, flex: 1 }}
        >
          Nhận thông báo
        </Typography>
        <CustomSwitch
          value={userStore.info.isAcceptNotification}
          onValueChange={handleEnableNotify}
        />
      </ShadowCard>

      {/* <ShadowCard
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          padding: 12,
        }}
      >
        <RightMenuNotificationSvg />
        <Typography
          preset="mediumParagraph"
          color="#000"
          style={{ marginHorizontal: 8, flex: 1 }}
        >
          Ngôn ngữ
        </Typography>

        <RowView>
          <Typography
            preset="mediumLabel"
            colorPreset="primary"
            style={{ marginRight: 8 }}
          >
            Tiếng Việt
          </Typography>
          <ArrowRightSvg color={colors.background} />
        </RowView>
      </ShadowCard> */}
    </EScreen>
  );
});
