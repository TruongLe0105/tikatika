import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { alignJustify, appStyle, colors } from "@/styles/theme";
import { border } from "@/styles/border";
import { AvatarUserSvg } from "@/assets/svg/AvatarUserSvg";
import { Image as ImageCache } from "react-native-expo-image-cache";
import { CameraSvg } from "@/assets/svg/CameraSvg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EImage } from "../Image/EImage";
import { EditSvg } from "@/assets/svg/EditSvg";

interface AvatarProps {
  image?: string;
  size: number;
  showEdit?: boolean;
  onPressEdit?: () => void;
  defaultComponent?: React.ComponentType<any>;
  containerStyle?: ViewStyle;
}

export const EAvatar = ({
  image,
  size,
  showEdit = false,
  onPressEdit,
  defaultComponent = AvatarUserSvg,
  containerStyle,
}: AvatarProps) => {
  const Default = defaultComponent;
  const Component: any = showEdit ? TouchableOpacity : View;

  return (
    <Component activeOpacity={0.8} disabled={!showEdit} onPress={onPressEdit}>
      <View
        style={{
          height: size,
          aspectRatio: 1 / 1,
          borderRadius: size / 2,
          overflow: "hidden",
          ...alignJustify(),
          ...containerStyle,
          ...border(1, colors.placeholder),
        }}
      >
        {image ? (
          <EImage resizeMode={"cover"} source={{ uri: image }} />
        ) : (
          <Default size={size} color={"#fff"} />
        )}
      </View>

      {showEdit && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            height: size / 3,
            aspectRatio: 1,
            borderRadius: size / 4.5,
            backgroundColor: "#fff",
            ...alignJustify(),
          }}
        >
          <EditSvg size={size / 4.5} color={colors.primary} />
        </View>
      )}
    </Component>
  );
};
