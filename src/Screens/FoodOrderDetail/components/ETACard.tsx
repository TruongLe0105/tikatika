/**
 * Hiển thị trạng thái, và thời gian dự kiến giao hàng
 * @param {string} status
 * @param {number} receivedAt // nhận đơn lúc
 * @param {number} processedAt // chế biến lúc
 * @param {number} deliveringAt // đi giao lúc
 * @param {number} completedAt // nhận đơn lúc
 */

import { ArrowLeftSvg } from "@/assets/svg/ArrowLeftSvg";
import { TimeSvg } from "@/assets/svg/TimeSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { FoodOrderStatusBadge } from "@/Screens/FoodOrderHistory/components/FoodOrderStatusBadge";
import { boxShadow, colors } from "@/styles/theme";
import { OrderFoodStatus, OrderFoodStatusTrans } from "@/types/food-order";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ETAItem } from "./ETAItem";
import Collapsible from "react-native-collapsible";
import { secondsToHms } from "@/utils/helper";

type ETACardProps = {
  status: OrderFoodStatus;
  acceptedAt: number; //time nhận đơn
  cookAt: number; //thời gian  bắt đầu chế biến
  deliveringAt: number; //Thời gian bắn đầu đi giao
  completedAt: number; //Thời gian hoàn thành,
  duration: number; //minutes,
  isCooked: boolean;
  storeAcceptAt: number;
};

export const ETACard = React.memo((props: ETACardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isCollapsed) {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      spinValue.setValue(1);
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    // spinValue.
  }, [isCollapsed]);

  const rotateVal = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["-90deg", "90deg"],
  });

  const isCancel = React.useMemo(
    () =>
      props.status == OrderFoodStatus.DriverCancel ||
      props.status == OrderFoodStatus.AdminCancel ||
      props.status == OrderFoodStatus.CustomerCancel,
    [props.status]
  );

  useEffect(() => {
    if (isCancel) {
      setIsCollapsed(true);
    }
  }, [isCancel]);

  return (
    <View
      style={{
        ...boxShadow("rgba(0,0,0,0.08)", 0, 2, 4),
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setIsCollapsed(!isCollapsed);
        }}
        disabled={isCancel}
      >
        <Typography
          family="medium"
          color="#5B5B5B"
          size={12}
          style={{ lineHeight: 12 }}
        >
          {isCancel || props.status == OrderFoodStatus.Complete
            ? "Trạng thái đơn"
            : "Dự kiến giao sau"}
        </Typography>
        {!isCancel && (
          <RowView justifyContent="space-between" style={{ marginTop: 8 }}>
            {props.status != OrderFoodStatus.Complete && (
              <RowView style={{ alignItems: "center" }}>
                <View style={{}}>
                  <TimeSvg />
                </View>
                <Typography
                  style={{
                    alignSelf: "center",
                    marginLeft: 8,
                  }}
                  size={18}
                  lineHeight={22}
                  color={colors.primary}
                  family="bold"
                >
                  {secondsToHms(props.duration * 60)}
                </Typography>
              </RowView>
            )}

            <RowView
              justifyContent={
                props.status == OrderFoodStatus.Complete
                  ? "space-between"
                  : "flex-end"
              }
              style={{ flex: 1 }}
            >
              <FoodOrderStatusBadge status={props.status} />
              <Animated.View
                style={{ transform: [{ rotate: rotateVal }], marginLeft: 12 }}
              >
                <ArrowLeftSvg borderColor="#9FA0A0" />
              </Animated.View>
            </RowView>
          </RowView>
        )}

        {isCancel && (
          <Typography
            color={colors.error}
            size={18}
            lineHeight={22}
            family="bold"
          >
            {OrderFoodStatusTrans[props.status]}
          </Typography>
        )}
      </TouchableOpacity>
      <Collapsible style={{ marginTop: 20 }} collapsed={isCollapsed}>
        <View style={{ height: 165 }}>
          <ETAItem
            isSelected={false}
            time={props.storeAcceptAt}
            status={OrderFoodStatus.Waiting}
            currentStatus={props.status}
            label="Cửa hàng xác nhận"
          />
          <View style={{ marginTop: 12 }}>
            <ETAItem
              isSelected={false}
              time={props.acceptedAt}
              status={OrderFoodStatus.AcceptOrder}
              currentStatus={props.status}
              label="Nhận đơn"
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <ETAItem
              isSelected={props.status == OrderFoodStatus.Delivering}
              time={props.deliveringAt}
              status={OrderFoodStatus.Delivering}
              currentStatus={props.status}
              label="Đang giao"
            />
          </View>
          <View style={{ marginTop: 12 }}>
            <ETAItem
              isSelected={props.status == OrderFoodStatus.Complete}
              time={props.completedAt}
              visibleLine={false}
              status={OrderFoodStatus.Complete}
              currentStatus={props.status}
              label="Hoàn tất"
            />
          </View>
        </View>
      </Collapsible>
    </View>
  );
});
