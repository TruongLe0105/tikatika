import { EButton } from "@/components/Button/EButton";
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { CloseSvg } from "@/assets/svg/CloseSvg";
import { LogoAppSvg } from "@/assets/svg/LogoAppSvg";
import { EInput } from "@/components/Input/EInput";
import { EScreen } from "@/components/Screen/EScreen";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { Navigation } from "@/utils/Navigation";
import { RegisterSvg } from "@/assets/svg/RegisterSvg";
import Typography from "@/components/Text/Typography";
import { ScreenName } from "@/utils/enum";
import { authApi } from "@/api/auth";
import { userStore } from "@/store/userStore";
import appStore from "@/store/appStore";
import { Alert } from "@/components/Alert/Alert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const RegisterScreen = ({ route }) => {
  const phone: string = route.params?.phone || "";
  const [info, setInfo] = useState({
    email: "",
    password: "",
    rePassword: "",
    name: "",
    refCode: "",
    phone: phone,
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const dataSocial = route.params?.data;

  useEffect(() => {
    if (dataSocial) {
      setInfo({ ...info, ...dataSocial.customer });
    }
  }, [dataSocial]);

  const handleClose = useCallback(() => {
    Navigation.navigate("BottomTabNavigator");
  }, []);

  const handleLogin = useCallback(() => {
    Navigation.navigate(ScreenName.Login);
  }, []);

  const handleRegister = async (values) => {
    try {
      setLoadingSubmit(true);
      const checkExistPhone = await handleCheckExistPhone(values.phone);
      if (checkExistPhone) {
        return;
      }

      if (dataSocial?.type != "social") {
        const customer = {
          ...values,
          fbToken: dataSocial?.fbToken,
          googleId: dataSocial?.googleId,
          appleToken: dataSocial?.appleToken,
        };
        const check = await authApi.checkRegister({
          customer,
          refCode: values.refCode,
        });
        Navigation.navigate(ScreenName.OTP, {
          phone: values.phone,
          onSuccess: async () => {
            await onOtpSuccess(values);
          },
        });
        return;
      }
      onOtpSuccess(values);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const onOtpSuccess = async (values) => {
    try {
      setLoadingSubmit(true);
      const customer = {
        ...values,
        fbToken: dataSocial?.fbToken,
        googleId: dataSocial?.googleId,
        appleToken: dataSocial?.appleToken,
      };
      delete customer.refCode;
      const res = await authApi.signup({
        customer,
        refCode: values.refCode,
      });
      appStore.setToken(res.data.token);
      userStore.getInfo();
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCheckExistPhone = async (phone) => {
    const res = await authApi.checkExistPhone({ phone });
    if (res.data.isExist) {
      Alert.alert({
        title: "C???nh b??o",
        message: "S??? ??i???n tho???i ???? t???n t???i",
      });
      return true;
    }
    return false;
  };

  return (
    <EScreen
      hideShadow
      style={{ flexGrow: 1 }}
      containerStyle={{}}
      headerStyle={{ zIndex: -1 }}
      fixedHeader
      headerColor={colors.primary}
      enableKeyboardAware={false}
    >
      <View
        style={{
          alignItems: "center",
          paddingVertical: 24,
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
            B??? sung th??ng tin
          </Typography>
        </View>

        {/* <Pressable
          style={{ position: "absolute", top: 24, right: 24 }}
          onPress={handleClose}
        >
          <CloseSvg size={24} color="#fff" />
        </Pressable> */}
      </View>

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        enableOnAndroid
        enableAutomaticScroll={Platform.OS === "ios"}
        enableResetScrollToCoords
      >
        <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
          <Typography
            preset="smallParagraph"
            align="center"
            color="#000"
            style={{ marginBottom: 16 }}
          >
            Vui l??ng b??? sung 1 s??? th??ng tin b??n d?????i ????? ho??n t???t ????ng k?? t??i
            kho???n.
          </Typography>
          <Formik
            initialValues={{ ...info }}
            onSubmit={(values, formikActions) => {
              handleRegister(values);
              formikActions.setSubmitting(false);
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Tr?????ng n??y l?? b???t bu???c"),
              phone:
                dataSocial?.type == "social"
                  ? yup.string().notRequired()
                  : yup.string().required("Tr?????ng n??y l?? b???t bu???c"),
              email: yup.string().email("Email kh??ng h???p l???"),
              password:
                dataSocial?.type == "social"
                  ? yup.string().notRequired()
                  : yup.string().required("Tr?????ng n??y b???t bu???c"),
              rePassword:
                dataSocial?.type == "social"
                  ? yup.string().notRequired()
                  : yup
                      .string()
                      .required("Tr?????ng n??y b???t bu???c")
                      .oneOf(
                        [yup.ref("password"), null],
                        "M???t kh???u kh??ng kh???p"
                      ),
            })}
            validateOnChange={false}
            validateOnBlur={false}
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
                  {dataSocial?.type != "social" && (
                    <EInput
                      onChangeText={handleChange("phone")}
                      value={values.phone}
                      onBlur={() => setFieldTouched("phone")}
                      keyboardType="number-pad"
                      label={"S??? ??i???n tho???i"}
                      showRequire
                      errorMessage={errors.phone}
                      placeholder="Nh???p s??? S??T c???a b???n"
                      containerStyle={{ marginBottom: 16 }}
                    />
                  )}

                  <EInput
                    onChangeText={handleChange("name")}
                    label={"H??? t??n"}
                    value={values.name}
                    onBlur={() => setFieldTouched("name")}
                    placeholder={"VD: Nguy???n V??n A"}
                    errorMessage={errors.name}
                    showRequire
                    maxLength={50}
                    containerStyle={{ marginBottom: 16 }}
                  />
                  <EInput
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={() => setFieldTouched("email")}
                    label={"Email"}
                    placeholder="Nh???p ?????a ch??? email c???a b???n"
                    errorMessage={errors.email}
                    containerStyle={{ marginBottom: 16 }}
                  />
                  {dataSocial?.type != "social" && (
                    <>
                      <EInput
                        onChangeText={handleChange("password")}
                        value={values.password}
                        onBlur={() => setFieldTouched("password")}
                        label={"M???t kh???u"}
                        placeholder="Nh???p m???t kh???u c???a b???n"
                        errorMessage={errors.password}
                        showRequire
                        secureTextEntry
                        containerStyle={{ marginBottom: 16 }}
                      />
                      <EInput
                        onChangeText={handleChange("rePassword")}
                        value={values.rePassword}
                        onBlur={() => setFieldTouched("rePassword")}
                        label={"Nh???p l???i m???t kh???u"}
                        placeholder="Nh???p l???i m???t kh???u c???a b???n"
                        errorMessage={errors.rePassword}
                        showRequire
                        secureTextEntry
                        containerStyle={{ marginBottom: 16 }}
                      />
                    </>
                  )}

                  <EInput
                    onChangeText={handleChange("refCode")}
                    label={"M?? gi???i thi???u"}
                    value={values.refCode}
                    onBlur={() => setFieldTouched("refCode")}
                    placeholder={"Nh???p m?? gi???i thi???u"}
                    errorMessage={errors.refCode}
                    containerStyle={{ marginBottom: 16 }}
                  />
                </View>

                <EButton
                  text={"TI???P T???C"}
                  loading={loadingSubmit}
                  onPress={() => handleSubmit()}
                />

                <EButton
                  text={"Tr??? v??? ????ng nh???p"}
                  border
                  loading={loadingSubmit}
                  onPress={handleLogin}
                  style={{ marginTop: 16 }}
                />
              </>
            )}
          </Formik>
        </View>

        <View style={{ height: 20 }} />
      </KeyboardAwareScrollView>
    </EScreen>
  );
};
