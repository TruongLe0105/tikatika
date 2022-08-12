import { EButton } from "@/components/Button/EButton";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

export const ResetPassScreen = ({ route }) => {
  const phone = route.params?.phone;
  const [info, setInfo] = useState({
    password: "",
    rePassword: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleLogin = useCallback(() => {
    Navigation.navigate(ScreenName.Login);
  }, []);

  const handleConfirm = async (values) => {
    try {
      setLoadingSubmit(true);
      const customer = {
        phone,
        ...values,
      };
      delete customer.refCode;
      const res = await authApi.forgotPasswordConfirm({
        phone: phone,
        newPassword: values.password,
      });
      Navigation.navigate(ScreenName.Login);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <EScreen
      hideShadow
      style={{ flexGrow: 1 }}
      containerStyle={{}}
      headerStyle={{ zIndex: -1 }}
      fixedHeader
      headerColor={colors.primary}
      enableKeyboardAware
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
            Cập nhật mật khẩu mới
          </Typography>
        </View>
      </View>

      <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
        <Typography
          preset="smallParagraph"
          align="center"
          color="#000"
          style={{ marginBottom: 16 }}
        >
          Vui lòng nhập mật khẩu mới.
        </Typography>
        <Formik
          initialValues={{ ...info }}
          onSubmit={(values, formikActions) => {
            handleConfirm(values);
            formikActions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            password: yup.string().required("Trường này bắt buộc"),
            rePassword: yup
              .string()
              .required("Trường này bắt buộc")
              .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
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
                  onChangeText={handleChange("password")}
                  value={values.password}
                  onBlur={() => setFieldTouched("password")}
                  label={"Mật khẩu"}
                  placeholder="Nhập mật khẩu của bạn"
                  errorMessage={touched.password && errors.password}
                  showRequire
                  secureTextEntry
                  containerStyle={{ marginBottom: 16 }}
                />
                <EInput
                  onChangeText={handleChange("rePassword")}
                  value={values.rePassword}
                  onBlur={() => setFieldTouched("rePassword")}
                  label={"Nhập lại mật khẩu"}
                  placeholder="Nhập lại mật khẩu của bạn"
                  errorMessage={touched.rePassword && errors.rePassword}
                  showRequire
                  secureTextEntry
                  containerStyle={{ marginBottom: 16 }}
                />
              </View>

              <EButton
                text={"TIẾP TỤC"}
                loading={loadingSubmit}
                onPress={() => handleSubmit()}
              />

              <EButton
                text={"Trở về đăng nhập"}
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
    </EScreen>
  );
};
