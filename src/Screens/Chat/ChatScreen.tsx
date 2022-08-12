import React, { useState, useEffect, useCallback, useMemo } from "react";

import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { Navigation } from "@/utils/Navigation";
import { colors } from "@/styles/theme";
import "dayjs/locale/vi";
import { Platform } from "react-native";
import { observer } from "mobx-react";
import { userStore } from "@/store/userStore";
import { CustomHeader } from "./components/CustomHeader";
import moment from "moment";
import { GiftChat } from "./components/GiftChat";
import { EScreen } from "@/components/Screen/EScreen";
import { foodOrderApi } from "@/api/foodOrder.api";
import { NotificationType } from "@/types/notification";
import { foodOrderStore } from "@/store/foodOrderStore";
import { Alert } from "@/components/Alert/Alert";
import { OrderFoodStatus } from "@/types/food-order";
import { NotificationService } from "@/plugins/notificationService";
import { v4 as uuidV4 } from "uuid";
import { chatStore } from "@/store/chatStore";

export const ChatScreen = observer(({ route }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [avatar, setAvatar] = useState(route.params?.avatar);
  const [name, setName] = useState(route.params?.name);

  console.log("params ne", route.params);

  const goBack = () => {
    Navigation.goBack();
  };

  const lang = useMemo(() => {
    return "vi";
  }, [userStore.info]);

  const getMessageByLang = (data) => {
    let msg;
    switch (lang) {
      case "vi":
        msg = data.message;
        break;
      case "ko":
        msg = data.messageKo;
        break;
      case "en":
        msg = data.messageEn;
        break;
      default:
        msg = data.message;
        break;
    }
    console.log("message", msg, "lang", lang);
    return msg;
  };

  const fetchChatOrder = () => {
    foodOrderApi.findAllChat(foodOrderStore.selected.id).then((res) => {
      const { messages } = res.data;
      let message;
      const data: IMessage[] = messages.map((e) => {
        const _id = e.driver ? e.driver.id : e.customer.id;

        message = getMessageByLang(e);
        return {
          _id: e.customId,
          text: message,
          createdAt: new Date(e.createdAt * 1000),
          user: {
            _id,
            name: "Admin",
            avatar: avatar,
          },
        };
      });
      data.unshift(chatStore.quickReplySample);
      setMessages(data.reverse());
    });
  };

  useEffect(() => {
    fetchChatOrder();
    if (Platform.OS === "android") {
      // AndroidKeyboardAdjust.setAdjustResize();
    }
    const notifyService = new NotificationService();
    notifyService.onNotification(handleNotification);
    notifyService.onNotificationClick(handleNotification);

    notifyService.onNotificationBackground(handleNotification);
    return () => {
      if (Platform.OS === "android") {
        // AndroidKeyboardAdjust.setAdjustPan();
      }
      notifyService.unSubscribe();
    };
  }, []);

  const handleNotification = (data) => {
    console.log("handleNotification chat food", data?.chat);

    if (data?.type == NotificationType.Chat) {
      fetchChatOrder();
    }
  };

  const onSend = useCallback((messages = []) => {
    console.log("messages", messages);

    if (
      foodOrderStore.selected.status != OrderFoodStatus.AcceptOrder &&
      foodOrderStore.selected.status != OrderFoodStatus.Delivering
    ) {
      return Alert.alert({
        title: "Thông báo",
        message: "Bạn không thể nhắn tin, vì đơn hàng đã kết thúc",
      });
    }
    const message = messages[0].text;
    const customId = uuidV4();
    foodOrderApi.chat(foodOrderStore.selected.id, {
      message,
      customId,
    });
    handleSetMessage(message, customId);
  }, []);

  const onReceive = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      const qReply = previousMessages.find((e) => e._id == -1);
      const indexQReply = previousMessages.indexOf(qReply);
      previousMessages.splice(indexQReply, 1);
      // messages.push(chatStore.quickReplySample);
      return GiftedChat.prepend(previousMessages, messages);
    });
  }, []);

  const handlePressText = useCallback(async ({ message }) => {
    const customId = uuidV4();
    foodOrderApi.chat(foodOrderStore.selected.id, {
      message,
      customId,
    });
    handleSetMessage(message, customId);
  }, []);

  const handleSetMessage = (message: string, customId: string) => {
    const data = {
      _id: uuidV4(),
      createdAt: new Date(),
      text: message,
      user: { _id: userStore.info.id },
    };
    const messages = [data];
    setMessages((previousMessages) => {
      console.log("previousMessages", previousMessages);
      const qReply = previousMessages.find((e) => e._id == -1);
      const indexQReply = previousMessages.indexOf(qReply);
      previousMessages.splice(indexQReply, 1);
      messages.push(chatStore.quickReplySample);

      return GiftedChat.prepend(previousMessages, messages);
    });
  };

  return (
    <EScreen
      style={{ flexGrow: 1, paddingTop: 16 }}
      showHeaderTool
      edges={["bottom"]}
      showRight={false}
      componentLeft={
        <CustomHeader avatar={avatar} name={name} onBack={goBack} />
      }
    >
      <GiftChat
        onPressText={handlePressText}
        onSend={onSend}
        messages={messages}
        userId={userStore.info.id}
      />
    </EScreen>
  );
});
