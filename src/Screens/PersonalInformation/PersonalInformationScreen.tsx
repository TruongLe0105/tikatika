import { EButton } from "@/components/Button/EButton";
import { EScreen } from "@/components/Screen/EScreen";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import { FastField, Formik } from "formik";
import { EAvatar } from "@/components/Avatar/EAvatar";
import { UserInfo, userStore } from "@/store/userStore";
import { EInput } from "@/components/Input/EInput";
import { RowView } from "@/components/View/RowView";
import { authApi } from "@/api/auth";
import { Loading } from "@/components/Loading/Loading";
import { Alert } from "@/components/Alert/Alert";
import { Navigation } from "@/utils/Navigation";
import { PickImage } from "@/components/Modal/PickImage";
import { ImageReview } from "../Review/ReviewScreen";
import { customerApi } from "@/api/customer.api";
import { getFilenameFromPath } from "@/utils/helper";
import { uploadToS3 } from "@/utils/UploadS3";
import { observer } from "mobx-react";
import Typography from "@/components/Text/Typography";

export const PersonalInformationScreen = observer(() => {
  const [info, setInfo] = useState<UserInfo>({
    name: userStore.info?.name || "",
    address: userStore.info?.address || "",
    phone: userStore.info?.phone || "",
    email: userStore.info?.email || "",
  });
  const pickImageRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState<ImageReview[]>([]);
  const rules = {
    name: yup.string().required("Trường này là bắt buộc"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .matches(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "Email không hợp lệ"
      )
      .notRequired(),
  };

  const changeAvatar = () => {
    pickImageRef.current.handleOpen();
  };

  const handlePickImage = async (images) => {
    console.log("handleSelectImage", images);
    const urls = [];
    Loading.load();
    try {
      for (const img of images) {
        const file = getFilenameFromPath(img);
        const url = await uploadToS3(img, file.filename, `image/${file.ext}`);
        await authApi.updateProfile({
          customer: { avatar: url },
        });
        await userStore.getInfo();
        userStore.info.avatar = url;
        urls.push(url);
      }
      setSelectedImages((prev) => [...urls]);
    } catch (error) {
      console.log("error", error);
    } finally {
      Loading.hide();
    }
  };

  const onSave = async (values) => {
    try {
      Loading.load();
      await authApi.updateProfile({
        customer: {
          ...values,
        },
      });
      await userStore.getInfo();
      Navigation.goBack();
    } catch (error) {
      Alert.error({
        title: "Cập nhật thất bại",
        message:
          "Có lỗi xảy ra trong quá trình cập nhật tài khoản của bạn. Vui lòng thử lại.",
      });
    } finally {
      Loading.hide();
    }
  };

  return (
    <>
      <EScreen
        headerTitle="Thông tin cá nhân"
        showHeaderTool
        enableKeyboardAware
        style={{ flexGrow: 1 }}
      >
        <View style={{ alignItems: "center", paddingTop: 30 }}>
          <EAvatar
            image={userStore.info.avatar}
            size={100}
            showEdit
            onPressEdit={changeAvatar}
          />
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Formik
            enableReinitialize
            initialValues={{ ...info }}
            onSubmit={(values, formikActions) => {
              onSave(values);
              formikActions.setSubmitting(false);
            }}
            validationSchema={yup.object().shape(rules)}
            validateOnChange={false}
            validateOnBlur={false}
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
                  <FastField name="name">
                    {() => (
                      <EInput
                        onChangeText={handleChange("name")}
                        label={"Họ tên"}
                        value={values.name}
                        onBlur={() => setFieldTouched("name")}
                        placeholder={"VD: Nguyễn Văn A"}
                        errorMessage={touched.name && errors.name}
                        showRequire={!!rules["name"]}
                        containerStyle={{ marginBottom: 16 }}
                        maxLength={50}
                      />
                    )}
                  </FastField>

                  <FastField name="phone">
                    {() => (
                      <EInput
                        onChangeText={handleChange("phone")}
                        label={"Số điện thoại"}
                        value={values.phone}
                        keyboardType={"number-pad"}
                        onBlur={() => setFieldTouched("phone")}
                        placeholder={"VD: 0938123456"}
                        errorMessage={touched.phone && errors.phone}
                        showRequire={!!rules["phone"]}
                        editable={false}
                        containerStyle={{ marginBottom: 16 }}
                      />
                    )}
                  </FastField>

                  <FastField name="email">
                    {() => (
                      <EInput
                        onChangeText={handleChange("email")}
                        label={"Email"}
                        value={values.email}
                        onBlur={() => setFieldTouched("email")}
                        placeholder={"Nhập địa chỉ email"}
                        errorMessage={touched.email && errors.email}
                        // containerStyle={{ marginBottom: 16 }}
                      />
                    )}
                  </FastField>

                  {/* <EInput
                    onChangeText={handleChange("address")}
                    label={"Địa chỉ"}
                    value={values.address}
                    onBlur={() => setFieldTouched("address")}
                    placeholder={"VD: 1 Đường số 2, P3, Q.4,..."}
                    errorMessage={touched.address && errors.address}
                    showRequire={!!rules["address"]}
                  /> */}
                </View>

                <RowView style={{ marginBottom: 20, marginTop: 24 }}>
                  <EButton
                    text={"Hủy"}
                    style={{ flex: 1, marginRight: 8 }}
                    border
                    onPress={() => Navigation.goBack()}
                  />
                  <EButton
                    text={"Lưu"}
                    style={{ flex: 1, marginLeft: 8 }}
                    onPress={() => handleSubmit()}
                  />
                </RowView>
              </>
            )}
          </Formik>
        </View>
      </EScreen>
      <PickImage onGetImage={handlePickImage} ref={pickImageRef} />
    </>
  );
});
