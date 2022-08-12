import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChangeDeliveryAddressScreen } from "@/Screens/ChangeDeliveryAddress/ChangeDeliveryAddressScreen";

import { ScreenName } from "@/utils/enum";
import { LoginScreen } from "@/Screens/Login/LoginScreen";
import { TermScreen } from "@/Screens/Term/TermScreen";
import { OTPScreen } from "@/Screens/OTP/OTPScreen";
import { RegisterScreen } from "@/Screens/Register/RegisterScreen";
import { ForgotPasswordScreen } from "@/Screens/ForgotPassword/ForgotPasswordScreen";
import { ResetPassScreen } from "@/Screens/ResetPass/ResetPassScreen";
import { VerifyPhoneScreen } from "@/Screens/VerifyPhone/VerifyPhoneScreen";
import { ContentScreen } from "@/Screens/Content/ContentScreen";

const Stack = createStackNavigator();

export const AuthStack = () => {
  const screens: { name: string; component: React.ComponentType<any> }[] = [
    {
      name: ScreenName.Login,
      component: LoginScreen,
    },
    {
      name: ScreenName.Term,
      component: TermScreen,
    },
    {
      name: ScreenName.OTP,
      component: OTPScreen,
    },
    {
      name: ScreenName.Register,
      component: RegisterScreen,
    },
    {
      name: ScreenName.Forgot,
      component: ForgotPasswordScreen,
    },
    {
      name: ScreenName.ResetPass,
      component: ResetPassScreen,
    },
    {
      name: ScreenName.VerifyPhone,
      component: VerifyPhoneScreen,
    },
    {
      name: ScreenName.Content,
      component: ContentScreen,
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        gestureEnabled: true,
      }}
    >
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};
