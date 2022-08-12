/**
 * Modal hiển thi chi tiết của coupon, dùng package: react-native-actions-sheet
 * @param {Function} onSelect //Khi nhấn cập sử dụng
 */

import { StoreSvg } from "@/assets/svg/StoreSvg";
import { TicketSvg } from "@/assets/svg/TicketSvg";
import { EButton } from "@/components/Button/EButton";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { Promotion } from "@/types/promotion";
import { isEqual } from "lodash";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

type CouponDetailModalProps = {
  onSelect: (promotion: Promotion) => void;
};

export const CouponDetailModal = React.memo(
  React.forwardRef((props: CouponDetailModalProps, ref) => {
    const [visible, setVisible] = useState(false);
    const [promotion, setPromotion] = useState<Promotion>(null);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const actionSheetRef = useRef<RBSheet>(null);

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

    const handleOpen = useCallback((data, selected) => {
      setPromotion(data);
      setSelectedPromotion(selected);
      setVisible(true);
    }, []);

    const handleClose = useCallback(() => {
      setVisible(false);
    }, []);

    const handleUseCoupon = () => {
      props.onSelect(
        !isEqual(selectedPromotion?.id, promotion?.id) && promotion
      );
      handleClose();
    };

    return (
      <RBSheet
        ref={actionSheetRef}
        openDuration={350}
        closeOnDragDown
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
          {promotion?.store && (
            <RowView>
              <StoreSvg size={16} />
              <Typography
                preset="smallLabel"
                colorPreset="primary"
                style={{ marginLeft: 8, flex: 1 }}
              >
                {promotion?.store.name}
              </Typography>
            </RowView>
          )}

          <RowView style={{ marginTop: 8 }}>
            <TicketSvg size={32} />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Typography preset={"mediumLabel"} color="#000" numberOfLines={2}>
                {promotion?.name}
              </Typography>
            </View>
          </RowView>

          <Typography
            preset="mediumParagraph"
            colorPreset="regularText"
            style={{ marginTop: 16 }}
          >
            {promotion?.description}
          </Typography>

          <RowView style={{ marginTop: 24 }}>
            <EButton
              text={"Đóng"}
              style={{ flex: 1 }}
              border
              color={[colors.secondaryText]}
              onPress={handleClose}
            />
            {/* <EButton
              text={
                isEqual(selectedPromotion?.id, promotion?.id)
                  ? "Không sử dụng"
                  : "Sử dụng ngay"
              }
              style={{ flex: 1, marginLeft: 8 }}
              border={isEqual(selectedPromotion?.id, promotion?.id)}
              color={[
                isEqual(selectedPromotion?.id, promotion?.id)
                  ? colors.error
                  : colors.primary,
              ]}
              onPress={handleUseCoupon}
            /> */}
          </RowView>
        </View>
      </RBSheet>
    );
  }),
  (prev, next) => isEqual(prev, next)
);
