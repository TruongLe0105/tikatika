import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ImageProps,
  TouchableOpacity,
  ImageURISource,
  ImageRequireSource,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { appStyle } from "@/styles/theme";
import { ImageViewModal } from "../Modal/ImageViewModal";
import FastImage from "react-native-fast-image";
import { isEqual } from "lodash";
import { BASE_URL } from "@/config";
import Lightbox from "react-native-lightbox-v2";

interface EImageProps extends ImageProps {
  showZoom?: boolean;
  imageAutoLayout?: boolean;
  source: ImageURISource | ImageRequireSource;
  defaultSource?: ImageURISource | number;
}

export const EImage = React.memo(
  ({
    showZoom = false,
    imageAutoLayout = false,
    resizeMode = "cover",
    defaultSource = require("@/assets/icon.png"),
    ...props
  }: EImageProps) => {
    const [hideDefaultSource, setHideDefaultSource] = useState(false);
    const [hideCacheImage, setHideCacheImage] = useState(false);
    const [layout, setLayout] = useState<{
      width: string | number;
      height: string | number;
    }>({ width: "100%", height: "100%" });

    const _onLayout = (event) => {
      if (!imageAutoLayout) {
        return;
      }
      const containerWidth = event.nativeEvent.layout.width;
      const source = props.source;
      let url: any = source;

      if (typeof source !== "object") {
        const layout = Image.resolveAssetSource(url);
        return setLayout({
          width: containerWidth,
          height: (containerWidth * layout.height) / layout.width,
        });
      }

      const arrCheck = ["https://", "http://"];
      url = BASE_URL + source.uri?.replace(BASE_URL, "");

      if (arrCheck.some((substring) => source.uri?.includes(substring))) {
        url = source.uri;
      }

      Image.getSize(
        url,
        (width, height) => {
          setLayout({
            width: containerWidth,
            height: (containerWidth * height) / width,
          });
        },
        (err) => {
          setLayout({
            width: containerWidth,
            height: containerWidth,
          });
        }
      );
    };

    if (!showZoom) {
      return (
        <View style={[layout, props.style]} onLayout={_onLayout}>
          <ImageCustom
            {...{ props, resizeMode, defaultSource, hideDefaultSource }}
            onSetHideDefaultSource={setHideDefaultSource}
            onSetHideCacheImage={setHideCacheImage}
            hideCacheImage={hideCacheImage}
          />
        </View>
      );
    }

    return (
      <Lightbox activeProps={{ resizeMode: "contain" }}>
        <ImageCustom
          {...{ props, resizeMode, defaultSource, hideDefaultSource }}
          onSetHideDefaultSource={setHideDefaultSource}
          onSetHideCacheImage={setHideCacheImage}
          hideCacheImage={hideCacheImage}
        />
      </Lightbox>
    );
  },
  (prev, next) => isEqual(prev, next)
);

const ImageCustom = ({
  props,
  resizeMode,
  defaultSource,
  hideDefaultSource,
  onSetHideDefaultSource,
  onSetHideCacheImage,
  hideCacheImage,
}) => {
  const source = props.source;
  if (typeof source == "object" && !source.uri?.includes("file:/")) {
    const arrCheck = ["https://", "http://"];
    let uri = BASE_URL + source.uri?.replace(BASE_URL, "");

    if (arrCheck.some((substring) => source.uri?.includes(substring))) {
      uri = source.uri;
    }

    return (
      <View style={appStyle.image}>
        {!hideDefaultSource && (
          <Image
            source={defaultSource}
            style={[appStyle.image, { position: "absolute" }]}
          />
        )}
        <Image
          source={{ uri }}
          resizeMode={resizeMode}
          style={[appStyle.image, { position: "absolute" }]}
          onLoad={(e) => {
            onSetHideDefaultSource(true);
            onSetHideCacheImage(true);
          }}
          onError={() => {
            onSetHideCacheImage(false);
            onSetHideDefaultSource(false);
          }}
        />
        {!hideCacheImage && (
          <FastImage
            resizeMode={resizeMode}
            style={[appStyle.image, { position: "absolute" }]}
            source={{ uri, priority: FastImage.priority.normal }}
            onLoad={(e) => onSetHideDefaultSource(true)}
            onError={() => onSetHideDefaultSource(false)}
          />
        )}
      </View>
    );
  }

  return (
    <Image
      {...props}
      resizeMode={resizeMode}
      style={appStyle.image}
      defaultSource={defaultSource}
    />
  );
};
