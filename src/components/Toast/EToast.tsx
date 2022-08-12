/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import {
  Keyboard,
  Platform,
  Animated,
  ViewPropTypes,
  View,
  TextStyle,
  ViewStyle,
} from "react-native";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";
import { RowView } from "../View/RowView";
import { CheckSvg } from "@/assets/svg/CheckSvg";
import { ShadowCard } from "../Card/ShadowCard";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/styles/dimensions";
import { EButton } from "../Button/EButton";

const POSITION = {
  ABSOLUTE: "absolute",
  BOTTOM: "bottom",
  TOP: "top",
  CENTER: "center",
};

interface ToastConfigure {
  text: string;
  buttonText?: string;
  type?: string;
  duration?: number;
  position?: string;
  icon?: React.ReactNode;
  buttonTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  onClose?: () => void;
}

interface Props { }

interface State {
  fadeAnim: Animated.Value;
  keyboardHeight: number;
  isKeyboardVisible: boolean;
  modalVisible: boolean;
  position?: string;
  text?: string;
  buttonText?: string;
  type?: string;
  icon?: React.ReactNode;
  buttonTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  onClose?: () => void;
}

export class EToast extends Component<Props, State> {
  static toastInstance: EToast;
  closeTimeout: NodeJS.Timeout;

  static show(config: ToastConfigure) {
    this.toastInstance.showToast(config);
  }
  static hide() {
    if (this.toastInstance.getModalState()) {
      this.toastInstance.closeToast();
    }
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(0),
      keyboardHeight: 0,
      isKeyboardVisible: false,
      modalVisible: false,
    };

    this.keyboardDidHide = this.keyboardDidHide.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
  }

  componentDidMount() {
    Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
  }

  getToastStyle(): Animated.WithAnimatedObject<ViewStyle> {
    return {
      position: 'absolute',
      opacity: this.state.fadeAnim,
      width: "100%",
      elevation: 9,
      paddingHorizontal: Platform.OS === "ios" ? 20 : 0,
      top: this.state.position === POSITION.TOP ? 30 : undefined,
      bottom:
        this.state.position === POSITION.BOTTOM ? this.getTop() : undefined,
    };
  }

  getTop() {
    if (Platform.OS === "ios") {
      if (this.state.isKeyboardVisible) {
        return this.state.keyboardHeight;
      }
      return 30;
    }
    return 0;
  }

  getButtonText(buttonText) {
    if (buttonText) {
      if (buttonText.trim().length === 0) {
        return undefined;
      }
      return buttonText;
    }
    return undefined;
  }
  getModalState() {
    return this.state.modalVisible;
  }

  keyboardDidHide() {
    this.setState({
      keyboardHeight: 0,
      isKeyboardVisible: false,
    });
  }

  keyboardDidShow(e) {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      isKeyboardVisible: true,
    });
  }

  showToast(config: ToastConfigure) {
    this.setState({
      modalVisible: true,
      text: config.text,
      buttonText: this.getButtonText(config.buttonText),
      type: config.type,
      position: config.position ? config.position : POSITION.CENTER,
      icon: config.icon,
      buttonTextStyle: config.buttonTextStyle,
      buttonStyle: config.buttonStyle,
      onClose: config.onClose,
    });
    // If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    // Set the toast to close after the duration.
    if (config.duration !== 0) {
      const duration = config.duration > 0 ? config.duration : 1500;
      this.closeTimeout = setTimeout(this.closeToast, duration);
    }
    // Fade the toast in now.
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
    const { onClose } = this.state;
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  closeToast = () => {
    clearTimeout(this.closeTimeout);
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(this.closeModal);
  };

  render() {
    if (this.state.modalVisible) {
      return (
        <View
          style={{
            position: "absolute",
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            justifyContent:
              this.state.position == POSITION.CENTER ? "center" : undefined,
            alignItems:
              this.state.position == POSITION.CENTER ? "center" : undefined,
          }}
        >
          <Animated.View style={this.getToastStyle()}>
            <View
              style={{
                backgroundColor: "rgba(26, 26, 26, 0.4)",
                borderRadius: 8,
                paddingVertical: 16,
                paddingHorizontal: 24,
                alignSelf: "center",
                alignItems: "center",
                maxWidth: "70%",
              }}
            >
              {this.state.icon && (
                <View style={{ marginBottom: 8 }}>{this.state.icon}</View>
              )}
              <Typography color="#fff" preset="body" align="center">
                {this.state.text}
              </Typography>
              {this.state.buttonText && (
                <EButton
                  style={{ marginTop: 16, ...this.state.buttonStyle }}
                  onPress={() => {
                    this.closeToast();
                  }}
                  text={this.state.buttonText}
                  textStyle={{ ...this.state.buttonTextStyle }}
                />
              )}
            </View>
          </Animated.View>
        </View>
      );
    }
    return null;
  }
}
