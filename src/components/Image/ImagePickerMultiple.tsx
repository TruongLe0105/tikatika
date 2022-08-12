import React, { useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Alert, Linking, Modal, Platform, View } from "react-native";
import { CheckSvg } from "@/assets/svg/CheckSvg";
import { colors } from "@/styles/theme";
import { Asset } from "expo-media-library";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import Typography from "../Text/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library";
import AssetsSelector from "./AssetsSelector";
import { isEqual } from "lodash";
import useStateCallback from "@/hooks/useStateCallback";

type Props = {
  onClose: () => void;
  onPick: (data: Asset[]) => void;
  multiSelectImage?: boolean;
};

export const ImagePickerMultiple = React.memo(React.forwardRef(({ onClose, onPick, multiSelectImage }: Props, ref) => {
  const [visible, setVisible] = useStateCallback(false)
  const [permission, setPermission] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose
  }), [])

  const handleOpen = useCallback(() => {
    setVisible(true)
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false, () => {
      onClose && onClose()
    })
  }, [])

  useEffect(() => {
    (async () => {
      if (!visible) {
        return
      }
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        if (Platform.OS === "ios") {
          Alert.alert(
            "Vui lòng bật quyền truy cập album ảnh",
            "Điều này sẽ giúp bạn thêm được ảnh trong ứng dụng của chúng tôi",
            [
              {
                text: "Huỷ",
                onPress: onClose,
              },
              {
                text: "Cài đặt",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
        }
        return;
      }
      setPermission(true);
    })();
  }, [visible]);

  if (!visible || !permission) {
    return null;
  }

  return (
    <Modal visible={visible} animationType={"slide"}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <AssetsSelector
          options={{
            assetsType: ["photo"],
            noAssetsText: "",
            maxSelections: multiSelectImage ? 10 : 1,
            margin: 3,
            portraitCols: 2,
            landscapeCols: 5,
            widgetWidth: 100,
            widgetBgColor: "#fff",
            videoIcon: {
              Component: null,
              iconName: "",
              color: "",
              size: 0,
            },
            selectedIcon: {
              Component: CheckSvg,
              iconName: "",
              color: colors.primary,
              bg: "rgba(255,255,255,0.7)",
              size: 30,
            },
            noAssets: {
              Component: CustomNoAssetsComponent,
            },
            defaultTopNavigator: {
              continueText: "Chọn",
              goBackText: "Trở về",
              buttonBgColor: "#fff",
              buttonTextColor: colors.primary,
              midTextColor: colors.primaryText,
              backFunction: onClose,
              doneFunction: onPick,
            },
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}), (prev, next) => isEqual(prev, next));

const CustomNoAssetsComponent = React.memo(() => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: SCREEN_WIDTH,
      }}
    >
      <Typography align='center' preset='header' family='bold' colorPreset='primaryText'>
        Không tìm thấy hình ảnh
      </Typography>
    </View>
  );
});
