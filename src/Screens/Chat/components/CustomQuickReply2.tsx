import Typography from "@/components/Text/Typography";
import { getLocal } from "@/plugins/i18n";
import { userStore } from "@/store/userStore";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, colors } from "@/styles/theme";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";

export const quickTextVi = [
  "Chào bạn, tôi vừa đặt chuyến xe",
  "Khi nào bạn tới nơi?",
  "Bạn chờ tôi một lát nhé",
  "Tôi đang trên đường ra địa điểm hẹn",
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

type CustomQuickReply = {
  onPressText: ({ message, messageEn, messageKo, mainMessage }) => void;
};

export const CustomQuickReply2 = observer(({ onPressText }) => {
  const [quickText, setQuickText] = useState([]);

  const lang = useMemo(() => {
    return "vi";
  }, [userStore.info]);

  const getQuickTextByLang = (quickText) => {
    let message;
    let index;
    let textEn;
    let textKo;
    let mainMessage;
    switch (lang) {
      case "vi":
        index = quickTextVi.indexOf(quickText);
        textEn = quickTextEn[index];
        textKo = quickTextKo[index];
        message = quickTextVi[index];
        mainMessage = message;
        break;
      case "en":
        index = quickTextEn.indexOf(quickText);
        message = quickTextVi[index];
        textEn = quickText;
        textKo = quickTextKo[index];
        mainMessage = textEn;
        break;
      case "ko":
        index = quickTextKo.indexOf(quickText);
        message = quickTextVi[index];
        textEn = quickTextEn[index];
        textKo = quickText;
        mainMessage = textKo;
        break;
      default:
        break;
    }
    console.log("textEn", textEn, "textKo", textKo);
    return {
      message,
      messageEn: textEn,
      messageKo: textKo,
      mainMessage,
    };
  };

  const handlePressText = (text) => {
    const messages = getQuickTextByLang(text);
    console.log("handlePressText quick", text, lang);

    onPressText(messages);
  };

  useEffect(() => {
    (async () => {
      const locale = await getLocal();
      switch (locale) {
        case "vi":
          setQuickText(quickTextVi);
          break;

        case "en":
          setQuickText(quickTextEn);
          break;
        case "ko":
          setQuickText(quickTextKo);
          break;
      }
    })();
  }, []);

  return (
    <FlatList
      data={quickText}
      renderItem={({ item }) => (
        <QuickReply data={item} onPress={handlePressText} />
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ width: "100%" }}
    />
  );
});

const QuickReply = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(data)}
      activeOpacity={0.9}
      style={{
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: "flex-start",
      }}
    >
      <Typography>{data}</Typography>
    </TouchableOpacity>
  );
};
