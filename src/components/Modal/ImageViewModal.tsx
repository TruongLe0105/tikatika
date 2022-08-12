import React, { useCallback, useImperativeHandle, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Props as ImageViewerProps } from "react-native-image-zoom-viewer/built/image-viewer.type";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { colors } from "@/styles/theme";
import { CloseSvg } from "@/assets/svg/CloseSvg";
import { isEqual } from "lodash";
import useStateCallback from "@/hooks/useStateCallback";
import { BackSvg } from "@/assets/svg/BackSvg";

interface ImageViewModalProps extends ImageViewerProps {
  onClose?: () => void;
}

export const ImageViewModal = React.memo(
  React.forwardRef(({ onClose, ...props }: ImageViewModalProps, ref) => {
    const [visible, setVisible] = useStateCallback(false);
    const [index, setIndex] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        handleOpen,
        handleClose,
      }),
      []
    );

    const handleOpen = useCallback((indexImage = 0) => {
      setIndex(indexImage);
      setVisible(true);
    }, []);

    const handleClose = useCallback(() => {
      setVisible(false, () => {
        onClose && onClose();
      });
    }, []);

    return (
      <Modal visible={visible} transparent={true}>
        <ImageViewer
          {...props}
          enableSwipeDown
          onSwipeDown={handleClose}
          useNativeDriver={true}
          loadingRender={() => (
            <ActivityIndicator size={"large"} color={"#fff"} />
          )}
          index={index}
          backgroundColor={colors.primaryText}
          enablePreload
        />
        <Pressable
          hitSlop={50}
          onPress={handleClose}
          style={{
            position: "absolute",
            top: 16 + (Platform.OS == "ios" ? getStatusBarHeight(true) : 0),
            left: 16,
          }}
        >
          <BackSvg size={32} />
        </Pressable>
      </Modal>
    );
  }),
  (prev, next) => isEqual(prev, next)
);
