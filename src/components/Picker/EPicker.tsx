import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TargetedEvent,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { colors } from "@/styles/theme";
import { border } from "@/styles/border";
import Typography from "../Text/Typography";
import { RowView } from "../View/RowView";
import PickerModal from "react-native-picker-modal-view";
import { EInput, EInputProps } from "../Input/EInput";
import { DownSvg } from "@/assets/svg/DownSvg";
import { BottomPicker } from "./BottomPicker";

interface Props extends EInputProps {
  items: any[];
  value?: any;
  onPicker: (value: any) => void;
  pickerValue?: any;
  pickerSearchPlaceholder?: string;
  loading?: boolean;
}

export const EPicker = React.memo(({ ...props }: Props) => {
  console.log("EPicker", props.value);

  const bottomRef = useRef(null);

  const handlePressPopup = useCallback(() => {
    bottomRef.current.handleOpen(props.pickerValue);
  }, [props.pickerValue]);

  return (
    <View>
      <EInput
        {...props}
        editable={false}
        pointerEvents="none"
        inputStyle={{ borderWidth: 1 }}
        componentRight={
          <View style={{ alignSelf: "center" }}>
            <DownSvg color={"rgba(135, 152, 173, 0.87)"} />
          </View>
        }
      />
      <Pressable
        onPress={handlePressPopup}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      <BottomPicker
        loading={props.loading}
        pickerSearchPlaceholder={props.pickerSearchPlaceholder}
        title={props.label}
        items={props.items}
        ref={bottomRef}
        onSelect={props.onPicker}
      />
    </View>
  );
});
