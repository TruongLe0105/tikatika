import React, { useState, useEffect, useRef, useCallback, useImperativeHandle } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
  Linking,
} from "react-native";
import { Camera } from "expo-camera";
import { colors, appStyle } from "@/styles/theme";
import { RowView } from "@/components/View/RowView";
import { BackSvg } from "@/assets/svg/BackSvg";
import { SCREEN_HEIGHT } from "@/styles/dimensions";
import { EButton } from "../Button/EButton";
import { isEqual } from "lodash";
import useStateCallback from "@/hooks/useStateCallback";

interface Props {
  onTakePhoto: (data) => void
  onClose: () => void
}

export const CameraModal = React.memo(React.forwardRef(({ onTakePhoto, onClose }: Props, ref) => {
  const [visible, setVisible] = useStateCallback(false)
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const cameraRef = useRef<Camera>(null);

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
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        if (Platform.OS === "ios") {
          Alert.alert(
            "Vui lòng bật quyền truy cập Camera",
            "Điều này sẽ giúp bạn thêm được ảnh trong ứng dụng của chúng tôi",
            [
              {
                text: "Huỷ",
                onPress: handleClose,
              },
              {
                text: "Cài đặt",
                onPress: () => Linking.openURL("app-settings:"),
              },
            ]
          );
        }
      }
    })();
  }, [visible]);

  const snap = async () => {
    setLoadingButton(true);
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      setPhoto(photo.uri);
    }
    setLoadingButton(false);
  };

  const onPressConfirm = () => {
    onTakePhoto(photo);
    setPhoto("");
  };

  if (!visible) {
    return null;
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <Modal visible={visible} transparent={false} animationType={"fade"}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No access to camera</Text>
          <TouchableOpacity
            style={{ position: "absolute", top: "5%", left: 10 }}
            onPress={handleClose}
          >
            <BackSvg color={colors.primaryText} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const { height, width } = Dimensions.get("window");
  const newHeight = width * (16 / 9);

  return (
    <Modal visible={visible} transparent={false} animationType={"fade"}>
      {photo == "" ? (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <View
            style={{
              flex: 1,
              height: SCREEN_HEIGHT,
            }}
          >
            <Camera
              ratio="16:9"
              style={{ width, height: newHeight }}
              type={type}
              ref={cameraRef}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", top: "5%", left: 10 }}
                  onPress={handleClose}
                >
                  <BackSvg size={25} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
          <View
            style={{
              width: "100%",
              height: 160,
              // position: "absolute",
              // bottom: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,1)",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={snap}
              disabled={loadingButton}
              style={{
                height: 80,
                aspectRatio: 1 / 1,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: colors.regularText,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.error,
                  width: 60,
                  aspectRatio: 1 / 1,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ flex: 1, marginTop: 70 }}>
            <Image
              source={{ uri: photo }}
              resizeMode={"cover"}
              style={appStyle.image}
            />
          </View>
          <RowView justifyContent={"space-between"} style={{ padding: 20 }}>
            <EButton
              text={"Chụp lại"}
              border
              style={{ width: 100 }}
              onPress={() => setPhoto("")}
            />
            <EButton
              text={"OK"}
              style={{ width: 100 }}
              onPress={onPressConfirm}
            />
          </RowView>
        </View>
      )}

      {loadingButton && (
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1,
          }}
        >
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
    </Modal>
  );
}), (prev, next) => isEqual(prev, next));
