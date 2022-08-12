/**
 * Chi tiết của 1 quán ăn
 *  Khi scroll xuống thì tên của quán sẽ nằm ở header
 */
import { menuApi } from "@/api/menu.api";
import { EImage } from "@/components/Image/EImage";
import { EScreen } from "@/components/Screen/EScreen";
import { foodOrderStore } from "@/store/foodOrderStore";
import { Food, Menu } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { observer } from "mobx-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FoodDetailModal } from "./components/FoodDetailModal";
import { FoodItem } from "./components/FoodItem";
import { ProcessCartButton } from "./components/ProcessCartButton";
import { ReviewList } from "./components/ReviewList";
import { ShopDetailCard } from "./components/ShopDetailCard";
import { ShopDetailHeader } from "./components/ShopDetailHeader";
import { TabBar, TabView, Route } from "react-native-tab-view";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import Typography from "@/components/Text/Typography";
import { alignJustify, colors } from "@/styles/theme";
import { FoodList } from "./components/FoodList";
import { LinearGradient } from "expo-linear-gradient";
import { useLayout } from "@/hooks/useLayout";
import { EHeader } from "@/components/Header/EHeader";
import { FavoriteSvg } from "@/assets/svg/FavoriteSvg";
import { userStore } from "@/store/userStore";
import { InfoView } from "./components/InfoView";
import { ScrollView } from "react-native-gesture-handler";
import appStore from "@/store/appStore";
import { storeApi } from "@/api/store.api";
import { Loading } from "@/components/Loading/Loading";
import moment from "moment";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width,
};

enum ShopDetailRoute {
  Menu = "MENU",
  Review = "REVIEW",
  Info = "INFO",
}
interface DetailStoreRoute extends Route {
  title: string;
}

