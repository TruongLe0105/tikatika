import { ArrowDownSvg } from "@/assets/svg/ArrowDownSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { I18n } from "@/plugins/i18n";
import { userStore } from "@/store/userStore";
import { boxShadow, colors } from "@/styles/theme";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const quickTextVi = [
  "Chào bạn, tôi vừa đặt đơn đồ ăn",
  "Khi nào bạn tới nơi?",
  "Bạn chờ tôi một lát nhé",
  "Tôi đang ra lấy hàng",
];
export const quickTextEn = [
  "Hi, I just book a driver",
  "When will you arrive?",
  "Please wait for a minute",
  "I’m on my way to go there",
];
export const quickTextKo = [
  "안녕하세요?  방금 예약했습니다.",
  "언제쯤 도착하시겠어요?",
  "잠시만 기다려주세요",
  "예약 위치로 이동 중입니다.",
];

const maxHeightContent = 500;

export const CustomQuickReply = ({ onPressText, onPressHeader }) => {
  const animationHeight = useRef(new Animated.Value(maxHeightContent));
  const spinValue = useRef(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(true);
  const lang = useRef("vi").current;

  useEffect(() => {
    Animated.timing(animationHeight.current, {
      duration: 300,
      toValue: !isExpanded ? 0 : 1,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    Animated.timing(spinValue.current, {
      duration: 300,
      toValue: !isExpanded ? 1 : 0,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const spin = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const quickReplies = useMemo(() => {
    switch (lang) {
      case "vi":
        return quickTextVi;

      case "en":
        return quickTextEn;
        break;
      case "ko":
        return quickTextKo;
        break;
        return quickTextVi;
    }
  }, []);

  const getQuickTextByLang = (quickText) => {
    return {
      message: quickText,
    };
  };

  const maxHeight = animationHeight.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeightContent],
  });

  const handlePressText = (text) => {
    const s = getQuickTextByLang(text);
    onPressText(s);
  };

  return (
    <View
      style={[
        {
          backgroundColor: "white",
          borderRadius: 8,
          overflow: "hidden",
        },
        { ...boxShadow(colors.placeholder, 2, 2, 2) },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setIsExpanded(!isExpanded);
          onPressHeader();
        }}
      >
        <RowView
          style={[styles.textBox, !isExpanded && { borderBottomWidth: 0 }]}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            style={{ marginRight: 4, color: colors.primary }}
            family="medium"
          >
            Chat với tài xế
          </Typography>
          <Animated.View
            style={[
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <ArrowDownSvg color={colors.primary} />
          </Animated.View>
        </RowView>
      </TouchableOpacity>
      <Animated.View
        onLayout={(ev) => {
          console.log("onLayout", ev.nativeEvent);
        }}
        style={[{ maxHeight, overflow: "hidden" }]}
      >
        {quickReplies.map((e, i) => (
          // <Typography>{e.title}</Typography>
          <Typography
            onPress={() => handlePressText(e)}
            style={[
              {
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderTopColor: "white",
                borderTopWidth: 1,
                backgroundColor: colors.primary,
              },
            ]}
            color={"white"}
          >
            {e}
          </Typography>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f6f8fa",
    // borderBottomColor: colors.lightGrey,
    // borderBottomWidth: 1,
  },
});
