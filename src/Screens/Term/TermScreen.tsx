/**
 * Mh yêu cầu điều khoản
 */

import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { LogoAppSvg } from "@/assets/svg/LogoAppSvg";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { colors } from "@/styles/theme";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { Checkbox } from "native-base";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const TermScreen = ({ route }) => {
  const phone = route.params?.phone;
  const listCheck = [
    {
      label:
        "Đồng ý các Điều khoản dịch vụ và chính sách bảo mật của Tika-Tika",
      value: "Item 1",
    },
    {
      label: "Đồng ý cho phép sử dụng và thu thập thông tin cá nhân",
      value: "Item 2",
    },
    {
      label: "Đồng ý cho phép sử dụng vị trí định vị",
      value: "Item 3",
    },
  ];
  const [groupValue, setGroupValue] = React.useState([]);

  const handleBack = useCallback(() => {
    Navigation.goBack();
  }, []);

  const handleOtp = useCallback(() => {
    Navigation.navigate(ScreenName.OTP, {
      phone,
      onSuccess: async () => {
        await onOtpSuccess();
      },
    });
  }, []);

  const onOtpSuccess = async () => {
    Navigation.navigate(ScreenName.Register, { phone });
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
          Vui lòng đồng ý cho phép sử dụng các điều khoản bên dưới để tiếp tục.
        </Typography>

        <ShadowCard
          style={{ paddingVertical: 14, paddingHorizontal: 12, marginTop: 16 }}
        >
          <Checkbox.Group
            colorScheme={"primary"}
            defaultValue={groupValue}
            onChange={setGroupValue}
            alignItems={"flex-start"}
          >
            {listCheck.map((e) => (
              <Checkbox
                key={e.value}
                value={e.value}
                justifyContent={"flex-start"}
                my={1}
                width={"100%"}
              >
                <Typography
                  preset="mediumParagraph"
                  color={"#000"}
                  style={{ marginLeft: 8, flex: 1 }}
                >
                  {e.label}
                </Typography>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </ShadowCard>

        <EButton
          onPress={onOtpSuccess}
          disabled={groupValue.length != 3}
          text={"TIẾP THEO"}
          style={{ marginTop: 24 }}
        />
      </View>
    </EScreen>
  );
};
