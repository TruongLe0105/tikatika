import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  Platform,
  Animated,
  Keyboard,
  StyleSheet,
  TextStyle,
  ViewStyle,
  NativeSyntheticEvent,
  TargetedEvent,
} from "react-native";
import Moment from "moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Appearance } from "react-native-appearance";
import { CalendarSvg } from "@/assets/svg/CalendarSvg";
import Typography from "../Text/Typography";
import { colors } from "@/styles/theme";
import { RowView } from "../View/RowView";

enum FORMATS {
  date = "YYYY-MM-DD",
  datetime = "YYYY-MM-DD HH:mm",
  time = "HH:mm",
}

const colorScheme = Appearance.getColorScheme();
let bgColor, textCancelColor;
if (colorScheme === "dark") {
  bgColor = "#000";
  textCancelColor = "#fff";
} else {
  bgColor = "#fff";
  textCancelColor = "#666";
}

interface DatePickerProps {
  date?: string | object | Date;
  format?: string;
  minDate?: string | Date;
  maxDate?: string | Date;
  height?: number;
  duration?: number;
  disabled?: boolean;
  onDateChange?: Function;
  getDateStr?: Function;
  minuteInterval?: 5 | 1 | 20 | 2 | 4 | 6 | 3 | 10 | 12 | 15 | 30;
  mode?: "date" | "time";
  placeholder?: string;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;

  label?: string;
  errorMessage?: string;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  showRequire?: boolean;
  componentRight?: React.ReactNode;
  componentLeft?: React.ReactNode;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

interface DatePickerState {
  date: any;
  modalVisible: boolean;
  animatedHeight: Animated.Value;
  allowPointerEvents: boolean;
}

export class EDatePicker extends Component<DatePickerProps, DatePickerState> {
  static defaultProps = {
    date: "",
    height: 259,
    mode: "date",
    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    placeholder: "--/--/----",
    // whether or not show the icon
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.setState({ date: this.getDate(this.props.date) });
    }
  }

