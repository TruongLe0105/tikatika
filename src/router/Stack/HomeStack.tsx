import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "@/Screens/Home/HomeScreen";
import { BottomTabNavigator } from "../BottomTabNavigator";
import { ChangeDeliveryAddressScreen } from "@/Screens/ChangeDeliveryAddress/ChangeDeliveryAddressScreen";
import { ChooseAddressOnMapScreen } from "@/Screens/ChangeDeliveryAddress/ChooseAddressOnMapScreen";
import { AskLocationScreen } from "@/Screens/AskLocation/AskLocationScreen";
import { ScreenName } from "@/utils/enum";
import { CategoryScreen } from "@/Screens/Category/CategoryScreen";
import { NoteScreen } from "@/Screens/PaymentFood/NoteScreen";
import { CouponScreen } from "@/Screens/Coupon/CouponScreen";
import { ReviewScreen } from "@/Screens/Review/ReviewScreen";
import { PaymentFoodScreen } from "@/Screens/PaymentFood/PaymentFoodScreen";
import { FoodCartScreen } from "@/Screens/FoodCart/FoodCartScreen";
import { PaymentFoodSuccessScreen } from "@/Screens/PaymentFood/PaymentFoodSuccessScreen";
import { ReportReviewScreen } from "@/Screens/ReportReview/ReportReviewScreen";
import { VideoDetailScreen } from "@/Screens/Video/VideoDetailScreen";
import { ShopDetailScreen } from "@/Screens/ShopDetail/ShopDetailScreen";
import { MyPointScreen } from "@/Screens/MyPoint/MyPointScreen";
import { NotificationScreen } from "@/Screens/Notification/NotificationScreen";
import { ShopFoodFavoriteScreen } from "@/Screens/FoodShopFavorite/FoodShopFavoriteScreen";
import { MyReviewScreen } from "@/Screens/MyReview/MyReviewScreen";
import { PersonalInformationScreen } from "@/Screens/PersonalInformation/PersonalInformationScreen";
import { ChangePasswordScreen } from "@/Screens/ChangePassword/ChangePasswordScreen";
import { AffiliateScreen } from "@/Screens/Affiliate/AffiliateScreen";
import { SettingScreen } from "@/Screens/Setting/SettingScreen";
import { AuthStack } from "./AuthStack";
import appStore from "@/store/appStore";
import { observer } from "mobx-react";
import { SearchResultScreen } from "@/Screens/SearchResult/SearchResultScreen";
import { FoodOrderDetailScreen } from "@/Screens/FoodOrderDetail/FoodOrderDetailScreen";
import { ContentScreen } from "@/Screens/Content/ContentScreen";
import { ChatScreen } from "@/Screens/Chat/ChatScreen";
import { NewsScreen } from "@/Screens/News/NewsScreen";
import { NewsDetailScreen } from "@/Screens/News/NewsDetailScreen";
import { FoodOrderHistoryScreen } from "@/Screens/FoodOrderHistory/FoodOrderHistoryScreen";
import { ReviewStoreScreen } from "@/Screens/ReviewStore/ReviewStoreScreen";

const Stack = createStackNavigator();

export const HomeStack = observer(() => {
  const screens: { name: string; component: React.ComponentType<any> }[] = [
    {
      name: ScreenName.ChangeDeliveryAddress,
      component: ChangeDeliveryAddressScreen,
    },
    {
      name: ScreenName.ChooseAddressOnMapScreen,
      component: ChooseAddressOnMapScreen,
    },
    {
      name: ScreenName.AskLocation,
      component: AskLocationScreen,
    },
    {
      name: ScreenName.Category,
      component: CategoryScreen,
    },
    {
      name: ScreenName.Note,
      component: NoteScreen,
    },
    {
      name: ScreenName.Coupon,
      component: CouponScreen,
    },
    {
      name: ScreenName.PaymentFood,
      component: PaymentFoodScreen,
    },
    {
      name: ScreenName.Review,
      component: ReviewScreen,
    },
    {
      name: ScreenName.FoodCart,
      component: FoodCartScreen,
    },
    {
      name: ScreenName.PaymentFoodSuccess,
      component: PaymentFoodSuccessScreen,
    },
    {
      name: ScreenName.ReportReview,
      component: ReportReviewScreen,
    },
    {
      name: ScreenName.VideoDetail,
      component: VideoDetailScreen,
    },
    {
      name: ScreenName.ShopDetail,
      component: ShopDetailScreen,
    },
    {
      name: ScreenName.MyPoint,
      component: MyPointScreen,
    },
    {
      name: ScreenName.Notification,
      component: NotificationScreen,
    },
    {
      name: ScreenName.ShopFoodFavorite,
      component: ShopFoodFavoriteScreen,
    },
    {
      name: ScreenName.MyReview,
      component: MyReviewScreen,
    },
    {
      name: ScreenName.PersonalInformation,
      component: PersonalInformationScreen,
    },
    {
      name: ScreenName.ChangePassword,
      component: ChangePasswordScreen,
    },
    {
      name: ScreenName.Affiliate,
      component: AffiliateScreen,
    },
    {
      name: ScreenName.Setting,
      component: SettingScreen,
    },
    {
      name: ScreenName.SearchResult,
      component: SearchResultScreen,
    },
    {
      name: ScreenName.FoodOrderDetail,
      component: FoodOrderDetailScreen,
    },
    {
      name: ScreenName.Content,
      component: ContentScreen,
    },
    {
      name: ScreenName.Chat,
      component: ChatScreen,
    },
    {
      name: ScreenName.News,
      component: NewsScreen,
    },
    {
      name: ScreenName.NewsDetail,
      component: NewsDetailScreen,
    },
    {
      name: ScreenName.FoodOrderHistory,
      component: FoodOrderHistoryScreen,
    },
    {
      name: ScreenName.ReviewStore,
      component: ReviewStoreScreen,
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName={"BottomTabNavigator"}
    >
      {/* <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{
          gestureEnabled: false,
        }}
      /> */}
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
});
