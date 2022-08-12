/**
 * Mh xac minh dien thoai
 */

import { authApi } from "@/api/auth";
import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { ForgotPasswordSvg } from "@/assets/svg/ForgotPasswordSvg";
import { LogoAppSvg } from "@/assets/svg/LogoAppSvg";
import { RegisterSvg } from "@/assets/svg/RegisterSvg";
import { Alert } from "@/components/Alert/Alert";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EInput } from "@/components/Input/EInput";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { colors } from "@/styles/theme";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { Checkbox } from "native-base";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const VerifyPhoneScreen = ({ route }) => {
  const [phone, setPhone] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const dataSocial = route.params?.data;

  const handleBack = useCallback(() => {
    Navigation.goBack();
  }, []);

  const handleNext = () => {
    setLoadingSubmit(true);
    authApi
      .checkExistPhone({ phone })
      .then((res) => {
        if (!res.data.isExist) {
          Navigation.navigate(ScreenName.OTP, {
            phone,
            onSuccess: async () => {
              await onOtpSuccess();
            },
          });
        } else {
          Alert.alert({
            title: "Cảnh báo",
            message: "Số điện thoại đã tồn tại",
          });
        }
      })
      .finally(() => setLoadingSubmit(false));
  };

  const onOtpSuccess = async () => {
    const data = { ...dataSocial, phone };
    Navigation.navigate(ScreenName.Register, {
      data,
      phone,
    });
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
          <RegisterSvg size={48} />
          <Typography
            preset="smallTitle"
            color="#fff"
            style={{ marginTop: 12 }}
          >
            Bổ sung thông tin
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
          Vui lòng để lại số điện thoại để được tiến hành đăng ký tài khoản.
        </Typography>

        <EInput
          onChangeText={setPhone}
          value={phone}
          keyboardType="number-pad"
          label={"Số điện thoại"}
          placeholder="Nhập số SĐT của bạn"
          containerStyle={{ marginVertical: 16 }}
        />

        <EButton loading={loadingSubmit} onPress={handleNext} text={"Gửi"} />
      </View>
    </EScreen>
  );
};
