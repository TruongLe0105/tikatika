import Typography from "@/components/Text/Typography";
import { I18n } from "@/plugins/i18n";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CustomAvatar } from "./CustomAvatar";
import { CustomBubble } from "./CustomBubble";
import { CustomComposer } from "./CustomComposer";
import { CustomInput } from "./CustomInput";
import { CustomMessageText } from "./CustomMessageText";
import { CustomQuickReply } from "./CustomQuickReply";
// import { CustomQuickReply } from "./CustomQuickReply";
import { CustomSend } from "./CustomSend";

export const GiftChat = ({ messages, onSend, userId, onPressText }) => {
  const chatRef = useRef<GiftedChat>(null);
  const [visibleQuickReply, setVisibleQuickReply] = useState(false);

  const handlePressHeaderQuickChat = useCallback(() => {
    setTimeout(() => {
      chatRef.current.scrollToBottom(true);
    }, 500);
  }, []);

  const handlePressQuickText = (text) => {
    onPressText(text);
    setVisibleQuickReply(false);
  };

  return (
    <GiftedChat
      ref={chatRef}
      messages={messages}
      onSend={onSend}
      user={{
        _id: userId,
      }}
      locale={"vi"}
      inverted={false}
      scrollToBottom={true}
      renderSend={CustomSend}
      renderInputToolbar={CustomInput}
      renderComposer={CustomComposer}
      renderAvatar={CustomAvatar}
      renderMessageText={CustomMessageText}
      renderBubble={CustomBubble}
      renderDay={() => null}
      showAvatarForEveryMessage
      renderQuickReplies={(props) =>
        visibleQuickReply && (
          <CustomQuickReply
            onPressHeader={handlePressHeaderQuickChat}
            onPressText={handlePressQuickText}
          />
        )
      }
      renderActions={() => (
        <Typography
          color={"#2196F3"}
          family="bold"
          size={12}
          onPress={() => {
            console.log("Chat nhanh", visibleQuickReply);

            setVisibleQuickReply(!visibleQuickReply);
            handlePressHeaderQuickChat();
          }}
          style={{
            position: "relative",
            borderWidth: 1,
            borderColor: "#2196F3",
            paddingHorizontal: 4,
            borderRadius: 8,
          }}
        >
          Chat nhanh
        </Typography>
      )}
      isLoadingEarlier
      minInputToolbarHeight={60}
      renderAvatarOnTop
      alwaysShowSend
      placeholder={"Nhập nội dung tin nhắn"}
      alignTop
      bottomOffset={isIphoneX() ? 30 : 0}
      minComposerHeight={28}
      maxComposerHeight={120}
      messagesContainerStyle={{ paddingHorizontal: 15 }}
      timeFormat={"HH:mm DD/MM/YYYY"}
      // renderAccessory={(props) => (
      //   <CustomQuickReply onPressText={onPressText} />
      // )}
    />
  );
};

const styles = StyleSheet.create({});
