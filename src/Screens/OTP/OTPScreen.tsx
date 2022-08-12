import { authApi } from "@/api/auth";
import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { LogoAppSvg } from "@/assets/svg/LogoAppSvg";
import { SentSvg } from "@/assets/svg/SentSvg";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { useCountDown } from "@/hooks/useCountdown";
import { border } from "@/styles/border";
import { REM } from "@/styles/dimensions";
import { colors } from "@/styles/theme";
import { Navigation } from "@/utils/Navigation";
import { type } from "ramda";
import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const initialTime = 30; // initial time countdown

export const OTPScreen = ({ route }) => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const phone = route.params?.phone;
  const onSuccess = route.params?.onSuccess;
  const [value, setValue] = useState("");
  const [isFail, setIsFail] = useState(false);
  const [timeLeft, start, clearTime] = useCountDown(initialTime);
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleBack = useCallback(() => {
    Navigation.goBack();
  }, []);

  useEffect(() => {
    getOtp();
    return () => {
      clearTime();
    };
  }, []);

  const getOtp = React.useCallback(() => {
    start();
    authApi.getOTP({ phone });
  }, [start]);

  const onCheckOTP = async (otp: string) => {
    setValue(otp);
    setIsFail(false);
    if (otp.length == 6) {
      Keyboard.dismiss();
    }
  };

  const handleOtpSuccess = async () => {
    if (typeof onSuccess == "function") {
      await onSuccess();
    }
  };

  const onPressNext = async () => {
    try {
      if (__DEV__ && value == "999999") {
        handleOtpSuccess();
      } else {
        setLoadingSubmit(true);
        try {
          await authApi.checkOTP({ otp: value, phone });
          handleOtpSuccess();
        } catch {
          setValue("");
          setIsFail(true);
        } finally {
          setLoadingSubmit(false);
        }
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  const checkOtpValid = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("");
      }, 2000);
    });
    clearTime();
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
        <View style={{ borderRadius: 13, overflow: "hidden" }}>
          <LogoAppSvg size={150} />
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
          Vui lòng nhập mã OTP đã gửi qua số điện thoại
        </Typography>

        <Typography
          preset="smallTitle"
          colorPreset="primaryText"
          align="center"
          style={{ marginTop: 8 }}
        >
          {phone}
        </Typography>

        <View style={{ marginTop: 16, alignItems: "center" }}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={onCheckOTP}
            cellCount={6}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                style={{
                  borderRadius: 8,
                  backgroundColor: colors.borderBase,
                  height: 48 * REM,
                  aspectRatio: 1 / 1,
                  margin: 4 * REM,
                  alignItems: "center",
                  justifyContent: "center",
                  ...border(
                    1,
                    isFail
                      ? colors.error
                      : symbol
                      ? colors.regularText
                      : colors.secondaryText
                  ),
                }}
              >
                <Typography preset="xLargeTitle" colorPreset="primaryText">
                  {symbol || (
                    <Typography
                      preset="xLargeTitle"
                      colorPreset="secondaryText"
                    >
                      -
                    </Typography>
                  )}
                </Typography>
              </View>
            )}
          />
          {isFail && (
            <Typography
              preset="smallParagraph"
              colorPreset="error"
              style={{ marginTop: 8 }}
            >
              Mã không chính xác
            </Typography>
          )}
        </View>

        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Typography preset="smallParagraph" colorPreset="primaryText">
            Chưa nhận được mã ?
          </Typography>
          <RowView style={{ marginTop: 8 }}>
            <SentSvg
              color={timeLeft != 0 ? colors.secondaryText : colors.primary}
            />
            {timeLeft != 0 ? (
              <Typography
                preset="smallLabel"
                colorPreset="secondaryText"
                style={{ marginLeft: 8 }}
              >
                Gửi lại mã sau ({timeLeft}s)
              </Typography>
            ) : (
              <Typography
                preset="smallLabel"
                colorPreset="primary"
                onPress={getOtp}
                style={{ marginLeft: 8 }}
              >
                Gửi lại mã
              </Typography>
            )}
          </RowView>
        </View>

        <EButton
          disabled={value.length != 6}
          onPress={onPressNext}
          loading={loadingSubmit}
          text={"TIẾP THEO"}
          style={{ marginTop: 24 }}
        />
      </View>
    </EScreen>
  );
};
