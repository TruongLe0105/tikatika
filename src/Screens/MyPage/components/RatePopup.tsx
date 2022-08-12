import { StarSvg } from "@/assets/svg/StarSvg";
import { EButton } from "@/components/Button/EButton";
import { SwipeRating } from "@/components/StartRating/SwipeRating";
import Typography from "@/components/Text/Typography";
import useStateCallback from "@/hooks/useStateCallback";
import appStore from "@/store/appStore";
import { border } from "@/styles/border";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@/styles/dimensions";
import { boxShadow, colors } from "@/styles/theme";
import { isEqual } from "lodash";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { View, Text, Platform, Linking } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import Stars from "react-native-stars";
import InAppReview from "react-native-in-app-review";

interface Props {}

export interface RatePopup {
  handleOpen: () => void;
}

export const RatePopup = React.memo(
  React.forwardRef((props: Props, ref) => {
    const [visible, setVisible] = useStateCallback(false);
    const [numberStar, setNumberStar] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        handleOpen,
        handleClose,
      }),
      []
    );

    const handleOpen = useCallback((data) => {
      setVisible(true);
    }, []);

    const handleClose = useCallback(() => {
      setVisible(false);
      setNumberStar(0);
    }, []);

    const handleUpdateStar = useCallback((star: number) => {
      checkStar(star);
      setNumberStar(star);
    }, []);

    const checkStar = (star: number) => {
      setTimeout(() => {
        handleClose();
      }, 200);

      if (star <= 3) {
        handleShowFeedback();
      } else {
        handleReviewApp();
      }
    };

    const handleShowFeedback = () => {
      Linking.openURL(
        "mailto:tikatikaconnect@gmail.com?subject=Phản hồi ứng dụng"
      );
    };

    const handleReviewApp = async () => {
      if (appStore.isOpenAppReview) {
        const path =
          Platform.OS === "ios"
            ? "itms-apps://apps.apple.com/app/id1583932631?action=write-review"
            : "market://details?id=com.tikatika.et.user";
        Linking.openURL(path);
        return;
      }

      const isAvailable = InAppReview.isAvailable();
      if (isAvailable) {
        InAppReview.RequestInAppReview()
          .then((result) => {
            if (result) {
              appStore.setIsOpenAppReview(true);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    };

    if (!visible) {
      return null;
    }

    return (
      <AwesomeAlert
        show={visible}
        closeOnHardwareBackPress={false}
        closeOnTouchOutside={false}
        customView={
          <View
            style={{
              minWidth: SCREEN_WIDTH * 0.9,
              width: "100%",
              margin: -10,
              borderRadius: 8,
              padding: 16,
              backgroundColor: "#fff",
              ...boxShadow("rgba(0, 0, 0, 0.16)", 0, 2, 12),
              alignItems: "center",
            }}
          >
            <Typography
              preset="mediumLabel"
              colorPreset="primaryText"
              align="center"
            >
              Are you satisfied with Expert T? Let us know your experience. 5
              stars is the best on{" "}
              {Platform.OS === "android" ? "Google Play" : "Apple Store"}!
            </Typography>
            <View style={{ marginTop: 10 }}>
              <Stars
                rating={numberStar}
                update={handleUpdateStar}
                count={5}
                half={false}
                fullStar={
                  <StarSvg
                    size={32}
                    starColor={colors.primary}
                    strokeColor={colors.primary}
                  />
                }
                emptyStar={
                  <StarSvg
                    size={32}
                    starColor="transparent"
                    strokeColor={colors.primary}
                  />
                }
                spacing={2}
              />
            </View>
            <EButton
              text="Đóng"
              onPress={handleClose}
              style={{ width: 150, marginTop: 20 }}
            />
          </View>
        }
        contentContainerStyle={{
          maxWidth: "90%",
          backgroundColor: "transparent",
        }}
        alertContainerStyle={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.06)",
        }}
        overlayStyle={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  }),
  (prev, next) => isEqual(prev, next)
);
