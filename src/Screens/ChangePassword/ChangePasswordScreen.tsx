import { EButton } from "@/components/Button/EButton";
import { EScreen } from "@/components/Screen/EScreen";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { EAvatar } from "@/components/Avatar/EAvatar";
import { UserInfo, userStore } from "@/store/userStore";
import { EInput } from "@/components/Input/EInput";
import { RowView } from "@/components/View/RowView";
import { authApi } from "@/api/auth";
import { Loading } from "@/components/Loading/Loading";
import { Alert } from "@/components/Alert/Alert";
import { Navigation } from "@/utils/Navigation";
import { ScreenName } from "@/utils/enum";
import appStore from "@/store/appStore";
import { foodOrderStore } from "@/store/foodOrderStore";

export const ChangePasswordScreen = ({ navigation }) => {
  const [info, setInfo] = useState({
    password: "",
    newPassword: "",
    rePassword: "",
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const onSave = async (values) => {
    try {
      setLoadingSubmit(true);
      await authApi.updatePassword({
        oldPassword: values.password,
        newPassword: values.newPassword,
      });
      Alert.alert({
        message:
          "Tài khoản của bạn đã cập nhật mật khẩu mới. Vui lòng đăng nhập lại để hoàn tất.",
        title: "Đổi mật khẩu thành công",
        buttonGroup: [
          {
            text: "Ok",
            onPress: () => {
              handleLogout();
            },
          },
        ],
      });
    } catch (error) {
      Alert.error({
        title: "Cập nhật thất bại",
        message:
          "Có lỗi xảy ra trong quá trình đổi mật khẩu của bạn. Vui lòng thử lại.",
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    appStore.setToken("");
    userStore.setInfo({});
    navigation.jumpTo("HomeScreen");
    // foodOrderStore.resetCart();
  };

  return (
    <EScreen
      headerTitle="Đổi mật khẩu"
      showHeaderTool
      enableKeyboardAware
      style={{ flexGrow: 1 }}
    >
      <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
        <Formik
          initialValues={{ ...info }}
          onSubmit={(values, formikActions) => {
            onSave(values);
            formikActions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
            password: yup.string().required("Trường này bắt buộc"),
            newPassword: yup.string().required("Trường này bắt buộc"),
            rePassword: yup
              .string()
              .required("Trường này bắt buộc")
              .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp!"),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            setFieldValue,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <>
              <View style={{ flex: 1 }}>
                <EInput
                  onChangeText={handleChange("password")}
                  value={values.password}
                  secureTextEntry
                  onBlur={() => setFieldTouched("password")}
                  label={"Mật khẩu hiện tại"}
                  placeholder="Nhập mật khẩu hiện tại"
                  errorMessage={touched.password && errors.password}
                  containerStyle={{ marginBottom: 16 }}
                />
                <EInput
                  onChangeText={handleChange("newPassword")}
                  value={values.newPassword}
                  secureTextEntry
                  onBlur={() => setFieldTouched("newPassword")}
                  label={"Mật khẩu mới"}
                  placeholder="Nhập mật khẩu mới"
                  errorMessage={touched.newPassword && errors.newPassword}
                  containerStyle={{ marginBottom: 16 }}
                />
                <EInput
                  onChangeText={handleChange("rePassword")}
                  value={values.rePassword}
                  secureTextEntry
                  onBlur={() => setFieldTouched("rePassword")}
                  label={"Nhập lại mật khẩu mới"}
                  placeholder="Nhập lại mật khẩu mới"
                  errorMessage={touched.rePassword && errors.rePassword}
                />
              </View>

              <RowView style={{ marginTop: 24 }}>
                <EButton
                  text={"Hủy"}
                  style={{ flex: 1, marginRight: 8 }}
                  border
                  loading={loadingSubmit}
                  onPress={() => Navigation.goBack()}
                />
                <EButton
                  text={"Lưu"}
                  style={{ flex: 1, marginLeft: 8 }}
                  disabled={!isValid}
                  loading={loadingSubmit}
                  onPress={() => handleSubmit()}
                />
              </RowView>
            </>
          )}
        </Formik>
      </View>
    </EScreen>
  );
};
