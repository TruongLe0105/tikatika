import React, { useState } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
  TextStyle,
  Platform,
} from "react-native";
import { colors } from "@/styles/theme";
import Typography from "../Text/Typography";
import { ShowPassSvg } from "@/assets/svg/ShowPassSvg";
import { RowView } from "../View/RowView";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { isEqual } from "lodash";

export interface EInputProps extends TextInputProps {
  inputRef?: React.Ref<TextInput>;
  label?: string;
  errorMessage?: string;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  showRequire?: boolean;
  componentRight?: JSX.Element;
  componentLeft?: JSX.Element;
}

export const EInput = React.memo(
  React.forwardRef(
    (
      {
        inputRef,
        label,
        errorMessage,
        showRequire,
        componentRight,
        componentLeft,
        containerStyle,
        inputStyle,
        labelStyle,
        errorStyle,
        ...props
      }: EInputProps,
      ref
    ) => {
      const [showPasss, setShowPass] = useState(props.secureTextEntry);

      const onPressShow = () => {
        setShowPass(!showPasss);
      };

      console.log("EInput", label);

      return (
        <View style={{ ...containerStyle }}>
          {!!label && (
            <Typography
              preset="smallParagraph"
              colorPreset="regularText"
              style={{ marginBottom: 8, ...labelStyle }}
            >
              {label}
              {showRequire && <Typography colorPreset="error"> *</Typography>}
            </Typography>
          )}
          <RowView
            style={[
              {
                paddingVertical: Platform.OS === "ios" ? 13 : 0,
                paddingHorizontal: 16,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: errorMessage
                  ? colors.error
                  : !!props.value
                  ? colors.secondaryText
                  : colors.background,
                borderRadius: 8,
                maxHeight: !props.multiline ? 48 : null,
              },
              !props.editable && {
                backgroundColor: colors.placeholder,
                borderColor: colors.background,
              },
              { ...inputStyle },
            ]}
          >
            {componentLeft}

            <TextInput
              placeholderTextColor={colors.secondaryText}
              allowFontScaling={false}
              {...props}
              ref={inputRef}
              secureTextEntry={showPasss}
              style={[
                {
                  fontFamily: "text-regular",
                  color: !props.editable
                    ? colors.secondaryText
                    : colors.primaryText,
                  fontSize: 14,
                  flex: 1,
                  marginLeft: componentLeft ? 10 : 0,
                  marginRight: componentRight ? 10 : 0,
                },
                props.style,
              ]}
            />

            {componentRight}

            {props.secureTextEntry && (
              <TouchableOpacity onPress={onPressShow}>
                <ShowPassSvg showPass={showPasss} />
              </TouchableOpacity>
            )}

            {props.maxLength && !props.multiline && (
              <Typography preset="smallParagraph" colorPreset="secondaryText">
                {props.value.length}/{props.maxLength}
              </Typography>
            )}

            {props.maxLength && props.multiline && (
              <View
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: 16,
                }}
              >
                <Typography preset="smallParagraph" colorPreset="secondaryText">
                  {props.value.length}/{props.maxLength}
                </Typography>
              </View>
            )}
          </RowView>

          {!!errorMessage && (
            <Typography
              preset="smallParagraph"
              colorPreset="error"
              style={{ marginTop: 8, ...errorStyle }}
            >
              {errorMessage}
            </Typography>
          )}
        </View>
      );
    }
  ),
  (prev, next) => isEqual(prev, next)
);

//@ts-ignore
EInput.defaultProps = {
  editable: true,
};