export const ShopDetailScreen = observer(({ route }) => {
  const [scroll, setScroll] = useState(new Animated.Value(0));
  const [index, setIndex] = useState(0);
  const [layout, onLayout] = useLayout();
  const [routes, setRoutes] = useState<DetailStoreRoute[]>([
    {
      title: "Menu",
      key: ShopDetailRoute.Menu,
    },
    {
      title: "Đánh giá",
      key: ShopDetailRoute.Review,
    },
    {
      title: "Thông tin quán",
      key: ShopDetailRoute.Info,
    },
  ]);
  const [menuFoods, setMenuFoods] = useState<Menu[]>([]);
  const _listFoodRef = useRef<FlatList>(null);
  const _listReviewRef = useRef<FlatList>(null);
  const _infoRef = useRef<FlatList>(null);
  const foodDetailRef = useRef(null);

  const isClosed = useMemo(() => {
    const now = moment();
    const close = moment(foodOrderStore.selectedShop?.closeTime, "HH:mm").diff(
      now,
      "minutes"
    );
    const open = now.diff(
      moment(foodOrderStore.selectedShop?.openTime, "HH:mm"),
      "minutes"
    );
    return open < 0 || close < 0;
  }, [foodOrderStore.selectedShop]);

  const COLLAPSED_HEIGHT = 60;

  const HEADER_HEIGHT = useMemo(() => {
    return (SCREEN_WIDTH * 210) / 375 + layout.height + 10;
  }, [layout]);

  const SCROLLABLE_HEIGHT = useMemo(() => {
    return HEADER_HEIGHT - COLLAPSED_HEIGHT;
  }, [HEADER_HEIGHT]);

  const OFFSET = useMemo(() => {
    return Platform.OS === "ios" ? HEADER_HEIGHT : 0;
  }, [HEADER_HEIGHT]);

  useEffect(() => {
    if (layout.height != 0) {
      _handleIndexChange(0);
    }
  }, [layout]);

  useFocusEffect(
    React.useCallback(() => {
      fetchMenu();
      foodOrderStore.fetchDetailShop();
    }, [])
  );

  useEffect(() => {
    foodOrderStore.setEndAddressOrder(userStore.location);
    scroll.addListener((e) => {
      console.log("event", e.value);
    });
    return () => {
      scroll.removeAllListeners();
    };
  }, []);

  const handlePressAddFood = (food: Food) => {
    const data = { ...food, store: foodOrderStore.selectedShop };
    foodDetailRef.current.handleOpen(data);
  };

  const fetchMenu = async () => {
    const res = await menuApi.findAll({
      storeId: foodOrderStore.selectedShop?.id,
    });
    setMenuFoods(res.data.menus);
  };

  const handlePressFavorite = async () => {
    try {
      Loading.load();
      await foodOrderStore.favoriteShop(foodOrderStore.selectedShop);
    } finally {
      Loading.hide();
    }
  };

  const _handleIndexChange = (index) => {
    setIndex(index);
    _listFoodRef.current?.scrollToOffset({
      offset: -OFFSET,
    });
    _listReviewRef.current?.scrollToOffset({
      offset: -OFFSET,
    });
    _infoRef.current?.scrollToOffset({
      offset: -OFFSET,
    });

    scroll.setOffset(OFFSET);
    scroll.setValue(-OFFSET);
  };

  const handleAddCart = (food, quantity) => {
    foodOrderStore.addToCart(food, quantity, true);
  };

  const _renderHeader = (props) => {
    const translateY = scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT + 30],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: HEADER_HEIGHT,
          transform: [{ translateY }],
          backgroundColor: colors.borderBase,
        }}
      >
        <View style={{ width: SCREEN_WIDTH, aspectRatio: 375 / 210 }}>
          <EImage
            source={{ uri: foodOrderStore.selectedShop?.thumbnail }}
            // defaultSource={require("@/assets/images/fclass_popup_image.png")}
          />
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "#fff"]}
            start={[0, 0.5]}
            end={[0, 1]}
            style={{ ...StyleSheet.absoluteFillObject }}
          ></LinearGradient>
        </View>

        {/* Thông tin chi tiết của quán */}
        <View onLayout={onLayout} style={{ marginTop: -30 }}>
          <ShopDetailCard
            foodShop={foodOrderStore.selectedShop}
            isClosed={isClosed}
          />
        </View>

        <TabBar
          {...props}
          style={{
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
            height: 45,
            borderBottomWidth: 0,
            marginHorizontal: 16,
          }}
          tabStyle={{
            width: "auto",
          }}
          indicatorStyle={{
            height: 5,
            borderRadius: 2.5,
            backgroundColor: colors.primary,
          }}
          renderLabel={({ route, focused }) => (
            <Typography
              preset="smallTitle"
              family={focused ? "bold" : "regular"}
              color={focused ? "#000" : colors.regularText}
            >
              {focused ? route.title : ` ${route.title} `}
            </Typography>
          )}
        />
      </Animated.View>
    );
  };

  const onScrollListView = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
      useNativeDriver: true,
    }),
    []
  );
  const contentContainerStyle = useMemo(
    () => ({
      paddingHorizontal: 16,
      // flexGrow: 1,
      paddingTop: Platform.select({ ios: 0, android: HEADER_HEIGHT }),
    }),
    [HEADER_HEIGHT]
  );

  const _renderScene = ({ route }: { route: DetailStoreRoute }) => {
    switch (route.key) {
      case ShopDetailRoute.Menu:
        return (
          <FoodList
            menuList={menuFoods}
            scrollEventThrottle={16}
            onScroll={onScrollListView}
            contentContainerStyle={contentContainerStyle}
            listRef={_listFoodRef}
            headerHeight={HEADER_HEIGHT}
            onPressItem={handlePressAddFood}
            isClosed={isClosed}
          />
        );
      case ShopDetailRoute.Review:
        return (
          <ReviewList
            foodShopId={foodOrderStore.selectedShop.id}
            scrollEventThrottle={16}
            onScroll={onScrollListView}
            contentContainerStyle={contentContainerStyle}
            listRef={_listReviewRef}
            headerHeight={HEADER_HEIGHT}
          />
        );
      case ShopDetailRoute.Info:
        return (
          <InfoView
            scrollEventThrottle={16}
            onScroll={onScrollListView}
            contentContainerStyle={contentContainerStyle}
            listRef={_infoRef}
            headerHeight={HEADER_HEIGHT}
            description={foodOrderStore.selectedShop.description}
          />
        );
    }
  };

  const opacity = scroll.interpolate({
    inputRange: [0, COLLAPSED_HEIGHT, COLLAPSED_HEIGHT + 100],
    outputRange: [0, 0, 1],
  });

  return (
    <>
      <EScreen hideHeader edges={["bottom", "top"]} style={{ flex: 1 }}>
        <TabView
          style={{ flexGrow: 1 }}
          navigationState={{
            index,
            routes,
          }}
          lazy
          swipeEnabled={false}
          renderScene={_renderScene}
          renderTabBar={_renderHeader}
          onIndexChange={_handleIndexChange}
          initialLayout={initialLayout}
        />

        {/* nút nhấn để qua mh cart */}
        {userStore.info?.id && (
          <ProcessCartButton
            total={foodOrderStore.totalFoodInCart}
            money={foodOrderStore.totalMoneyInCart}
            onPress={() => {
              Navigation.navigate(ScreenName.FoodCart);
            }}
          />
        )}
        {/* Header của mh chi tiết quán,  */}
        <View style={{ position: "absolute", top: 0, width: "100%" }}>
          <EHeader
            fixedHeader
            showHeaderTool
            headerTitle={" "}
            componentRight={
              !!appStore.token && (
                <Pressable
                  onPress={handlePressFavorite}
                  style={{
                    backgroundColor: "#fff",
                    height: 40,
                    aspectRatio: 1,
                    borderRadius: 20,
                    ...alignJustify(),
                  }}
                >
                  <FavoriteSvg
                    isFavorite={foodOrderStore.selectedShop.isFavorite}
                    strokeColor={colors.regularText}
                  />
                </Pressable>
              )
            }
          />
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              opacity,
            }}
          >
            <EHeader
              fixedHeader
              showHeaderTool
              hideShadow={false}
              headerTitle={foodOrderStore.selectedShop.name}
              headerStyle={{ backgroundColor: "#fff" }}
              componentRight={
                <Pressable
                  onPress={handlePressFavorite}
                  style={{
                    height: 40,
                    aspectRatio: 1,
                    borderRadius: 20,
                    ...alignJustify(),
                  }}
                >
                  <FavoriteSvg
                    isFavorite={foodOrderStore.selectedShop.isFavorite}
                    strokeColor={colors.regularText}
                  />
                </Pressable>
              }
            />
          </Animated.View>
        </View>
      </EScreen>
      {/* Modal hiển thi chi tiết của món ăn  */}
      <FoodDetailModal ref={foodDetailRef} onUpdateCart={handleAddCart} />
    </>
  );
});

const styles = StyleSheet.create({});
