/**
 * Mh ds coupon
 * @param {Function} onSelect // get từ route
 * @param {Promotion} promotion // get từ route, promotion đã chọn
 */

import { couponApi } from "@/api/coupon.api";
import { CouponSvg } from "@/assets/svg/CouponSvg";
import { EButton } from "@/components/Button/EButton";
import { EScreen } from "@/components/Screen/EScreen";
import { NoResultView } from "@/components/View/NoResultView";
import { alignJustify, colors } from "@/styles/theme";
import { Promotion } from "@/types/promotion";
import { debounce, isEqual } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CouponDetailModal } from "./components/CouponDetailModal";
import { CouponHeader } from "./components/CouponHeader";
import { CouponInputSearch } from "./components/CouponInputSearch";
import { CouponItem } from "./components/CouponItem";

export const CouponScreen = ({ route }) => {
  const status: "view" | "use" = route.params?.status;
  const storeId = route.params?.storeId;
  const promotion = route.params?.promotion;
  const onSelect: (promotion: Promotion) => void = route.params?.onSelect;
  const [search, setSearch] = useState("");
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] =
    useState<Promotion>(promotion);
  const [disableButton, setDisableButton] = useState(false);
  const couponDetailRef = useRef(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePressCoupon = (promotion: Promotion) => {
    if (status == "view") {
      couponDetailRef.current.handleOpen(promotion, route.params?.promotion);
      return;
    }
    // couponDetailRef.current.handleOpen(promotion, route.params?.promotion);
    // if (isEqual(selectedPromotion?.id, promotion.id)) {
    //   setSelectedPromotion(null);
    // } else {
    setSelectedPromotion(promotion);
    // }
  };

  const handleSelect = (item: Promotion) => {
    setDisableButton(true);
    onSelect?.(!isEqual(selectedPromotion?.id, promotion?.id) && item);
  };

  const fetchData = async (search = "") => {
    const res = await couponApi.findAll({ search, storeId });
    setPromotions(res.data.coupons);
    setIsFetched(true);
  };

  const onSearch = debounce(fetchData, 1000);

  const handleSearch = (val: string) => {
    setSearch(val);
    // onSearch(val);
  };

  return (
    <>
      <EScreen
        headerTitle="Coupon"
        showHeaderTool
        edges={["bottom"]}
        style={{ flexGrow: 1 }}
      >
        <View style={{ paddingHorizontal: 16 }}>
          {/* input để search mã coupon */}
          <CouponInputSearch
            onSearch={handleSearch}
            search={search}
            onFinishSearch={fetchData}
          />
        </View>

        {isFetched ? (
          <FlatList
            style={{ marginTop: 16 }}
            data={promotions}
            renderItem={({ item }) => (
              <CouponItem
                onPress={handlePressCoupon}
                promotion={item}
                isSelected={isEqual(item.id, selectedPromotion?.id)}
              />
            )}
            contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1 }}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            ListEmptyComponent={
              <View style={{ ...alignJustify(), flex: 1 }}>
                <NoResultView
                  icon={<CouponSvg color={colors.primary} size={48} />}
                  title={"Mã coupon không tồn tại"}
                />
              </View>
            }
          />
        ) : (
          <View style={{ ...StyleSheet.absoluteFillObject, ...alignJustify() }}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        )}

        {selectedPromotion?.id && (
          <View style={{ paddingHorizontal: 16 }}>
            <EButton
              text={
                isEqual(selectedPromotion?.id, promotion?.id)
                  ? "Không sử dụng"
                  : "Áp dụng coupon này"
              }
              onPress={() => handleSelect(selectedPromotion)}
              border={isEqual(selectedPromotion?.id, promotion?.id)}
              style={{ marginBottom: 16 }}
              color={[
                isEqual(selectedPromotion?.id, promotion?.id)
                  ? colors.error
                  : colors.primary,
              ]}
              disabled={disableButton}
            />
          </View>
        )}
      </EScreen>
      <CouponDetailModal onSelect={handleSelect} ref={couponDetailRef} />
    </>
  );
};
