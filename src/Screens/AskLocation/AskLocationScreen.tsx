import React, { useEffect, useRef } from "react";
import {
  View,
  BackHandler,
  Linking,
  AppState,
  Platform,
  Image,
} from "react-native";
import Typography from "@/components/Text/Typography";
import { REM } from "@/styles/dimensions";
import { Navigation } from "@/utils/Navigation";
import { locationStore } from "@/store/locationStore";
import { AskLocationSvg } from "@/assets/svg/AskLocationSvg";
import { appStyle } from "@/styles/theme";
import { EButton } from "@/components/Button/EButton";
import { userStore } from "@/store/userStore";

export const AskLocationScreen = () => {
  const isGettingLocation = useRef(true);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    AppState.addEventListener("change", onStateChange);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      AppState.removeEventListener("change", onStateChange);
    };
  }, []);

  const onStateChange = async (state) => {
    if (state == "active" && isGettingLocation.current == false) {
      isGettingLocation.current = true;
      const { permission } = await locationStore.getPermissionLocation();
      if (permission) {
        Navigation.pop(1);
        await userStore.getLocation();
        await userStore.fetchLocation();
      }
    }
  };

  const handleBackButton = () => {
    return true;
  };

  const onPressAcceptLocation = async () => {
    const { permission, canAskAgain } =
      await locationStore.getPermissionLocation();
    if (permission) {
      Navigation.pop(1);
      await userStore.getLocation();
      await userStore.fetchLocation();
    } else if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
      isGettingLocation.current = false;
    } else if (!canAskAgain && Platform.OS === "android") {
      Linking.openSettings();
      isGettingLocation.current = false;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>
      <View style={{ marginTop: 130 * REM }}>
        <AskLocationSvg />
      </View>

      <View style={{ paddingHorizontal: 21, marginTop: 50 }}>
        <Typography
          align="center"
          colorPreset="primary"
          family="bold"
          size={25}
          lineHeight={30}
        >
          Vui lòng cho phép ứng dụng truy cập vị trí của bạn
        </Typography>
        <Typography align="center" style={{ marginTop: 30 }}>
          Việc này sẽ giúp chúng tôi cho bạn gợi ý về dịch vụ tốt hơn
        </Typography>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 80, width: "100%" }}>
        <EButton text={"Cho phép"} onPress={onPressAcceptLocation} />
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 10, width: "100%" }}>
        <EButton border text={"Quay lại"} onPress={() => Navigation.goBack()} />
      </View>
    </View>
  );
};
