/**
 * Mh ds thông báo
 *
 */

import { customerNotificationApi } from "@/api/customerNotification.api";
import { newsApi } from "@/api/news.api";
import { ReadAllSvg } from "@/assets/svg/ReadAllSvg";
import { RightMenuNotificationSvg } from "@/assets/svg/RightMenuNotificationSvg";
import { Loading } from "@/components/Loading/Loading";
import { EScreen } from "@/components/Screen/EScreen";
import { NoResultView } from "@/components/View/NoResultView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { notificationStore } from "@/store/notificationStore";
import { alignJustify } from "@/styles/theme";
import { NotificationType, Notification } from "@/types/notification";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotificationItem } from "./components/NotificationItem";

export const NotificationScreen = observer(() => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    notificationStore.refreshList();
  }, []);

  const handleSeenAll = async () => {
    try {
      Loading.load();
      const res = await customerNotificationApi.seenAll();
      notificationStore.refreshList();
      notificationStore.getTotalUnseen();
    } finally {
      Loading.hide();
    }
  };

  const handlePress = useCallback(
    async (data) => {
      try {
        Loading.load();
        if (!data.isSeen) {
          data.isSeen = true;
          await customerNotificationApi.seen(data.id);
          notificationStore.getTotalUnseen();
        }

        setNotifications([...notifications]);
        switch (data?.type) {
          case NotificationType.Order:
            foodOrderStore.selected = data.order;
            await foodOrderStore.fetchSelected();
            Navigation.navigate(ScreenName.FoodOrderDetail);
            break;

          case NotificationType.News:
            const res = await newsApi.findOne(data.customerNews.id);
            Navigation.navigate(ScreenName.NewsDetail, { news: res.data });
            break;

          case NotificationType.AddPoint:
          case NotificationType.MinusPoint:
            Navigation.navigate(ScreenName.MyPoint);
            break;
          default:
            break;
        }
      } finally {
        setTimeout(() => {
          Loading.hide();
        }, 100);
      }
    },
    [notifications]
  );

  return (
    <EScreen
      headerTitle="Thông báo"
      showHeaderTool
      componentRight={
        <Pressable
          hitSlop={50}
          onPress={handleSeenAll}
          style={{ flex: 1, alignItems: "flex-end" }}
        >
          <ReadAllSvg />
        </Pressable>
      }
      edges={["bottom"]}
      style={{ flex: 1 }}
    >
      {/* ds notification */}
      <FlatList
        data={notificationStore.list.slice()}
        renderItem={({ item }) => (
          <NotificationItem onPress={handlePress} notification={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        ListEmptyComponent={
          <View style={{ ...alignJustify(), flex: 1 }}>
            <NoResultView
              icon={<RightMenuNotificationSvg size={48} />}
              title="Không có thông báo nào mới"
              content={"Vui lòng quay lại sau."}
            />
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        refreshControl={
          <RefreshControl
            refreshing={notificationStore.isRefresh}
            onRefresh={notificationStore.refreshList}
          />
        }
        onEndReached={notificationStore.fetchMoreList}
        onEndReachedThreshold={0.5}
      />
    </EScreen>
  );
});
