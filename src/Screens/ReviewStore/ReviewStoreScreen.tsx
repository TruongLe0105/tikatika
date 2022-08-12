import { storeRateApi } from "@/api/storeRate.api";
import { StarSvg } from "@/assets/svg/StarSvg";
import { Alert } from "@/components/Alert/Alert";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import appStore from "@/store/appStore";
import { foodOrderStore } from "@/store/foodOrderStore";
import { appStyle, colors } from "@/styles/theme";
import { ScreenName } from "@/utils/enum";
import { formatNumber } from "@/utils/helper";
import { Navigation } from "@/utils/Navigation";
import { isEmpty } from "lodash";
import { observer } from "mobx-react-lite";
import moment from "moment";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  FlatList,
} from "react-native";
import { ReviewItem } from "../ShopDetail/components/ReviewItem";
import { RateFilterItem } from "./components/RateFilterItem";

export interface RateFilterData {
  label: string;
  count: number;
  value: number;
}

export const ReviewStoreScreen = observer(() => {
  const [filterData, setFilterData] = useState<RateFilterData[]>([
    {
      label: "Tất cả",
      count: 0,
      value: -1,
    },
    {
      label: `5 sao`,
      count: 0,
      value: 5,
    },
    {
      label: `4 sao`,
      count: 0,
      value: 4,
    },
    {
      label: `3 sao`,
      count: 0,
      value: 3,
    },
    {
      label: `2 sao`,
      count: 0,
      value: 2,
    },
    {
      label: `1 sao`,
      count: 0,
      value: 1,
    },
  ]);
  const [selectedFilter, setSelectedData] = useState<RateFilterData>(
    filterData[0]
  );
  const [list, setList] = useState([]);
  const listQuery = useRef({
    page: 1,
    limit: 10,
    storeId: foodOrderStore.selectedShop.id,
    star: undefined,
  });
  const total = useRef(0);
  const isFetching = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchStar();
  }, []);

  const fetchStar = async () => {
    const res = await storeRateApi.summary(foodOrderStore.selectedShop.id);
    for (const filter of filterData) {
      if (filter.value > -1) {
        const find = res.data.find((e) => e.star == filter.value);
        console.log("filter", filter, find);
        filter.count = find ? find.total : 0;
      }
    }
    console.log("after set", filterData);

    setFilterData((prev) => [...filterData]);
  };

  useEffect(() => {
    fetchList(
      selectedFilter.value > -1 ? selectedFilter.value : undefined
    ).then(() => {
      setFilterData((prev) => {
        if (!prev[0].count) {
          prev[0].count = total.current;
        }
        return [...prev];
      });
    });
  }, [selectedFilter]);

  const storeRate = useMemo(() => {
    if (isEmpty(foodOrderStore.selectedShop)) {
      return formatNumber(0, 1);
    }
    if (
      !foodOrderStore.selectedShop.totalRate ||
      !foodOrderStore.selectedShop.totalStar
    ) {
      return formatNumber(0, 1);
    }

    return formatNumber(
      foodOrderStore.selectedShop.totalStar /
        foodOrderStore.selectedShop.totalRate,
      1
    );
  }, [foodOrderStore.selectedShop]);

  const fetchList = async (star) => {
    try {
      setIsRefreshing(true);
      isFetching.current = true;
      listQuery.current.star = star;
      listQuery.current.page = 1;
      console.log("listQuery.current:", listQuery.current);
      console.log("appStore", appStore.token);
      const res = await storeRateApi.findAll(listQuery.current);
      console.log("res.data.total:", res.data.total);
      total.current = res.data.total;
      setList(res.data.storeRates);
    } finally {
      isFetching.current = false;
      setIsRefreshing(false);
    }
  };

  const loadMore = async () => {
    try {
      if (!isFetching.current && list.length != total.current) {
        listQuery.current.page++;
        isFetching.current = true;
        const res = await storeRateApi.findAll(listQuery.current);
        setList([...list, ...res.data.storeRates]);
        total.current = res.data.total;
      }
    } finally {
      isFetching.current = false;
    }
  };

  const handleReport = (review) => {
    const current = moment();
    Navigation.navigate(ScreenName.ReportReview, {
      review,
      onDone: () => {
        Alert.alert({
          title: "Gửi báo cáo thành công",
          message: `Vào ngày ${current.format(
            "DD/MM/YYYY"
          )} thời gian ${current.format(
            "HH:mm"
          )} bạn đã tố cáo thành công tài khoản ${
            review?.customer?.name
          }. Hệ thống sẽ xác nhận lại.`,
        });
        requestAnimationFrame(() => {
          Navigation.goBack();
        });
      },
    });
  };

  const renderEmptyList = useCallback(() => {
    return (
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={{ width: 40, aspectRatio: 1 }}>
          <Image
            style={appStyle.image}
            source={require("@/assets/images/rating.png")}
          />
        </View>
        <Typography family="bold" size={16}>
          Chưa có đánh giá nào!
        </Typography>
      </View>
    );
  }, []);

  return (
    <EScreen
      showHeaderTool
      headerTitle={"Xem đánh giá và bình luận"}
      style={{ flex: 1 }}
    >
      <RowView style={{ padding: 16 }}>
        <View style={{ width: 80, alignItems: "center" }}>
          <StarSvg
            size={40}
            starColor={colors.primary}
            strokeColor={colors.primary}
          />
          <Typography family="medium" size={20}>
            {storeRate}
          </Typography>
        </View>
        <RowView
          style={{
            flexWrap: "wrap",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {filterData.map((item) => (
            <RateFilterItem
              key={item.label}
              onPress={setSelectedData}
              data={item}
              isSelected={selectedFilter.value == item.value}
            />
          ))}
        </RowView>
      </RowView>

      <FlatList
        ListEmptyComponent={renderEmptyList}
        data={list}
        renderItem={({ item }) => (
          <ReviewItem review={item} onReport={handleReport} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        onEndReached={loadMore}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: colors.background,
              marginVertical: 16,
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchList(listQuery.current.star)}
          />
        }
      />
    </EScreen>
  );
});
