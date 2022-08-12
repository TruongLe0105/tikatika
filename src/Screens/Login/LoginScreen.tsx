import { CircleBannerSvg } from "@/assets/svg/CircleBannerSvg";
import { CloseSvg } from "@/assets/svg/CloseSvg";
import { LogoAppSvg } from "@/assets/svg/LogoAppSvg";
import { EButton } from "@/components/Button/EButton";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EImage } from "@/components/Image/EImage";
import { EInput } from "@/components/Input/EInput";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { VersionApp } from "@/config";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { appStyle, colors } from "@/styles/theme";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RowView } from "@/components/View/RowView";
import { authApi } from "@/api/auth";
import appStore from "@/store/appStore";
import { userStore } from "@/store/userStore";
import { isNumberPhoneVN } from "@/utils/helper";
import { I18n } from "@/plugins/i18n";
import { useToast } from "native-base";
import { FacebookSvg } from "@/assets/svg/FacebookSvg";
import { GoogleSvg } from "@/assets/svg/GoogleSvg";
import { border } from "@/styles/border";
import {
  AccessToken,
  AuthenticationToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Profile,
} from "react-native-fbsdk-next";
import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import jwt_decode from "jwt-decode";
import { configStore } from "@/store/configStore";
import { ContentDefineType } from "@/api/contentDefine.api";

GoogleSignin.configure({
  webClientId:
    "303914763943-ct85dht5khd7pe3f244okd2mosli0sgm.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  iosClientId:
    "303914763943-076j53niv1b4j7jmt417abq9nh358bhm.apps.googleusercontent.com",
});

