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
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { useIsFocused } from "@react-navigation/native";
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

const AnimatedIndicator = Animated.createAnimatedComponent(ActivityIndicator);
const windowHeight = Dimensions.get("window").height;
const TabBarHeight = 45;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});
const PullToRefreshDist = 150;

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

interface AnimateValue extends Animated.Value {
  _value?: number;
}

export const ShopDetailScreen = observer(({ route }) => {
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState<DetailStoreRoute[]>([
    {
      title: "Menu",
      key: ShopDetailRoute.Menu,
    },
    {
      title: "????nh gi??",
      key: ShopDetailRoute.Review,
    },
    {
      title: "Th??ng tin qu??n",
      key: ShopDetailRoute.Info,
    },
  ]);
  const [menuFoods, setMenuFoods] = useState<Menu[]>([]);
  const [canScroll, setCanScroll] = useState(true);
  const [layout, onLayout] = useLayout();
  /**
   * ref
   */
  const foodDetailRef = useRef(null);
  const scrollY = useRef<AnimateValue>(new Animated.Value(0)).current;
  const headerScrollY = useRef<AnimateValue>(new Animated.Value(0)).current;
  // for capturing header scroll on Android
  const headerMoveScrollY = useRef<AnimateValue>(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const refreshStatusRef = useRef(false);

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

  const COLLAPSED_HEIGHT = 56;

  const HEADER_HEIGHT = useMemo(() => {
    return (SCREEN_WIDTH * 210) / 375 + layout.height - 10;
  }, [layout]);

  const opacity = scrollY.interpolate({
    inputRange: [0, COLLAPSED_HEIGHT, COLLAPSED_HEIGHT + 100],
    outputRange: [0, 0, 1],
  });

  useEffect(() => {
    foodOrderStore.setEndAddressOrder(userStore.location);
    fetchMenu();
    foodOrderStore.fetchDetailShop();
  }, [foodOrderStore.selectedShop.id]);

  /**
   * PanResponder for header
   */
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderEnd: (evt, gestureState) => {
        handlePanReleaseOrEnd(evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        const curListRef = listRefArr.current.find(
          (ref) => ref.key === routes[_tabIndex.current].key
        );
        const headerScrollOffset = -gestureState.dy + headerScrollStart.current;
        if (curListRef.value) {
          // scroll up
          if (headerScrollOffset > 0) {
            curListRef.value.scrollToOffset({
              offset: headerScrollOffset,
              animated: false,
            });
            // start pull down
          } else {
            if (Platform.OS === "ios") {
              curListRef.value.scrollToOffset({
                offset: headerScrollOffset / 3,
                animated: false,
              });
            } else if (Platform.OS === "android") {
              if (!refreshStatusRef.current) {
                headerMoveScrollY.setValue(headerScrollOffset / 1.5);
              }
            }
          }
        }
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    })
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    })
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach((item) => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HEADER_HEIGHT || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HEADER_HEIGHT) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex, HEADER_HEIGHT]);

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HEADER_HEIGHT && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HEADER_HEIGHT) {
          if (
            listOffset.current[item.key] < HEADER_HEIGHT ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HEADER_HEIGHT,
                animated: false,
              });
              listOffset.current[item.key] = HEADER_HEIGHT;
            }
          }
        }
      }
    });
  };

  const startRefreshAction = () => {
    if (Platform.OS === "ios") {
      listRefArr.current.forEach((listRef) => {
        listRef.value.scrollToOffset({
          offset: -50,
          animated: true,
        });
      });
      refresh().finally(() => {
        syncScrollOffset();
        // do not bounce back if user scroll to another position
        if (scrollY._value < 0) {
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      });
    } else if (Platform.OS === "android") {
      Animated.timing(headerMoveScrollY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }).start();
      refresh().finally(() => {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handlePanReleaseOrEnd = (evt, gestureState) => {
    // console.log('handlePanReleaseOrEnd', scrollY._value);
    syncScrollOffset();
    headerScrollY.setValue(scrollY._value);
    if (Platform.OS === "ios") {
      if (scrollY._value < 0) {
        if (scrollY._value < -PullToRefreshDist && !refreshStatusRef.current) {
          startRefreshAction();
        } else {
          // should bounce back
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      } else {
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      }
    } else if (Platform.OS === "android") {
      if (
        headerMoveScrollY._value < 0 &&
        headerMoveScrollY._value / 1.5 < -PullToRefreshDist
      ) {
        startRefreshAction();
      } else {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
    // console.log('onMomentumScrollEnd');
  };

  const onScrollEndDrag = (e) => {
    syncScrollOffset();

    const offsetY = e.nativeEvent.contentOffset.y;
    // console.log('onScrollEndDrag', offsetY);
    // iOS only
    if (Platform.OS === "ios") {
      if (offsetY < -PullToRefreshDist && !refreshStatusRef.current) {
        startRefreshAction();
      }
    }

    // check pull to refresh
  };

  const refresh = async () => {
    console.log("-- start refresh");
    refreshStatusRef.current = true;
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("done");
      }, 2000);
    }).then((value) => {
      console.log("-- refresh done!");
      refreshStatusRef.current = false;
    });
  };

  /**
   * handle function
   */

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

  const handleAddCart = (food, quantity) => {
    foodOrderStore.addToCart(food, quantity, true);
  };

  const handlePressFavorite = async () => {
    try {
      Loading.load();
      await foodOrderStore.favoriteShop(foodOrderStore.selectedShop);
    } finally {
      Loading.hide();
    }
  };

  /**
   * render Helper
   */
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolateRight: "clamp",
      // extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={{
          position: "absolute",
          width: "100%",
          height: HEADER_HEIGHT,
          backgroundColor: colors.borderBase,
          transform: [{ translateY: y }],
        }}
      >
        <View style={{ width: "100%", aspectRatio: 375 / 210 }}>
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

        {/* Th??ng tin chi ti???t c???a qu??n */}
        <View onLayout={onLayout} style={{ marginTop: -30 }}>
          <ShopDetailCard
            foodShop={foodOrderStore.selectedShop}
            isClosed={isClosed}
          />
        </View>
      </Animated.View>
    );
  };

  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: HEADER_HEIGHT + TabBarHeight,
      paddingHorizontal: 16,
      minHeight: windowHeight - SafeStatusBar + HEADER_HEIGHT,
    }),
    [HEADER_HEIGHT]
  );

  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;

    const handleListRef = (ref) => {
      if (ref) {
        const found = listRefArr.current.find((e) => e.key === route.key);
        if (!found) {
          listRefArr.current.push({
            key: route.key,
            value: ref,
          });
        }
      }
    };

    switch (route.key) {
      case ShopDetailRoute.Menu:
        return (
          <FoodList
            {...listPanResponder.panHandlers}
            menuList={menuFoods}
            scrollEventThrottle={16}
            onScroll={
              focused
                ? Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                      useNativeDriver: true,
                    }
                  )
                : null
            }
            contentContainerStyle={contentContainerStyle}
            headerHeight={HEADER_HEIGHT}
            onPressItem={handlePressAddFood}
            isClosed={isClosed}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            listRef={handleListRef}
          />
        );
      case ShopDetailRoute.Review:
        return (
          <ReviewList
            {...listPanResponder.panHandlers}
            foodShopId={foodOrderStore.selectedShop.id}
            scrollEventThrottle={16}
            onScroll={
              focused
                ? Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                      useNativeDriver: true,
                    }
                  )
                : null
            }
            contentContainerStyle={contentContainerStyle}
            headerHeight={HEADER_HEIGHT}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            listRef={handleListRef}
          />
        );
      case ShopDetailRoute.Info:
        return (
          <InfoView
            {...listPanResponder.panHandlers}
            scrollEventThrottle={16}
            onScroll={
              focused
                ? Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                      useNativeDriver: true,
                    }
                  )
                : null
            }
            contentContainerStyle={contentContainerStyle}
            headerHeight={HEADER_HEIGHT}
            description={foodOrderStore.selectedShop.description}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            listRef={handleListRef}
          />
        );
    }
  };

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT, 0, COLLAPSED_HEIGHT],
      // extrapolate: "clamp",
      extrapolateRight: "clamp",
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: "absolute",
          transform: [{ translateY: y }],
          width: "100%",
        }}
      >
        <TabBar
          {...props}
          style={{
            backgroundColor: colors.borderBase,
            elevation: 0,
            shadowOpacity: 0,
            height: TabBarHeight,
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

  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => setCanScroll(false)}
        onSwipeEnd={() => setCanScroll(true)}
        onIndexChange={(id) => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={initialLayout}
      />
    );
  };

  const renderCustomRefresh = () => {
    // headerMoveScrollY
    return Platform.select({
      ios: (
        <AnimatedIndicator
          style={{
            top: -50,
            position: "absolute",
            alignSelf: "center",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [120, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
          animating
        />
      ),
      android: (
        <Animated.View
          style={{
            transform: [
              {
                translateY: headerMoveScrollY.interpolate({
                  inputRange: [-300, 0],
                  outputRange: [150, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
            backgroundColor: "#eee",
            height: 38,
            width: 38,
            borderRadius: 19,
            borderWidth: 2,
            borderColor: "#ddd",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            top: -50,
            position: "absolute",
          }}
        >
          <ActivityIndicator animating />
        </Animated.View>
      ),
    });
  };

  return (
    <>
      <EScreen hideHeader edges={["bottom", "top"]} style={{ flex: 1 }}>
        {/* <View style={{ height: 56, position: "relative", top: 0 }} /> */}
        {renderTabView()}
        {renderHeader()}
        {/* {renderCustomRefresh()} */}

        {/* n??t nh???n ????? qua mh cart */}
        {userStore.info?.id && (
          <ProcessCartButton
            total={foodOrderStore.totalFoodInCart}
            money={foodOrderStore.totalMoneyInCart}
            onPress={() => {
              Navigation.navigate(ScreenName.FoodCart);
            }}
          />
        )}
        {/* Header c???a mh chi ti???t qu??n,  */}
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
      {/* Modal hi???n thi chi ti???t c???a m??n ??n  */}
      <FoodDetailModal ref={foodDetailRef} onUpdateCart={handleAddCart} />
    </>
  );
});
