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
            C???p nh???t m???t kh???u m???i
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
          Vui l??ng nh???p m???t kh???u m???i.
        </Typography>
        <Formik
          initialValues={{ ...info }}
          onSubmit={(values, formikActions) => {
            handleConfirm(values);
            formikActions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            password: yup.string().required("Tr?????ng n??y b???t bu???c"),
            rePassword: yup
              .string()
              .required("Tr?????ng n??y b???t bu???c")
              .oneOf([yup.ref("password"), null], "M???t kh???u kh??ng kh???p"),
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
                  label={"M???t kh???u"}
                  placeholder="Nh???p m???t kh???u c???a b???n"
                  errorMessage={touched.password && errors.password}
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
                  errorMessage={touched.rePassword && errors.rePassword}
                  showRequire
                  secureTextEntry
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
    </EScreen>
  );
};
