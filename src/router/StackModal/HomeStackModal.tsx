import { HomeScreen } from "@/Screens/Home/HomeScreen";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

export type HomeStackModalRoutes = {
  HomeScreen: undefined;
  DetailScreen: { data: any };
}

const Stack = createSharedElementStackNavigator<HomeStackModalRoutes>();

export const HomeStackModal = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
    }}
    mode="modal"
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    {/* <Stack.Screen
      name="DetailScreen"
      component={DetailScreen}
      sharedElements={(route) => {
        const { id } = route.params.data;
        return [id];
      }}
    /> */}
  </Stack.Navigator>
);