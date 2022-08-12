import { TabbarHistorySvg } from "@/assets/svg/TabbarHistorySvg";
import { EScreen } from "@/components/Screen/EScreen";
import { NoResultView } from "@/components/View/NoResultView";
import { foodOrderStore } from "@/store/foodOrderStore";
import { alignJustify, colors } from "@/styles/theme";
import { FoodOrder } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateRange from "./components/DateRange";
import { FoodOrderItem } from "./components/FoodOrderItem";
import { GetReceiptModal } from "./components/GetReceiptModal";

const DATE_FORMAT = "DD/MM/YYYY";

export const FoodOrderHistoryScreen = observer(() => {
  const [isFetched, setIsFetched] = useState(false);
  const [selectedFoodOrder, setSelectedFoodOrder] = useState<FoodOrder>(null);
  const [visibleGetReceiptModal, setVisibleGetReceiptModal] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBarStyle("dark-content");
      foodOrderStore.fetchList(false);
    }
  }, [isFocused]);

  const handleChangeDate = ({ from, to }) => {
    console.log("change date", from, to);
    foodOrderStore.query.from = from;
    foodOrderStore.query.to = to;
    foodOrderStore.fetchList();
  };

  useEffect(() => {
    foodOrderStore.fetchList(false).finally(() => setIsFetched(true));
  }, []);

  const handlePress = useCallback((order: FoodOrder) => {
    foodOrderStore.setSelected(order);
    Navigation.navigate(ScreenName.FoodOrderDetail);
  }, []);

  const handlePressReceipt = useCallback((val: FoodOrder) => {
    setSelectedFoodOrder(val);
    setVisibleGetReceiptModal(true);
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <FoodOrderItem
        onPressReceipt={handlePressReceipt}
        onPress={handlePress}
        foodOrder={item}
      />
    );
  }, []);

  return (
    <EScreen
      headerTitle="Lịch sử đơn hàng"
      showHeaderTool
      edges={["bottom"]}
      style={{ flex: 1 }}
    >
      {/* Control Chọn ngày  */}
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <DateRange
          onChange={handleChangeDate}
          fromDate={foodOrderStore.query.from}
          toDate={foodOrderStore.query.to}
          format={DATE_FORMAT}
        />
      </View>

      {/* ds đơn hàng */}
      {isFetched ? (
        <FlatList
          data={foodOrderStore.list.slice()}
          renderItem={renderItem}
          style={{}}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.4}
          onEndReached={foodOrderStore.fetchMoreList}
          ListEmptyComponent={
            <View style={{ flex: 1, ...alignJustify() }}>
              <NoResultView
                icon={<TabbarHistorySvg size={48} />}
                title={"Chưa có đơn hàng nào được đặt"}
                content={"Bạn hãy chọn món ngon ngay đi nào!"}
              />
            </View>
          }
          ListFooterComponent={
            foodOrderStore.isFetchMore && (
              <ActivityIndicator color={colors.primary} size={"large"} />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={foodOrderStore.isRefreshing}
              onRefresh={foodOrderStore.fetchList}
            />
          }
        />
      ) : (
        <View style={{ ...StyleSheet.absoluteFillObject, ...alignJustify() }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}

      {/* modal lấy hoá đơn điện tử */}
      <GetReceiptModal
        foodOrder={selectedFoodOrder}
        onClose={() => {
          setVisibleGetReceiptModal(false);
        }}
        onDone={() => {
          setVisibleGetReceiptModal(false);
        }}
        visible={visibleGetReceiptModal}
      />
    </EScreen>
  );
});
