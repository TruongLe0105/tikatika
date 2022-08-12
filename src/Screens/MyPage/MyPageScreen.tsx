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
        label: "Thông báo",
        icon: RightMenuNotificationSvg,
        type: "notification",
        onPress: () => {
          Navigation.navigate(ScreenName.Notification);
        },
      },
      {
        label: "Quán yêu thích",
        icon: RightMenuFavoriteSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.ShopFoodFavorite);
        },
      },
      {
        label: "Ví Coupon",
        icon: CouponSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.Coupon, { status: "view" });
        },
      },
      {
        label: "Đánh giá của tôi",
        icon: RightMenuReviewSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.MyReview);
        },
      },
      {
        label: "Đánh giá ứng dụng",
        icon: RatingSvg,
        onPress: () => {
          handleReviewApp();
        },
      },
      {
        label: "Thông tin cá nhân",
        icon: RightMenuUserInfoSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.PersonalInformation);
        },
      },
      {
        label: "Đổi mật khẩu",
        icon: RightMenuChangePassSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.ChangePassword);
        },
      },
      {
        label: "Lịch sử",
        icon: TabbarHistorySvg,
        onPress: () => {
          Navigation.navigate(ScreenName.FoodOrderHistory);
        },
      },
      {
        label: "Giới thiệu bạn bè",
        icon: RightMenuFriendsSvg,
        onPress: () => {
          Navigation.navigate(ScreenName.Affiliate);
        },
      },
      {
        label: "Đăng xuất",
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
      label: `Giới thiệu (v${VersionApp})`,
      icon: RightMenuInformationSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Content, {
          type: ContentDefineType.About,
        });
      },
    },
    {
      label: `Tin tức`,
      icon: RightMenuNotificationSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.News);
      },
    },
    {
      label: "Cài đặt",
      icon: RightMenuSettingSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Setting);
      },
    },
    {
      label: "Hướng dẫn sử dụng",
      icon: RightMenuGuidelineSvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Content, {
          type: ContentDefineType.HowToUse,
        });
      },
    },
    {
      label: "Điều khoản & chính sách",
      icon: RightMenuSecuritySvg,
      onPress: () => {
        Navigation.navigate(ScreenName.Content, {
          type: ContentDefineType.TermCondition,
        });
      },
    },
    {
      label: "Câu hỏi thường gặp",
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
      message: "Bạn chắc chắn muốn đăng xuất",
      title: "Thông báo",
      buttonGroup: [
        {
          text: "Không",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Đăng xuất",
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
