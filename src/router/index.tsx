import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from "@react-navigation/native";
import { Navigation } from "@/utils/Navigation";
import { observer, useLocalStore } from "mobx-react";
import { HomeStack } from "./Stack/HomeStack";
import { LocalStorage } from "@/utils/LocalStorage";
import appStore from "@/store/appStore";
import { userStore } from "@/store/userStore";
import * as SplashScreen from "expo-splash-screen";
import { AuthStack } from "./Stack/AuthStack";
import { Video } from "expo-av";
import { SplashScreen as Splash } from "@/Screens/Splash/SplashScreen";
import NoSignalView from "@/components/View/NoSignalView";
import { PortalHost } from "@gorhom/portal";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const linking: LinkingOptions = {
  prefixes: ["tikaetuser://"],
  config: {
    initialRouteName: "BottomTabNavigator",
    screens: {
      BottomTabNavigator: {
        screens: {
          HomeScreen: "store",
        },
      },
    },
  },
};

export const RootNavigator = observer(({ onFinish }) => {
  const [splash, setSplash] = useState(true);
  const [isInitRouter, setIsInitRouter] = useState(false);
  const [isVideoLoad, setIsVideoLoad] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (isInitRouter) {
      if (appStore.token) {
        userStore.getInfo();
      }

      SplashScreen.hideAsync();
      onFinish();
    }
  }, [isInitRouter]);

  useEffect(() => {
    if (isVideoLoad) {
      videoRef.current?.playAsync();
    }
  }, [isVideoLoad]);

  const handleFinishVideo = () => {
    setSplash(false);
    appStore.setLoadSplashVideo(true);
  };

  const renderScreen = useCallback(() => {
    if (!isInitRouter) {
      return <></>;
    } else {
      if (!!appStore.token) {
        return <HomeStack />;
      }
      return <AuthStack />;
    }
  }, [isInitRouter]);

  return (
    <NavigationContainer
      theme={MyTheme}
      linking={linking}
      ref={(navigatorRef) => {
        Navigation.setTopLevelNavigator(navigatorRef);
      }}
      onReady={() => setIsInitRouter(true)}
    >
      {renderScreen()}
      {splash && (
        <Splash
          videoRef={videoRef}
          onLoad={() => setIsVideoLoad(true)}
          onError={() => {
            setSplash(false);
            appStore.setLoadSplashVideo(true);
          }}
          onFinish={handleFinishVideo}
        />
      )}
      <PortalHost name="PopupDetailStorePortalHost" />
      <NoSignalView />
    </NavigationContainer>
  );
});
