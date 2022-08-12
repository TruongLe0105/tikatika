import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageProps } from "react-native";
import { Image as ImageCache } from "react-native-expo-image-cache";

interface BImageProps extends Partial<ImageProps> {
  url: string;
}

export const BImage = React.memo(({ ...props }: BImageProps) => {
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    setIsErr(false);
  }, [props.url]);

  return (
    <>
      {!isErr ? (
        <ImageCache
          uri={props.url}
          style={props.style}
          onError={() => {
            setIsErr(true);
          }}
        />
      ) : (
        <Image source={props.defaultSource} style={props.style} />
      )}
    </>
  );
});

const styles = StyleSheet.create({});
