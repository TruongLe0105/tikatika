/**
 * Modal hiển thi chi tiết của món ăn, dùng package: react-native-actions-sheet
 * @param {Function} onUpdateCart //Khi nhấn cập nhật giỏ hàng
 */

import { MoneySvg } from "@/assets/svg/MoneySvg";
import { EButton } from "@/components/Button/EButton";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { AddQuantityView } from "@/components/View/AddQuantityView";
import { RowView } from "@/components/View/RowView";
import { border } from "@/styles/border";
import { colors } from "@/styles/theme";
import { Food } from "@/types/food-order";
import { formatNumber } from "@/utils/helper";
import { isEqual } from "lodash";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

type FoodDetailModalProps = {
  onUpdateCart: (food: Food, quantity: number) => void;
};

export const FoodDetailModal = React.memo(
  React.forwardRef((props: FoodDetailModalProps, ref) => {
    const [visible, setVisible] = useState(false);
    const [food, setFood] = useState<Food>(null);
    const actionSheetRef = useRef<RBSheet>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
      if (visible) {
        actionSheetRef.current?.open();
      } else {
        actionSheetRef.current?.close();
      }
    }, [visible]);

    useImperativeHandle(
      ref,
      () => ({
        handleOpen,
        handleClose,
      }),
      []
    );

    const handleOpen = useCallback((data) => {
      setFood(data);
      setQuantity(1);
      setVisible(true);
    }, []);

    const handleClose = useCallback(() => {
      setVisible(false);
    }, []);

    const handleAddCart = () => {
      props.onUpdateCart(food, quantity);
      handleClose();
    };

    const totalMoney = useMemo(() => {
      return food?.finalPrice * quantity;
    }, [quantity, food]);

    return (
      <RBSheet
        ref={actionSheetRef}
        // openDuration={350}
        closeOnDragDown
        animationType="fade"
        onClose={handleClose}
        customStyles={{
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: null,
          },
        }}
      >
        <View style={{ padding: 16 }}>
          <RowView alignItems="flex-start">
            <View
              style={{
                height: 100,
                aspectRatio: 1,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <EImage source={{ uri: food?.thumbnail }} />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Typography preset="smallTitle" color="#000">
                {food?.name}
              </Typography>

              <RowView justifyContent="space-between" style={{ marginTop: 4 }}>
                <RowView>
                  <Typography preset="mediumButton" colorPreset="error">
                    {formatNumber(food?.finalPrice)}đ
                  </Typography>
                  {!isEqual(food?.finalPrice, food?.originPrice) && (
                    <Typography
                      preset="superSmallParagraph"
                      colorPreset="regularText"
                      lineHeight={12}
                      style={{
                        marginLeft: 8,
                        textDecorationLine: "line-through",
                      }}
                    >
                      {formatNumber(food?.originPrice)}đ
                    </Typography>
                  )}
                </RowView>
              </RowView>
            </View>
          </RowView>

          <Typography
            preset="smallParagraph"
            colorPreset="regularText"
            style={{ marginTop: 24 }}
          >
            {food?.description}
          </Typography>

          <View style={{ alignItems: "center", marginTop: 24 }}>
            <Typography preset="smallLabel" colorPreset="primaryText">
              Số lượng
            </Typography>
            <View
              style={{
                marginTop: 8,
                padding: 4,
                borderRadius: 8,
                ...border(1, colors.placeholder),
              }}
            >
              <AddQuantityView
                value={quantity}
                onChangeQuantity={setQuantity}
              />
            </View>
          </View>

          <RowView
            justifyContent="space-between"
            style={{
              backgroundColor: "rgba(253, 108, 159, 0.12)",
              borderRadius: 8,
              paddingLeft: 16,
              marginTop: 24,
            }}
          >
            <RowView>
              <MoneySvg />
              <Typography
                preset="mediumTitle"
                colorPreset="primary"
                style={{ marginLeft: 8 }}
              >
                {formatNumber(totalMoney)}đ
              </Typography>
            </RowView>

            <EButton text="Thêm vào giỏ" onPress={handleAddCart} />
          </RowView>
        </View>
      </RBSheet>
    );
  }),
  (prev, next) => isEqual(prev, next)
);

const styles = StyleSheet.create({});