export const LoginScreen = () => {
  const [info, setInfo] = useState({
    phone: "",
    password: "",
  });
  const [isExistPhone, setIsExistPhone] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  const [credentialStateForUser, updateCredentialStateForUser] = useState("");
  let user = useRef(null);

  useEffect(() => {
    configStore.resetTryAgain();
    configStore.fetchHotline();
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch((error) =>
      updateCredentialStateForUser(`Error: ${error.code}`)
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn("Credential Revoked");
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(
        (error) => updateCredentialStateForUser(`Error: ${error.code}`)
      );
    });
  }, []);

  useEffect(() => {
    if (!isNumberPhoneVN(info.phone)) {
      setIsExistPhone(false);
    }
  }, [info.phone]);

  const onCheckPhone = (values) => {
    const { phone } = values;

    setLoadingSubmit(true);
    authApi
      .checkExistPhone({ phone })
      .then((res) => {
        if (!res.data.isExist) {
          Navigation.navigate(ScreenName.Term, { phone }); //nếu user mới
        } else {
          setIsExistPhone(true);
          passwordRef.current.focus();
        }
      })
      .finally(() => setLoadingSubmit(false));
  };

  const handleClose = useCallback(() => {
    Navigation.navigate("BottomTabNavigator");
  }, []);

  const handleForgot = useCallback(() => {
    Navigation.navigate(ScreenName.Forgot);
  }, []);

  const handleLogin = async (data) => {
    try {
      Keyboard.dismiss();
      setLoadingSubmit(true);

      const res = await authApi.login(data);
      appStore.setToken(res.data.token);
      userStore.getInfo();
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleTerm = useCallback(() => {
    Navigation.navigate(ScreenName.Content, {
      type: ContentDefineType.TermCondition,
    });
  }, []);

  const handlePrivacy = useCallback(() => {
    Navigation.navigate(ScreenName.Content, {
      type: ContentDefineType.Security,
    });
  }, []);

  const handleRegister = useCallback(() => {
    Navigation.navigate(ScreenName.Term);
  }, []);

  const getInfoFromToken = async (error, user) => {
    if (error) {
      console.log("login info has error: " + error.toString());
    } else {
      try {
        const data = {
          fbToken: user.id,
          customer: {
            email: user.email || "",
            name: user.name,
          },
          type: "social",
        };

        const res = await authApi.loginFb(data);
        if (res.data.token) {
          appStore.setToken(res.data.token);
          userStore.getInfo();
        } else {
          Navigation.navigate(ScreenName.VerifyPhone, { data });
        }
      } finally {
        setLoadingFacebook(false);
      }
    }
  };

  const handleLoginFacebook = useCallback(async () => {
    try {
      setLoadingFacebook(true);
      const result = await LoginManager.logInWithPermissions(
        ["public_profile", "email"]
        // "limited",
        // "my_nonce"
      );

      if (result.isCancelled) {
        return;
      }

      let accessToken = "";
      // if (Platform.OS === "ios") {
      //   const result = await AuthenticationToken.getAuthenticationTokenIOS();
      //   fbToken = result?.authenticationToken;
      // } else {
      //   const result = await AccessToken.getCurrentAccessToken();
      //   fbToken = result?.accessToken;
      // }
      const res = await AccessToken.getCurrentAccessToken();
      accessToken = res?.accessToken;

      const PROFILE_REQUEST_PARAMS = {
        fields: {
          string: "id,name,first_name,last_name,email",
        },
      };
      const profileRequest = new GraphRequest(
        "/me",
        { accessToken, parameters: PROFILE_REQUEST_PARAMS },
        getInfoFromToken
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    } catch (error) {
      console.log("Login fail with error: " + error);
    } finally {
      setLoadingFacebook(false);
    }
  }, []);

  const handleLoginGoogle = useCallback(async () => {
    try {
      setLoadingGoogle(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();
      const data = {
        googleId: userInfo.user?.id,
        customer: {
          email: userInfo.user?.email || "",
          name: userInfo.user?.name || "",
        },
        type: "social",
      };
      const res = await authApi.loginGoogle(data);
      if (res.data.token) {
        appStore.setToken(res.data.token);
        userStore.getInfo();
      } else {
        Navigation.navigate(ScreenName.VerifyPhone, { data });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log("error", error);
    } finally {
      setLoadingGoogle(false);
    }
  }, []);

  async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user.current === null) {
      updateCredentialStateForUser("N/A");
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(
        user.current
      );
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser("AUTHORIZED");
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  /**
   * Starts the Sign In flow.
   */
  async function onAppleButtonPress(updateCredentialStateForUser) {
    console.warn("Beginning Apple Authentication");

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log("appleAuthRequestResponse", appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
        fullName,
      } = appleAuthRequestResponse;

      user.current = newUser;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(
        (error) => updateCredentialStateForUser(`Error: ${error.code}`)
      );

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      const response: any = jwt_decode(identityToken);

      setLoadingSubmit(true);
      const data = {
        appleToken: user.current,
        customer: {
          // phone: '',
          name: fullName.familyName
            ? `${fullName.familyName} ${fullName.givenName}`
            : "",
          email: response.email,
        },
        type: "social",
      };

      const res = await authApi.loginApple(data);
      if (res.data.token) {
        appStore.setToken(res.data.token);
        userStore.getInfo();
      } else {
        Navigation.navigate(ScreenName.VerifyPhone, { data });
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn("User canceled Apple Sign in.");
      } else {
        console.error(error);
      }
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <EScreen
      hideShadow
      style={{ flexGrow: 1 }}
      containerStyle={{}}
      headerStyle={{ zIndex: -1 }}
      fixedHeader
      edges={["bottom"]}
      enableKeyboardAware
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

        {/* <Pressable
          style={{ position: "absolute", top: 24, right: 24 }}
          onPress={handleClose}
        >
          <CloseSvg size={24} color="#fff" />
        </Pressable> */}
      </View>

      <View style={{ flex: 1, marginTop: 24, paddingHorizontal: 24 }}>
        <Formik
          initialValues={{ ...info }}
          onSubmit={(values, formikActions) => {
            isExistPhone ? handleLogin(values) : onCheckPhone(values);
            formikActions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            phone: yup
              .string()
              .matches(/((03|04|05|07|08|09)+([0-9]{8})\b)/g, {
                message: "Số điện thoại không hợp lệ",
              })
              .required("Số điện thoại không hợp lệ"),
            password: !isExistPhone
              ? yup.string().notRequired()
              : yup.string().required("Bắt buộc"),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            handleSubmit,
            setFieldValue,
            isValid,
            dirty,
          }) => (
            <>
              <View style={{}}>
                <EInput
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  onBlur={() => setFieldTouched("phone")}
                  label={"Số điện thoại"}
                  placeholder="Nhập số điện thoại của bạn"
                  errorMessage={touched.phone && errors.phone}
                  showRequire
                  keyboardType="number-pad"
                  containerStyle={{ marginBottom: 16 }}
                />

                {isExistPhone && (
                  <View>
                    <EInput
                      onChangeText={handleChange("password")}
                      value={values.password}
                      secureTextEntry
                      onBlur={() => setFieldTouched("password")}
                      label={"Mật khẩu"}
                      placeholder="Ex: ed.1234@ "
                      errorMessage={touched.password && errors.password}
                      showRequire
                      containerStyle={{ marginBottom: 24 }}
                    />
                    <Typography
                      preset="smallLabel"
                      onPress={handleForgot}
                      colorPreset={"primary"}
                      style={{ position: "absolute", top: 0, right: 0 }}
                    >
                      Quên mật khẩu?
                    </Typography>
                  </View>
                )}
              </View>

              <EButton
                text={"TIẾP TỤC"}
                loading={loadingSubmit}
                onPress={() => handleSubmit()}
              />
              <RowView style={{ marginTop: 10 }} justifyContent="center">
                <Typography preset="mediumLabel">
                  Bạn chưa có tài khoản?
                </Typography>
                <Typography
                  preset="mediumLabel"
                  colorPreset="primary"
                  style={{ marginLeft: 8, textDecorationLine: "underline" }}
                  onPress={handleRegister}
                >
                  Đăng ký ngay
                </Typography>
              </RowView>
              <Typography style={{ marginTop: 4 }}>v{VersionApp}</Typography>
            </>
          )}
        </Formik>

        <View style={{ marginTop: 24, alignItems: "center" }}>
          <View
            style={[StyleSheet.absoluteFill, appStyle.divider, { top: "50%" }]}
          />
          <Typography
            preset="superSmallLabel"
            colorPreset="secondaryText"
            style={{ backgroundColor: colors.borderBase, paddingHorizontal: 8 }}
          >
            HOẶC
          </Typography>
        </View>

        <EButton
          onPress={handleLoginFacebook}
          text={"Tiếp tục với Facebook"}
          componentLeft={<FacebookSvg color="#fff" />}
          loading={loadingFacebook}
          color={["#4267B2"]}
          style={{ marginTop: 24 }}
        />

        <EButton
          onPress={handleLoginGoogle}
          text={"Tiếp tục với Google"}
          componentLeft={<GoogleSvg />}
          loading={loadingGoogle}
          color={["#fff"]}
          textStyle={{ color: colors.regularText }}
          style={{ marginTop: 16 }}
          containerStyle={{ ...border(1, colors.background) }}
        />

        {Platform.OS === "ios" && (
          <AppleButton
            style={{
              height: 44,
              width: "100%",
              marginTop: 16,
            }}
            cornerRadius={5}
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.CONTINUE}
            onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
          />
        )}
      </View>

      <View style={{ padding: 24 }}>
        <Typography
          preset="smallParagraph"
          colorPreset="regularText"
          align="center"
        >
          Khi đăng nhập, bạn đã đồng ý với các{" "}
          <Typography
            preset="smallParagraph"
            colorPreset="primary"
            onPress={handleTerm}
          >
            Điều khoản dịch vụ
          </Typography>{" "}
          và{" "}
          <Typography
            preset="smallParagraph"
            colorPreset="primary"
            onPress={handlePrivacy}
          >
            chính sách bảo mật
          </Typography>{" "}
          của Tika-Tika
        </Typography>
      </View>
    </EScreen>
  );
};
