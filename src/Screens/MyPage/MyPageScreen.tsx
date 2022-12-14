import { authApi } from "@/api/auth";
import { ContentDefineType } from "@/api/contentDefine.api";
import { CouponSvg } from "@/assets/svg/CouponSvg";
import { NewsSvg } from "@/assets/svg/NewsSvg";
import { NotificationSvg } from "@/assets/svg/NotificationsSvg";
import { RatingSvg } from "@/assets/svg/RatingSvg";
import { RightMenuChangePassSvg } from "@/assets/svg/RightMenuChangePassSvg";
import { RightMenuFAQSvg } from "@/assets/svg/RightMenuFAQSvg";
import { RightMenuFavoriteSvg } from "@/assets/svg/RightMenuFavoriteSvg";
import { RightMenuFriendsSvg } from "@/assets/svg/RightMenuFriendsSvg";
import { RightMenuGuidelineSvg } from "@/assets/svg/RightMenuGuidelineSvg";
import { RightMenuInformationSvg } from "@/assets/svg/RightMenuInformationSvg";
import { RightMenuLogoutSvg } from "@/assets/svg/RightMenuLogoutSvg";
import { RightMenuNotificationSvg } from "@/assets/svg/RightMenuNotificationSvg";
import { RightMenuReviewSvg } from "@/assets/svg/RightMenuReviewSvg";
import { RightMenuSecuritySvg } from "@/assets/svg/RightMenuSecuritySvg";
import { RightMenuSettingSvg } from "@/assets/svg/RightMenuSettingSvg";
import { RightMenuUserInfoSvg } from "@/assets/svg/RightMenuUserInfoSvg";
import { TabbarHistorySvg } from "@/assets/svg/TabbarHistorySvg";
import { Alert } from "@/components/Alert/Alert";
import { ShadowCard } from "@/components/Card/ShadowCard";
import { EScreen } from "@/components/Screen/EScreen";
import { VersionApp } from "@/config";
import appStore from "@/store/appStore";
import { foodOrderStore } from "@/store/foodOrderStore";
import { userStore } from "@/store/userStore";
import { colors } from "@/styles/theme";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feature, FeatureItem } from "./components/FeatureItem";
import { InformationCard } from "./components/InformationCard";
import { RatePopup } from "./components/RatePopup";

export const MyPageScreen = observer(({ navigation }) => {
  const features: Feature[] = useMemo(
    () => [
      {
        label: "Th??ng b??o",
        icon: RightMenuNotificationSvg,
        type: "notification",
        onPress: () => {
          Navigation.navigate(ScreenName.Notification);
        },
      },
      {
        label: "Qu??n y??u th??ch",
        icon: RightMenuFavoriteSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.ShopFoodFavorite);
        },
      },
      {
        label: "V?? Coupon",
        icon: CouponSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.Coupon, { status: "view" });
        },
      },
      {
        label: "????nh gi?? c???a t??i",
        icon: RightMenuReviewSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.MyReview);
        },
      },
      {
        label: "????nh gi?? ???ng d???ng",
        icon: RatingSvg,
        onPress: () => {
          handleReviewApp();
        },
      },
      {
        label: "Th??ng tin c?? nh??n",
        icon: RightMenuUserInfoSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.PersonalInformation);
        },
      },
      {
        label: "?????i m???t kh???u",
        icon: RightMenuChangePassSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.ChangePassword);
        },
      },
      {
        label: "L???ch s???",
        icon: TabbarHistorySvg,
        onPress: () => {
          Navigation.navigate(ScreenName.FoodOrderHistory);
        },
      },
      {
        label: "Gi???i thi???u b???n b??",
        icon: RightMenuFriendsSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.Affiliate);
        },
      },
      {
        label: "????ng xu???t",
        icon: RightMenuLogoutSvg,
        onPress: () => {
          handleLogout();
        },
      },
    ],
    []
  );

  const [support, setSupport] = useState<Feature[]>([
    {
      label: `Gi???i thi???u (v${VersionApp})`,
      icon: RightMenuInformationSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Content, {
          type: ContentDefineType.About,
        });
      },
    },
    {
      label: `Tin t???c`,
      icon: RightMenuNotificationSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.News);
      },
    },
    {
      label: "C??i ?????t",
      icon: RightMenuSettingSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Setting);
      },
    },
    {
      label: "H?????ng d???n s??? d???ng",
      icon: RightMenuGuidelineSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Content, {
          type: ContentDefineType.HowToUse,
        });
      },
    },
    {
      label: "??i???u kho???n & ch??nh s??ch",
      icon: RightMenuSecuritySvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Content, {
          type: ContentDefineType.TermCondition,
        });
      },
    },
    {
      label: "C??u h???i th?????ng g???p",
      icon: RightMenuFAQSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Content, {
          type: ContentDefineType.Faq,
        });
      },
    },
  ]);
  const ratePopupRef = useRef<RatePopup>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      userStore.getInfo();
    }
  }, [isFocused]);

  const handlePressPoint = useCallback(() => {
    Navigation.navigate(ScreenName.MyPoint);
  }, []);

  const handleReviewApp = () => {
    ratePopupRef.current.handleOpen();
  };

  const handleLogout = () => {
    Alert.alert({
      message: "B???n ch???c ch???n mu???n ????ng xu???t",
      title: "Th??ng b??o",
      buttonGroup: [
        {
          text: "Kh??ng",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "????ng xu???t",
          onPress: async () => {
            await authApi.logout();
            appStore.setToken("");
            userStore.setInfo({});
            navigation.jumpTo("HomeScreen");
            // foodOrderStore.resetCart();
          },
        },
      ],
    });
  };

  return (
    <EScreen
      hideShadow
      enableKeyboardAware
      fixedHeader
      headerColor={"transparent"}
      style={{ flexGrow: 1, paddingHorizontal: 16 }}
    >
      <View style={{ marginTop: 16 }}>
        <InformationCard onPress={handlePressPoint} info={userStore.info} />
      </View>

      <ShadowCard style={{ marginTop: 16, padding: 12 }}>
        <FlatList
          data={features}
          scrollEnabled={false}
          renderItem={({ item }) => <FeatureItem feature={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: colors.placeholder,
                marginVertical: 12,
              }}
            />
          )}
        />
      </ShadowCard>

      <ShadowCard style={{ marginTop: 16, padding: 12 }}>
        <FlatList
          data={support}
          scrollEnabled={false}
          renderItem={({ item }) => <FeatureItem feature={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: colors.placeholder,
                marginVertical: 12,
              }}
            />
          )}
        />
      </ShadowCard>
      <View style={{ height: 20 }} />
      <RatePopup ref={ratePopupRef} />
    </EScreen>
  );
});
