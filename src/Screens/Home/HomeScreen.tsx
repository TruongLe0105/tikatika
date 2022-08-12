import { storeVideoApi } from "@/api/storeVideo.api";
import { EScreen } from "@/components/Screen/EScreen";
import Typography from "@/components/Text/Typography";
import { NotificationService } from "@/plugins/notificationService";
import { configStore } from "@/store/configStore";
import { useLayout } from "@/hooks/useLayout";
import { locationStore } from "@/store/locationStore";
import { userStore } from "@/store/userStore";
import { Video } from "@/types/video";
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
  FlatList,
  Platform,
  RefreshControl,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeliveryAddress } from "./components/DeliveryAddress";
import { VideoHomeItem } from "./components/VideoHomeItem";
import {
  useFocusEffect,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import {
  useKeepAwake,
  activateKeepAwake,
  deactivateKeepAwake,
} from "expo-keep-awake";
import { switchNotify } from "@/plugins/Notification";
import { calcDistance } from "@/utils/location";
import { foodOrderStore } from "@/store/foodOrderStore";
import { Box } from "native-base";
import { notificationStore } from "@/store/notificationStore";
import { isEmpty } from "lodash";
import { Loading } from "@/components/Loading/Loading";
import { storeApi } from "@/api/store.api";
import appStore from "@/store/appStore";
import { PopupStoreInformation } from "./components/PopupStoreInformation";
import { Portal } from "@gorhom/portal";
import { useNetwork } from "@/hooks/useNetwork";

export const HomeScreen = observer(({ navigation }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const listQuery = useRef({
    page: 1,
    limit: 10,
  });
  const total = useRef(0);
  const isFetching = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [size, onLayout] = useLayout();
  const [indexViewing, setIndexViewing] = useState(-1);
  const isFocused = useIsFocused();
  const [isPauseVideo, setIsPauseVideo] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(null);
  const flatListRef = useRef<FlatList>(null);
  const [isListMounted, setIsListMounted] = useState(false);
  const productViewedIds = useRef([]);
  const [showStatusbar, setShowStatusbar] = useState(false);
  const infoRef = useRef<PopupStoreInformation>(null);
  const [isNetworkConnected] = useNetwork();
  const layoutVideoItemHeight = useRef(0);

  const route: any = useRoute();
  const storeId = route.params?.storeId;

  useEffect(() => {
    console.log("route ne", route);
    if (!isEmpty(storeId)) {
      fetchSelectedShop();
    }
  }, [storeId, route]);

  useEffect(() => {
    if (isNetworkConnected) {
      notificationStore.getTotalUnseen();
      foodOrderStore.fetchFavoriteStore();
      fetchVideo(false);
    }
  }, [isNetworkConnected]);

  const fetchSelectedShop = async () => {
    try {
      Loading.load();
      const res = await storeApi.findOne(storeId);
      foodOrderStore.setSelectedShop(res.data);

      requestAnimationFrame(() => {
        Navigation.navigate(ScreenName.ShopDetail);
      });
    } finally {
      Loading.hide();
    }
  };

  useEffect(() => {
    init();
    registerNotification();
    configStore.resetTryAgain();
    configStore.fetchRatioPoint();
    const notificationService = new NotificationService();
    notificationService.onNotificationClick(handleNotification);
    notificationService.onNotification(handleNotification);
    notificationService.onNotificationLocalClick(handleNotification);
    notificationService.onNotificationBackground(handleNotification);
    return () => {
      notificationService.unSubscribe();
    };
  }, []);

  const fetchLocation = async () => {
    await userStore.getLocation();
    await userStore.fetchLocation();
  };

  const handleNotification = (data, trigger) => {
    switchNotify(data, trigger);
  };

  useEffect(() => {
    //handle khi qua screen thì sẽ pause video hiện đang play
    console.log(" if (isFocused) {", isFocused);

    if (isFocused) {
      if (!!userStore.location.latitude && !!userStore.location.longitude) {
        // console.log("get location ne");
        // fetchLocation();
      }
      setIsPauseVideo(!appStore.loadSplashVideo);
      activateKeepAwake();
      setShowStatusbar(false);
      setTimeout(() => {
        setShowStatusbar(true);
      }, 100);
    } else {
      setIsPauseVideo(true);
      setShowStatusbar(false);
      deactivateKeepAwake();
      infoRef.current?.handleClose();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isListMounted && indexViewing == -1 && videos.length && isFocused) {
      console.log("isFocused move 1", isFocused);

      setIndexViewing(0);
    }
  }, [isListMounted, videos, indexViewing, isFocused]);

  useEffect(() => {
    if (indexViewing > -1) {
      productViewedIds.current?.push(videos[indexViewing]?.id);
    }
  }, [indexViewing]);

  useEffect(() => {
    if (videos.length == 0) {
      setIndexViewing(-1);
    }
  }, [videos]);

  useEffect(() => {
    setIsPauseVideo(!appStore.loadSplashVideo);
  }, [appStore.loadSplashVideo]);

  const dataVideo = useMemo(() => {
    return videos.map((e) => {
      e.store.distance = calcDistance(
        {
          latitude: userStore.location.latitude,
          longitude: userStore.location.longitude,
        },
        {
          latitude: e.store?.lat,
          longitude: e.store?.long,
        }
      );
      return e;
    });
  }, [videos, userStore.location]);

  const init = async () => {
    try {
      await fetchLocation();
    } catch (error) {
    } finally {
      notificationStore.getTotalUnseen();
      foodOrderStore.fetchFavoriteStore();
      // setTimeout(() => {
      fetchVideo(false);
    }
  };

  const registerNotification = async () => {
    await NotificationService.checkPermission();
    await NotificationService.onRegister();
    userStore.getInfo();
  };

  const handlePressAddress = () => {
    setIsPauseVideo(true);
    requestAnimationFrame(() => {
      Navigation.navigate(ScreenName.ChangeDeliveryAddress, {
        location: userStore.location,
        onDone: (address) => {
          userStore.setLocation(address);
        },
      });
    });
  };

  const handlePressSearch = () => {
    setIsPauseVideo(true);
    requestAnimationFrame(() => {
      Navigation.navigate(ScreenName.Category);
    });
  };

  const fetchVideo = async (isRefreshing = true) => {
    try {
      setIsRefreshing(isRefreshing);
      isFetching.current = true;
      listQuery.current.page = 1;
      const res = await storeVideoApi.findAll(listQuery.current);
      total.current = res.data.total;
      setVideos(res.data.storeVideos);
    } finally {
      isFetching.current = false;
      setIsRefreshing(false);
    }
  };

  const loadMore = async () => {
    try {
      if (!isFetching.current && setVideos.length != total.current) {
        listQuery.current.page++;
        isFetching.current = true;
        const res = await storeVideoApi.findAll(listQuery.current);
        setVideos([...videos, ...res.data.storeVideos]);
        total.current = res.data.total;
      }
    } finally {
      isFetching.current = false;
    }
  };

  const handlePlayVideo = useCallback((productId) => {
    if (!isFocused) {
      return;
    }
    setProductIdSelected(productId);

    setIsPauseVideo((prev) => {
      console.log("handlePlayVideo", prev);
      if (prev) {
        return false;
      }
    });
  }, []);

  const handleNext = useCallback(() => {
    setIndexViewing((prev) => {
      if (prev < videos.length - 1) {
        flatListRef.current.scrollToIndex({
          index: prev + 1,
          animated: true,
        });
        return prev + 1;
      }
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
      return prev;
    });
  }, [indexViewing]);

  const handlePause = useCallback(() => {
    setIsPauseVideo(true);
  }, []);

  const handleMoreInfo = (data) => {
    infoRef.current?.handleClose();
    infoRef.current.handleOpen(data.store);
  };

  const videoItemHeight = useMemo(() => {
    return size.height || layoutVideoItemHeight.current;
  }, [size, isFocused]);

  const renderProductList = ({ item, index }) => (
    <View
      style={{
        height: videoItemHeight,
      }}
    >
      <VideoHomeItem
        index={index}
        onPause={handlePause}
        onPlayVideo={handlePlayVideo}
        onFinish={handleNext}
        onPressMoreInfo={handleMoreInfo}
        isViewing={appStore.loadSplashVideo && indexViewing == index}
        shouldVisibleVideo={
          index >= indexViewing - 4 && index <= indexViewing + 4
        }
        isPause={productIdSelected == item.id ? isPauseVideo : true}
        data={item}
      />
    </View>
  );

  const handleLayout = useCallback(
    (event) => {
      if (!isFocused && !layoutVideoItemHeight.current) {
        layoutVideoItemHeight.current = event.nativeEvent.layout.height;
      }

      if (isFocused) {
        onLayout(event);
      }
    },
    [isFocused]
  );

  return (
    <EScreen
      headerColor={"#000"}
      hideHeader
      style={{ flex: 1, backgroundColor: "#000" }}
    >
      {/* Hiển thị địa chỉ giao và khung search */}
      {showStatusbar && (
        <StatusBar backgroundColor={"#000"} barStyle={"light-content"} />
      )}

      <Box safeAreaTop backgroundColor={"#000"} />
      <View style={{ backgroundColor: "#000" }}>
        <DeliveryAddress
          address={userStore.location.formattedAddress}
          onPressSearch={handlePressSearch}
          onPressAddress={handlePressAddress}
        />
      </View>

      {/* Hiển thi video, thông tin của quán ăn và khuyến mãi của quán */}

      <View style={{ flex: 1 }} onLayout={handleLayout}>
        <FlatList
          nestedScrollEnabled
          scrollsToTop={false}
          onScrollToTop={(ev) => {
            setIndexViewing(0);
          }}
          refreshControl={
            <RefreshControl
              tintColor={"#fff"}
              colors={["#fff"]}
              refreshing={isRefreshing}
              onRefresh={() => {
                fetchVideo();
                setIndexViewing(-1);
              }}
            />
          }
          onMomentumScrollEnd={(ev) => {
            let contentOffset = ev.nativeEvent.contentOffset;
            let viewSize = ev.nativeEvent.layoutMeasurement;
            const page = +(contentOffset.y / viewSize.height).toFixed(1);
            setIndexViewing(page);
          }}
          onLayout={({ nativeEvent }) => {
            setIsListMounted(true);
          }}
          ref={flatListRef}
          onEndReachedThreshold={1}
          onEndReached={loadMore}
          contentContainerStyle={{ flexGrow: 1 }}
          pagingEnabled
          maxToRenderPerBatch={10}
          data={dataVideo}
          renderItem={renderProductList}
          keyExtractor={(item, index) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Portal hostName="PopupDetailStorePortalHost">
        <PopupStoreInformation ref={infoRef} />
      </Portal>
    </EScreen>
  );
});
