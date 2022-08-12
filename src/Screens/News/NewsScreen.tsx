import React, { useEffect, useState } from "react";
import {
  View,
  BackHandler,
  Linking,
  AppState,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";

import Typography from "@/components/Text/Typography";
import { notificationStore, Notification } from "@/store/notificationStore";
import { formatDateTime } from "@/utils/helper";
import { useRefreshList } from "@/hooks/useRefreshList";
import { observer } from "mobx-react";
import { PlaceholderListView } from "@/components/View/PlaceholderListView";
import { Navigation } from "@/utils/Navigation";
import { EImage } from "@/components/Image/EImage";
import { News, newsStore } from "@/store/newsStore";

import { I18n } from "@/plugins/i18n";
import { EScreen } from "@/components/Screen/EScreen";
import { colors } from "@/styles/theme";
import { ScreenName } from "@/utils/enum";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { RowView } from "@/components/View/RowView";
import { NoResultView } from "@/components/View/NoResultView";

export const NewsScreen = observer(() => {
  const onPressItem = (news) => {
    Navigation.navigate(ScreenName.NewsDetail, { news });
  };
  // const [refresh] = useRefreshList(notificationStore);

  useEffect(() => {
    newsStore.refreshList();
  }, []);

  const goBack = () => {
    Navigation.goBack();
  };

  return (
    <EScreen
      headerTitle="Tin tức"
      edges={["bottom"]}
      style={{ flex: 1 }}
      showHeaderTool
    >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={newsStore.isRefresh}
            onRefresh={newsStore.refreshList}
          />
        }
        ListEmptyComponent={<NoResultView title="Chưa có tin tức nào" />}
        onEndReached={newsStore.fetchMoreList}
        onEndReachedThreshold={0.4}
        data={newsStore.list}
        renderItem={({ item, index }) => (
          <ItemNews data={item} onPress={onPressItem} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 20,
          flexGrow: 1,
        }}
      />
    </EScreen>
  );
});

type ItemNews = {
  data: News;
  onPress: (data) => void;
};

const ItemNews = ({ data, onPress }: ItemNews) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(data)}
      style={{ marginVertical: 10 }}
    >
      <ShadowCard style={{ borderRadius: 10 }}>
        <RowView alignItems="flex-start">
          <View
            style={{
              height: 103,
              aspectRatio: 130 / 103,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              overflow: "hidden",
            }}
          >
            <EImage source={{ uri: data.thumbnail }} resizeMode={"cover"} />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Typography
              family="medium"
              size={14}
              lineHeight={21}
              numberOfLines={2}
            >
              {data.title}
            </Typography>
            <Typography size={12} lineHeight={15} style={{ marginTop: 5 }}>
              {formatDateTime(data.createdAt)}
            </Typography>
          </View>
        </RowView>
      </ShadowCard>
    </TouchableOpacity>
  );
};
