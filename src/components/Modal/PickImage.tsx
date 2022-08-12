import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import Modal from "react-native-modal";
import Typography from "../Text/Typography";
import * as ImagePicker from "expo-image-picker";
import { CameraModal } from "../Camera/CameraModal";
import { appStyle, colors } from "@/styles/theme";
import { Navigation } from "@/utils/Navigation";
import { CheckSvg } from "@/assets/svg/CheckSvg";
import { ImagePickerMultiple } from "../Image/ImagePickerMultiple";
import { Asset } from "expo-media-library";
import { compressImage } from "@/utils/helper";
import appStore from "@/store/appStore";
import { isEqual } from "lodash";
import useStateCallback from "@/hooks/useStateCallback";
import RBSheet from "react-native-raw-bottom-sheet";
import { CameraSvg } from "@/assets/svg/CameraSvg";
import { GallerySvg } from "@/assets/svg/GallerySvg";

interface Props {
  onGetImage: (data: string[]) => void;
  multiSelectImage?: boolean;
}

export const PickImage = React.memo(
  React.forwardRef(({ onGetImage, multiSelectImage = false }: Props, ref) => {
    const [visible, setVisible] = useStateCallback(false);
    const actionSheetRef = useRef<RBSheet>(null);
    const cameraRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
      if (visible) {
        actionSheetRef.current?.open();
      } else {
        actionSheetRef.current?.close();
      }
    }, [visible]);

    useImperativeHandle(
      ref,
      () => ({
        handleOpen,
        handleClose,
      }),
      []
    );

    const handleOpen = useCallback(() => {
      setVisible(true);
    }, []);

    const handleClose = useCallback(() => {
      setVisible(false);
    }, []);

    const getImageFromLibrary = useCallback(() => {
      imageRef.current.handleOpen();
    }, []);

    const getImageFromCamera = useCallback(() => {
      cameraRef.current.handleOpen();
    }, []);

    const onPickImage = async (data: Asset[]) => {
      try {
        appStore.loading = true;
        onCancelModal();
        let arr = data.map(async (e) => {
          const imageCompress = await compressImage(e.uri, [], 1);
          return imageCompress.uri;
        });
        const images = await Promise.all(arr);
        onGetImage(images);
      } finally {
        appStore.loading = false;
      }
    };

    const onTakePhoto = async (photo: string) => {
      try {
        appStore.loading = true;
        onCancelModal();
        const imageCompress = await compressImage(photo);
        onGetImage([imageCompress.uri]);
      } finally {
        appStore.loading = false;
      }
    };

    const onCancelModal = useCallback(() => {
      handleClose();
    }, []);

    return (
      <RBSheet
        ref={actionSheetRef}
        openDuration={350}
        closeOnDragDown
        animationType="fade"
        onClose={handleClose}
        customStyles={{
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: null,
          },
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Pressable
            onPress={getImageFromCamera}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
            }}
          >
            <CameraSvg size={32} />
            <Typography
              preset="mediumLabel"
              colorPreset="primaryText"
              style={{ marginLeft: 16 }}
            >
              Máy ảnh
            </Typography>
          </Pressable>

          <View style={appStyle.divider} />

          <Pressable
            onPress={getImageFromLibrary}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
            }}
          >
            <GallerySvg size={32} />
            <Typography
              preset="mediumLabel"
              colorPreset="primaryText"
              style={{ marginLeft: 16 }}
            >
              Thư viện
            </Typography>
          </Pressable>
        </View>
        <CameraModal
          onClose={onCancelModal}
          onTakePhoto={onTakePhoto}
          ref={cameraRef}
        />
        <ImagePickerMultiple
          ref={imageRef}
          onClose={onCancelModal}
          onPick={onPickImage}
          multiSelectImage={multiSelectImage}
        />
      </RBSheet>
    );
  }),
  (prev, next) => isEqual(prev, next)
);
