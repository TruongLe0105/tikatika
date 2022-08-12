import React, { Component, useState } from "react";
import { View, TouchableOpacity, Keyboard, TextInput } from "react-native";
import Typography from "../Text/Typography";
import { colors, appStyle } from "@/styles/theme";
import { border } from "@/styles/border";
import { boxShadow } from "@/styles/theme";
import AwesomeAlert from "react-native-awesome-alerts";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/styles/dimensions";
import { RowView } from "../View/RowView";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { KeyboardSpacer } from "../Keyboard/KeyboardSpacer";

const TypeColor = {
  error: colors.error,
  alert: colors.primaryText,
};

interface AlertButton {
  text?: string;
  onPress?: (value?: string) => void;
  style?: "cancel" | "default";
}

interface AlertOption {
  duration?: number;
  placeholder?: string;
}

interface AlertConfigure {
  title: string;
  message?: string | React.ReactNode;
  buttonGroup?: AlertButton[];
  options?: AlertOption;
}

interface PromptConfigure {
  title: string;
  message?: string | React.ReactNode;
  onGetText?: (text: string) => void;
  onClose?: () => void;
  defaultValue?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  options?: AlertOption;
}

interface AlertState extends AlertConfigure, PromptConfigure {
  modalVisible?: boolean;
  type?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onDismiss?: () => void;
}

export class Alert extends Component<any, AlertState> {
  static alertInstance: Alert;
  closeTimeout: number;
  static alert(config: AlertConfigure) {
    this.alertInstance.showAlert(config, "alert");
  }
  static error(config: AlertConfigure) {
    this.alertInstance.showAlert(config, "error");
  }
  static prompt(config: PromptConfigure) {
    this.alertInstance.showPrompt({
      ...config,
      options: { placeholder: "" },
    });
  }
  static hide() {
    if (this.alertInstance.getModalState()) {
      this.alertInstance.closeAlert();
    }
  }

  constructor(props: any) {
    super(props);

    this.state = {
      modalVisible: false,
      title: "",
      message: "",
      buttonGroup: [{ text: "OK" }],
      options: null,
      type: "alert",
      defaultValue: "",
      onGetText: null,
    };
  }

  getModalState() {
    return this.state.modalVisible;
  }

  showAlert(config: AlertConfigure, type: string) {
    Keyboard.dismiss();
    this.setState({
      ...config,
      type,
      modalVisible: true,
    });
    // If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    // Set the toast to close after the duration.
    if (config.options && config.options.duration !== 0) {
      const duration =
        config.options.duration > 0 ? config.options.duration : 1500;
      this.closeTimeout = setTimeout(this.closeAlert, duration);
    }
  }

  showPrompt = (config: PromptConfigure) => {
    Keyboard.dismiss();
    this.setState({
      ...config,
      type: "prompt",
      modalVisible: true,
    });
  };

  closeAlert = () => {
    clearTimeout(this.closeTimeout);
    this.state.onClose?.();
    this.setState({
      modalVisible: false,
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false,
        title: "",
        message: "",
        buttonGroup: [{ text: "OK" }],
        options: null,
        type: "alert",
        defaultValue: "",
        onGetText: null,
      });
    }, 200);
  };

  render() {
    if (!this.state.modalVisible) {
      return null;
    }
    return (
      <AwesomeAlert
        show={this.state.modalVisible}
        closeOnHardwareBackPress={false}
        closeOnTouchOutside={false}
        customView={
          this.state.type != "prompt" ? (
            <AlertView
              buttonGroup={this.state.buttonGroup}
              message={this.state.message}
              title={this.state.title}
              onDismiss={this.closeAlert}
              type={this.state.type}
            />
          ) : (
            <PromptView
              message={this.state.message}
              title={this.state.title}
              onDismiss={this.closeAlert}
              options={this.state.options}
              defaultValue={this.state.defaultValue}
              onGetText={this.state.onGetText}
              cancelButtonText={this.state.cancelButtonText}
              confirmButtonText={this.state.confirmButtonText}
            />
          )
        }
        contentContainerStyle={{
          maxWidth: "90%",
          backgroundColor: "transparent",
        }}
        alertContainerStyle={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: "rgba(0, 0, 0, 0.06)",
        }}
        overlayStyle={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  }
}

