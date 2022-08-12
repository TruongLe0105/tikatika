/**
 * Mh lịch sử tích điểm
 */

import { customerTransactionApi } from "@/api/customerTransaction.api";
import { RightMenuNotificationSvg } from "@/assets/svg/RightMenuNotificationSvg";
import { EButton } from "@/components/Button/EButton";
import { EScreen } from "@/components/Screen/EScreen";
import { NoResultView } from "@/components/View/NoResultView";
import { userStore } from "@/store/userStore";
import { alignJustify, colors } from "@/styles/theme";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateRange from "../FoodOrderHistory/components/DateRange";
import { SummaryPoint } from "./components/SummaryPoint";
import { TransactionPointItem } from "./components/TransactionPointItem";

const DATE_FORMAT = "YYYY-MM-DD";

export const MyPointScreen = () => {
  const [fromDate, setFromDate] = useState(
    moment().subtract(7, "days").format(DATE_FORMAT)
  );
  const [toDate, setToDate] = useState(moment().format(DATE_FORMAT));
  const [pointList, setPointList] = useState<TransactionPoint[]>([]);
  const listQuery = useRef({
    page: 1,
    limit: 10,
    from: null,
    to: null,
  });
  const total = useRef(0);
  const isFetching = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetchData(false);
  }, [fromDate, toDate]);

  const handleChangeDate = useCallback(({ from, to }) => {
    setFromDate(from);
    setToDate(to);
  }, []);

  const handleShare = useCallback(async () => {
    let content = "Mã giới thiệu là: " + userStore.info.code;
    const message = content.replace(/\{code\}/g, userStore.info.code);
    const result = await Share.share({
      message,
    });
  }, []);

  const fetchData = async (isRefreshing = true) => {
    try {
      listQuery.current.from = fromDate;
      listQuery.current.to = toDate;
      setIsRefreshing(isRefreshing);
      isFetching.current = true;
      listQuery.current.page = 1;
      const res = await customerTransactionApi.findAll(listQuery.current);
      total.current = res.data.total;
      setPointList(res.data.customerTransactions);
    } finally {
      isFetching.current = false;
      setIsRefreshing(false);
      setIsFetched(true);
    }
  };

  const loadMore = async () => {
    try {
      if (!isFetching.current && pointList.length != total.current) {
        listQuery.current.page++;
        isFetching.current = true;
        const res = await customerTransactionApi.findAll(listQuery.current);
        setPointList([...pointList, ...res.data.customerTransactions]);
        total.current = res.data.total;
      }
    } finally {
      isFetching.current = false;
    }
  };

  const renderHeaderList = useCallback(() => {
    if (!pointList.length) {
      return null;
    }
    return (
      <>
        {/* Tổng quan về điểm */}
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          <SummaryPoint pointIn={500} pointOut={400} totalPoint={100} />
        </View>
      </>
    );
  }, []);

  return (
    <EScreen
      headerTitle="Lịch sử tích điểm"
      showHeaderTool
      edges={["bottom"]}
      style={{ flex: 1 }}
    >
      {/* control chọn ngày */}
      <View style={{ padding: 16 }}>
        <DateRange
          onChange={handleChangeDate}
          fromDate={fromDate}
          toDate={toDate}
          format={DATE_FORMAT}
        />
      </View>

      {/* ds transaction */}
      {isFetched ? (
        <FlatList
          data={pointList}
          renderItem={({ item }) => (
            <TransactionPointItem transactionPoint={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
          ListHeaderComponent={renderHeaderList}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={{ ...alignJustify(), flex: 1 }}>
              <NoResultView
                title="Bạn chưa có điểm nào"
                content={
                  "Hãy giới thiệu cho bạn bè sử dụng app để nhận điểm bạn nhé"
                }
              />
              <EButton
                onPress={handleShare}
                text="Giới thiệu ngay"
                style={{ marginTop: 24 }}
              />
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      ) : (
        <View style={{ ...StyleSheet.absoluteFillObject, ...alignJustify() }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
    </EScreen>
  );
};