  setModalVisible = (visible) => {
    const { height, duration } = this.props;

    // slide animation
    if (visible) {
      this.setState({ modalVisible: visible });
      return Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      return Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  };

  onPressMask = () => {
    this.onPressCancel();
  };

  onPressCancel = () => {
    this.setModalVisible(false);
  };

  onPressConfirm = () => {
    this.datePicked();
    this.setModalVisible(false);
  };

  getDate = (date = this.props.date) => {
    const { minDate, maxDate, format = FORMATS["date"] } = this.props;

    // date默认值
    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = this.getDate(minDate);

        if (now < _minDate) {
          return _minDate;
        }
      }

      if (maxDate) {
        let _maxDate = this.getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return Moment(date, format).toDate();
  };

  getDateStr = (date = this.props.date) => {
    const { format = FORMATS["date"] } = this.props;

    const dateInstance = date instanceof Date ? date : this.getDate(date);

    if (typeof this.props.getDateStr === "function") {
      return this.props.getDateStr(dateInstance);
    }

    return Moment(dateInstance).format(format);
  };

  datePicked = () => {
    if (typeof this.props.onDateChange === "function") {
      this.props.onDateChange(
        this.getDateStr(this.state.date),
        this.state.date
      );
    }
  };

  onDateChange = (event, selectedDate) => {
    this.setState({
      allowPointerEvents: false,
      date: selectedDate,
    });

    const timeoutId = setTimeout(() => {
      this.setState({
        allowPointerEvents: true,
      });
      clearTimeout(timeoutId);
    }, 200);
  };

  onDateChangeAndroid = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      this.setState({
        date: selectedDate,
        modalVisible: false,
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  };

  onPressDate = () => {
    if (this.props.disabled) {
      return true;
    }

    Keyboard.dismiss();

    // reset state
    this.setState({
      date: this.getDate(),
    });

    this.setModalVisible(true);
  };

  render() {
    const {
      componentLeft,
      componentRight,
      minDate,
      maxDate,
      minuteInterval,
      containerStyle,
      label,
      labelStyle,
      showRequire,
      errorMessage,
      errorStyle,
      inputStyle,
      onBlur,
    } = this.props;

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
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={this.onPressDate}
          onBlur={onBlur}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: this.props.disabled ? colors.borderBase : "#fff",
            borderWidth: this.props.disabled ? 0 : 1,
            borderColor: errorMessage ? colors.error : colors.background,
            borderRadius: 8,
            paddingVertical: Platform.OS === "ios" ? 8 : 0,
            paddingHorizontal: 8,
            height: 36,
            ...inputStyle,
          }}
        >
          <>
            {componentLeft}
            <Typography
              preset="smallLabel"
              color={
                !this.props.date ? colors.secondaryText : colors.primaryText
              }
              style={{
                flex: 1,
                marginLeft: componentLeft && 10,
                marginRight: componentRight && 10,
              }}
              lineHeight={Platform.OS === "ios" ? 0 : null}
              numberOfLines={1}
            >
              {!this.props.date ? this.props.placeholder : this.getDateStr()}
            </Typography>
            {componentRight || <CalendarSvg size={20} />}

            {Platform.OS === "ios" && (
              <Modal
                transparent={true}
                animationType="none"
                visible={this.state.modalVisible}
                supportedOrientations={["portrait"]}
                onRequestClose={() => {
                  this.setModalVisible(false);
                }}
              >
                <View style={{ flex: 1 }}>
                  <TouchableHighlight
                    style={Style.datePickerMask}
                    activeOpacity={1}
                    underlayColor={"#00000077"}
                    onPress={this.onPressMask}
                  >
                    <TouchableHighlight
                      underlayColor={"#fff"}
                      style={{ flex: 1 }}
                    >
                      <Animated.View
                        style={[
                          {
                            backgroundColor: bgColor,
                            height: 0,
                            overflow: "hidden",
                          },
                          { height: this.state.animatedHeight },
                        ]}
                      >
                        <View
                          pointerEvents={
                            this.state.allowPointerEvents ? "auto" : "none"
                          }
                        >
                          <RNDateTimePicker
                            display="spinner"
                            mode={this.props.mode}
                            minimumDate={minDate && this.getDate(minDate)}
                            maximumDate={maxDate && this.getDate(maxDate)}
                            onChange={this.onDateChange}
                            minuteInterval={minuteInterval}
                            style={{
                              marginTop: 42,
                              borderTopColor: "#ccc",
                              borderTopWidth: 1,
                            }}
                            locale={"vi"}
                            value={this.state.date}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: 42,
                            width: "100%",
                            paddingHorizontal: 20,
                            position: "absolute",
                            top: 0,
                          }}
                        >
                          <TouchableHighlight
                            underlayColor={"transparent"}
                            onPress={this.onPressCancel}
                          >
                            <Typography family="medium" color={textCancelColor}>
                              Huỷ
                            </Typography>
                          </TouchableHighlight>
                          <TouchableHighlight
                            underlayColor={"transparent"}
                            onPress={this.onPressConfirm}
                          >
                            <Typography family="bold" colorPreset="primary">
                              Đồng ý
                            </Typography>
                          </TouchableHighlight>
                        </View>
                      </Animated.View>
                    </TouchableHighlight>
                  </TouchableHighlight>
                </View>
              </Modal>
            )}

            {Platform.OS === "android" && this.state.modalVisible && (
              <RNDateTimePicker
                mode={this.props.mode}
                minimumDate={minDate && this.getDate(minDate)}
                maximumDate={maxDate && this.getDate(maxDate)}
                onChange={this.onDateChangeAndroid}
                minuteInterval={minuteInterval}
                display={"spinner"}
                style={{
                  marginTop: 42,
                  borderTopColor: "#ccc",
                  borderTopWidth: 1,
                }}
                is24Hour
                locale={"vi"}
                value={this.state.date}
              />
            )}
          </>
        </TouchableHighlight>
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
}

const Style = StyleSheet.create({
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerMask: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#00000077",
  },
});
