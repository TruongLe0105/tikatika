/**
 * Mh quên mật khẩu
 */

import { authApi } from "@/api/auth";
import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { ForgotPasswordSvg } from "@/assets/svg/ForgotPasswordSvg";
import { LogoAppSvg } from "@/assets/svg/LogoAppSvg";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EInput } from "@/components/Input/EInput";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { configStore } from "@/store/configStore";
import { colors } from "@/styles/theme";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import { Checkbox } from "native-base";
import React, { useCallback, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ForgotPasswordScreen = observer(({ route }) => {
  const [phone, setPhone] = useState("");

  const handleBack = useCallback(() => {
    Navigation.goBack();
  }, []);

  const handleNext = async () => {
    Navigation.navigate(ScreenName.OTP, {
      phone,
      onSuccess: async () => {
        await onOtpSuccess();
      },
    });
  };

  const onOtpSuccess = async () => {
    Navigation.navigate(ScreenName.ResetPass, {
      phone,
    });
  };

  const handleCallHotline = () => {
    Linking.openURL(`tel:${configStore.hotLine}`);
  };

  return (
    <EScreen
      hideShadow
      style={{ flexGrow: 1 }}
      containerStyle={{}}
      headerStyle={{ zIndex: -1 }}
      fixedHeader
      headerColor={colors.primary}
    >
      <View
        style={{
          alignItems: "center",
          paddingVertical: 38,
        }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: colors.primary,
            width: "100%",
            top: -100,
            bottom: 0,
          }}
        />
        <View style={{ alignItems: "center" }}>
          <ForgotPasswordSvg size={48} />
          <Typography
            preset="smallTitle"
            color="#fff"
            style={{ marginTop: 12 }}
          >
            Quên mật khẩu
          </Typography>
        </View>

        <Pressable
          hitSlop={50}
          style={{ position: "absolute", top: 24, left: 24 }}
          onPress={handleBack}
        >
          <ArrowLeftSvg
            size={24}
            backgroundColor="transparent"
            borderColor="#fff"
          />
        </Pressable>
      </View>

      <View style={{ padding: 24 }}>
        <Typography
          preset="smallParagraph"
          colorPreset="primaryText"
          align="center"
        >
          Vui lòng để lại số điện thoại để được hỗ trợ đặt lại mật khẩu mới.
        </Typography>

        <EInput
          onChangeText={setPhone}
          value={phone}
          keyboardType="number-pad"
          label={"Số điện thoại"}
          placeholder="Nhập số SĐT của bạn"
          containerStyle={{ marginVertical: 16 }}
        />

        <EButton onPress={handleNext} text={"Gửi"} />

        <Typography
          preset="smallParagraph"
          color="#000"
          align="center"
          style={{ marginTop: 16 }}
        >
          Hoặc gọi đến Hotline{" "}
          <Typography
            preset="smallParagraph"
            family="bold"
            colorPreset="primary"
            onPress={handleCallHotline}
          >
            {configStore.hotLine}
          </Typography>{" "}
          để được hỗ trợ thêm
        </Typography>
      </View>
    </EScreen>
  );
});
