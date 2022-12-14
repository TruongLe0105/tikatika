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
          Vui l??ng cho ph??p ???ng d???ng truy c???p v??? tr?? c???a b???n
        </Typography>
        <Typography align="center" style={{ marginTop: 30 }}>
          Vi???c n??y s??? gi??p ch??ng t??i cho b???n g???i ?? v??? d???ch v??? t???t h??n
        </Typography>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 80, width: "100%" }}>
        <EButton text={"Cho ph??p"} onPress={onPressAcceptLocation} />
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 10, width: "100%" }}>
        <EButton border text={"Quay l???i"} onPress={() => Navigation.goBack()} />
      </View>
    </View>
  );
};
