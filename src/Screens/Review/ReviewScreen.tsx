/**
 * Màn hình đánh giá quán
 */

import { authApi } from "@/api/auth";
import { customerApi } from "@/api/customer.api";
import { foodOrderApi } from "@/api/foodOrder.api";
import { storeApi } from "@/api/store.api";
import { storeRateApi } from "@/api/storeRate.api";
import { AddPhotoSvg } from "@/assets/svg/AddPhotoSvg";
import { FavoriteSvg } from "@/assets/svg/FavoriteSvg";
import { Alert } from "@/components/Alert/Alert";
import { EButton } from "@/components/Button/EButton";
import { EImage } from "@/components/Image/EImage";
import { EInput } from "@/components/Input/EInput";
import { Loading } from "@/components/Loading/Loading";
import { PickImage } from "@/components/Modal/PickImage";
import { EScreen } from "@/components/Screen/EScreen";
import { SwipeRating } from "@/components/StartRating/SwipeRating";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { border } from "@/styles/border";
import { alignJustify, colors } from "@/styles/theme";
import { getFilenameFromPath } from "@/utils/helper";
import { Navigation } from "@/utils/Navigation";
import { uploadToS3 } from "@/utils/UploadS3";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ImageReview = {
  tmpUrl?: string;
  url?: string;
};

export const ReviewScreen = observer(({ route }) => {
  const onDone: () => void = route.params?.onDone;

  const [numberStar, setNumberStar] = useState(0);
  const [note, setNote] = useState("");
  const pickImageRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    foodOrderStore.fetchDetailShop();
  }, []);

  const onPressStar = (star: number) => {
    setNumberStar(star);
  };

  const handleAddImage = () => {
    pickImageRef.current.handleOpen();
  };

  const handleUpload = async () => {
    console.log("handleUpload", selectedImages);

    setSelectedImages((prev) => [...selectedImages]);
  };

  const handlePickImage = async (images: string[]) => {
    console.log("handleSelectImage", images);
    const urls = [];
    Loading.load();
    try {
      for (const img of images) {
        const file = getFilenameFromPath(img);
        const url = await uploadToS3(img, file.filename, `image/${file.ext}`);
        urls.push(url);
      }
      setSelectedImages((prev) => [...urls]);
    } finally {
      Loading.hide();
    }
  };

  const handleReview = async () => {
    try {
      if (!numberStar) {
        Alert.alert({
          title: "Cảnh báo",
          message: "Vui lòng chọn số sao!",
        });
        return;
      }
      Loading.load();
      const data = {
        storeId: foodOrderStore.selectedShop?.id,
        star: numberStar,
        comment: note,
        image: selectedImages?.[0],
        orderId: foodOrderStore.selected.id,
      };
      console.log("handleReview", data);

      await storeRateApi.rateOrder(data);
      await foodOrderApi.rate(foodOrderStore.selected.id, data);
      Alert.alert({
        title: "Thông báo",
        message: "Cảm ơn bạn đã đánh giá!",
      });
      Navigation.goBack();
      onDone?.();
    } finally {
      Loading.hide();
    }
  };

  const handlePressFavorite = async () => {
    try {
      Loading.load();
      await foodOrderStore.favoriteShop();
    } finally {
      Loading.hide();
    }
  };

  return (
    <>
      <EScreen
        headerTitle="Đánh giá"
        showHeaderTool
        edges={["bottom"]}
        enableKeyboardAware
        style={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, padding: 16 }}>
          <Typography
            preset="mediumParagraph"
            color="#000"
            align="center"
            style={{ marginTop: 8 }}
          >
            Bạn thấy thức ăn và dịch vụ của{" "}
            <Typography preset="mediumParagraph" family="bold" color="#000">
              {foodOrderStore.selectedShop?.name}
            </Typography>{" "}
            như thế nào? Vui lòng để lại đánh giá bên dưới. Xin cảm ơn!
          </Typography>

          <SwipeRating
            type="custom"
            ratingColor={colors.primary}
            onFinishRating={onPressStar}
            onStartRating={onPressStar}
            style={{ marginTop: 16 }}
            ratingBackgroundColor={colors.borderBase}
            jumpValue={1}
            ratingCount={5}
            startingValue={numberStar}
            fractions={1}
          />

          <EInput
            containerStyle={{ marginTop: 16 }}
            value={note}
            placeholder="Nội dung review"
            multiline
            onChangeText={setNote}
            inputStyle={{ backgroundColor: "#fff" }}
            style={{ height: 120, textAlignVertical: "top" }}
          />

          <Pressable
            onPress={handleAddImage}
            style={{
              width: "100%",
              marginTop: 16,
              aspectRatio: 2 / 1,
              borderRadius: 8,
              borderStyle: "dashed",
              ...border(1, colors.secondaryText),
              ...alignJustify(),
            }}
          >
            {selectedImages.length > 0 ? (
              <EImage
                source={{ uri: selectedImages[0] }}
                resizeMode="contain"
              />
            ) : (
              <AddPhotoSvg size={32} color={colors.regularText} />
            )}
          </Pressable>
        </View>

        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 24,
            paddingTop: 16,
            backgroundColor: "#fff",
          }}
        >
          <RowView>
            <Typography preset="mediumLabel" color="#000" style={{ flex: 1 }}>
              Chọn làm cửa hàng yêu thích
            </Typography>
            <Pressable onPress={handlePressFavorite}>
              <FavoriteSvg
                isFavorite={foodOrderStore.selectedShop.isFavorite}
                strokeColor={colors.primary}
              />
            </Pressable>
          </RowView>
          <EButton
            text="Xong"
            style={{ marginTop: 16 }}
            onPress={handleReview}
          />
        </View>
      </EScreen>

      <PickImage onGetImage={handlePickImage} ref={pickImageRef} />
    </>
  );
});