const AlertView = ({
  onDismiss,
  buttonGroup,
  message = "",
  title = "",
  type = "alert",
}: AlertState) => (
  <View
    style={{
      minWidth: SCREEN_WIDTH * 0.9,
      margin: -10,
      borderRadius: 8,
      padding: -10,
      backgroundColor: "#fff",
      ...boxShadow("rgba(0, 0, 0, 0.16)", 0, 2, 12),
    }}
  >
    <View style={{ padding: 20, alignItems: "center" }}>
      {!title || (
        <Typography preset="mediumLabel" color={TypeColor[type]}>
          {title}
        </Typography>
      )}

      {!message || (
        <Typography
          preset="mediumParagraph"
          colorPreset="primaryText"
          align="center"
          style={{ marginTop: !title ? 0 : 12 }}
        >
          {message}
        </Typography>
      )}
    </View>
    <View
      style={{
        width: SCREEN_WIDTH * 0.9,
        height: 1,
        backgroundColor: colors.borderBase,
      }}
    />
    <RowView
      justifyContent={"space-between"}
      style={{
        padding: 16,
      }}
    >
      {buttonGroup.map((item) => (
        <TouchableOpacity
          key={item.text}
          activeOpacity={0.8}
          onPress={() => {
            onDismiss();
            if (item.onPress) {
              requestAnimationFrame(() => {
                item.onPress();
              });
            }
          }}
          style={{ marginHorizontal: 16, flex: 1 }}
        >
          <Typography
            align="center"
            preset="mediumButton"
            color={
              item.style == "cancel" ? colors.secondaryText : colors.primary
            }
          >
            {item.text}
          </Typography>
        </TouchableOpacity>
      ))}
    </RowView>
  </View>
);

export { Alert as BAlert };

const PromptView = ({
  onDismiss,
  message = "",
  title = "",
  cancelButtonText = "Hủy",
  confirmButtonText = "Cập nhật",
  defaultValue,
  options,
  onGetText,
}: AlertState) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={{
          minWidth: SCREEN_WIDTH * 0.9,
          margin: -10,
          borderRadius: 8,
          padding: -10,
          backgroundColor: "#fff",
          ...boxShadow("rgba(0, 0, 0, 0.16)", 0, 2, 12),
        }}
      >
        <View style={{ padding: 20, alignItems: "center" }}>
          {!title || (
            <Typography preset="mediumLabel" color="#000">
              {title}
            </Typography>
          )}

          {!message || (
            <Typography
              preset="mediumParagraph"
              colorPreset="primaryText"
              align="center"
              style={{ marginTop: !title ? 0 : 12 }}
            >
              {message}
            </Typography>
          )}

          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              height: 50,
              width: "100%",
              borderRadius: 8,
              ...border(1, colors.borderBase),
            }}
          >
            <TextInput
              placeholder={options.placeholder}
              placeholderTextColor={colors.placeholder}
              onChangeText={(text) => setValue(text)}
              value={value}
              style={{
                fontFamily: "text-regular",
                fontSize: 16,
                color: colors.primaryText,
                flex: 1,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH * 0.9,
            height: 1,
            backgroundColor: colors.borderBase,
          }}
        />

        <RowView
          justifyContent={"space-between"}
          style={{
            padding: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onDismiss}
            style={{ marginHorizontal: 16, flex: 1 }}
          >
            <Typography
              align="center"
              preset="mediumButton"
              color={colors.secondaryText}
            >
              {cancelButtonText}
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onDismiss();
              if (onGetText) {
                onGetText(value);
              }
            }}
            style={{ marginHorizontal: 16, flex: 1 }}
          >
            <Typography
              align="center"
              preset="mediumButton"
              colorPreset={"primary"}
            >
              {confirmButtonText}
            </Typography>
          </TouchableOpacity>
        </RowView>
      </View>
      <KeyboardSpacer />
    </View>
  );
};
