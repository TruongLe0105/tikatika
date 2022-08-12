import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  Alert,
  TextInput,
  Text,
  LogBox,
  Platform,
  Linking,
} from "react-native";
import { RootNavigator } from "./src/router";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Font from "expo-font";
import * as Updates from "expo-updates";
import { AppearanceProvider } from "react-native-appearance";
import { extendTheme, NativeBaseProvider } from "native-base";
import * as SQLite from "expo-sqlite";
import { enableScreens } from "react-native-screens";
import { Alert as AlertModal } from "@/components/Alert/Alert";
import { Loading } from "@/components/Loading/Loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createConnection, getConnection, getConnectionManager } from "typeorm";
import { EToast } from "@/components/Toast/EToast";
import { MenuProvider } from "react-native-popup-menu";
import { getLocal, I18n } from "@/plugins/i18n";
import { Provider } from "mobx-react";
import AppLoading from "expo-app-loading";
import { AddressEntity } from "@/entities/AddressHistoryEntity";
import VersionCheck from "react-native-version-check";
import * as Sentry from "@sentry/react-native";
import { RewriteFrames } from "@sentry/integrations";
import { colors } from "@/styles/theme";
import "@/plugins/notificationService";
import { VersionApp } from "@/config";
import { PortalProvider } from "@gorhom/portal";
import { LaunchScreen } from "@/Screens/Launch/LaunchScreen";
// import * as SplashScreen from "expo-splash-screen";
import SplashScreen from "react-native-lottie-splash-screen";

const rewriteFramesIntegration = new RewriteFrames({
  iteratee: (frame) => {
    if (frame.filename && frame.filename !== "[native code]") {
      frame.filename =
        Platform.OS === "android"
          ? "app:///index.android.bundle"
          : "app:///main.jsbundle";
    }
    return frame;
  },
});

if (!__DEV__) {
  Sentry.init({
    dsn: "https://808cfeb118bf480d8b74cb9f89bb147b@o499612.ingest.sentry.io/5921517",
    debug: __DEV__ ? true : false,
    environment: __DEV__ ? "development" : "production",
    dist: VersionApp,
    integrations: [rewriteFramesIntegration],
  });
}

enableScreens(false);

EStyleSheet.build({ $rem: SCREEN_WIDTH / 414 });
(window as any).Expo = Object.freeze({ ...(window as any).Expo, SQLite });

LogBox.ignoreAllLogs();

const themeNativeBase = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        _interactionBox: { _pressed: { bg: "transparent" } },
        _checkbox: {
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.regularText,
          _checked: {
            borderColor: colors.primary,
            bg: colors.primary,
          },
        },
      },
      sizes: { sm: { _icon: { size: 5 } } },
    },
  },
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [appInitSuccess, setAppInitSuccess] = useState(false);
  const _checking_update = useRef(false);
  const text: any = Text;
  const textinput: any = TextInput;

  text.defaultProps = text.defaultProps || {};
  text.defaultProps.maxFontSizeMultiplier = 1;
  textinput.defaultProps = textinput.defaultProps || {};
  textinput.defaultProps.maxFontSizeMultiplier = 1;

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    connectSql();
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const loadFont = async (): Promise<void> => {
    await Font.loadAsync({
      "text-bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
      "text-regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
      "text-medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
      "text-italic": require("@/assets/fonts/Montserrat-Italic.ttf"),
      "text-semibold": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    });
  };

  const onLoad = async () => {
    console.log("load success");
    try {
      // fresh start check
      _checkUpdates();
      setLocale();
      checkVersionStore();
    } finally {
      setAppInitSuccess(true);
      setAppIsReady(true);
      SplashScreen.hide();
    }
  };

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      _checkUpdates();
    }
  };

  const connectSql = async () => {
    console.log("connect sql");
    try {
      const connectionManager = await getConnectionManager();
      if (!connectionManager.has("default")) {
        await createConnection({
          name: "default",
          database: "tika.user.et.db",
          entities: [AddressEntity],
          // driver: SQLite,
          synchronize: true,
          type: "expo",
        });
      }
    } catch (err) {
      console.log("catch (error): connectSql", err);
    }
  };

  const setLocale = async () => {
    I18n.locale = await getLocal();
  };

  const _checkUpdates = async () => {
    if (__DEV__) {
      return;
    }
    if (_checking_update.current !== true) {
      _checking_update.current = true;
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          Alert.alert(
            "Thông báo",
            "Úng dụng đã có phiên bản mới. Hãy khởi động lại để áp dụng!",
            [
              {
                text: "Chấp nhận",
                onPress: () => {
                  Updates.reloadAsync();
                },
              },
            ]
          );
        }
      } catch (e) {
        console.log("Error while trying to check for updates", e);
      }
      delete _checking_update.current;
    } else {
      console.log("Currently checking for an update");
    }
  };

  const checkVersionStore = () => {
    if (__DEV__) {
      return;
    }
    VersionCheck.needUpdate().then(async (res) => {
      if (res?.isNeeded) {
        Alert.alert(
          "Thông báo",
          `Úng dụng đã có phiên bản mới. Nhấn chấp nhận để cập nhật app từ ${
            Platform.OS == "ios" ? "App store" : "Google play"
          }`,
          [
            {
              text: "Chấp nhận",
              onPress: () => {
                Linking.openURL(res.storeUrl); // open store if update is needed.
              },
            },
          ]
        );
      }
    });
  };

  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={loadFont}
        onError={() => {}}
        onFinish={onLoad}
        autoHideSplash={false}
      />
    );
  }

  // if (!appInitSuccess) {
  //   return <LaunchScreen startAsync={loadFont} onFinish={onLoad} />;
  // }

  return (
    <AppearanceProvider>
      <Provider>
        <SafeAreaProvider>
          <PortalProvider>
            <NativeBaseProvider theme={themeNativeBase}>
              <MenuProvider>
                <RootNavigator onFinish={() => setAppInitSuccess(true)} />
              </MenuProvider>
            </NativeBaseProvider>
          </PortalProvider>
        </SafeAreaProvider>
      </Provider>
      <AlertModal
        ref={(c) => {
          if (c) AlertModal.alertInstance = c;
        }}
      />
      <Loading
        ref={(c) => {
          if (c) Loading.loadingInstance = c;
        }}
      />
      <EToast
        ref={(c) => {
          if (c) EToast.toastInstance = c;
        }}
      />
    </AppearanceProvider>
  );
}
