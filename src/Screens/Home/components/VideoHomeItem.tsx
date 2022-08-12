/**
 * Hiển thi video, thông tin của quán ăn
 * @param  {FoodShop} data
 *
 */

import { alignJustify, colors } from "@/styles/theme";
import { FoodShop } from "@/types/food-order";
import { ScreenName } from "@/utils/enum";
import { Navigation } from "@/utils/Navigation";
import { AVPlaybackStatus } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { isEqual } from "lodash";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PromotionHomeItem } from "./PromotionHomeItem";
import { VideoProduct } from "./VideoProduct";
import * as Progress from "react-native-progress";
import { Video } from "@/types/video";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { StarSvg } from "@/assets/svg/StarSvg";
import { convertDistanceToTime, formatNumber } from "@/utils/helper";
import { DotView } from "@/components/View/DotView";
import { TimeSvg } from "@/assets/svg/TimeSvg";
import { FavoriteSvg } from "@/assets/svg/FavoriteSvg";
import ReadMore from "@/components/Readmore/Readmore";
import { storeApi } from "@/api/store.api";
import appStore from "@/store/appStore";
import { ScrollView } from "native-base";
import { PlaySvg } from "@/assets/svg/PlaySvg";
import { foodOrderStore } from "@/store/foodOrderStore";
import { observer } from "mobx-react";
import { EventRegister } from "react-native-event-listeners";
import { EventRegisterType } from "@/types/screen";
import { InformationSvg } from "@/assets/svg/InformationSvg";
import { Portal } from "@gorhom/portal";
import { PopupStoreInformation } from "./PopupStoreInformation";

type VideoHomeItemProps = {
  data: Video;
  isPause?: boolean;
  onPlayVideo: (productId) => void;
  index: number;
  isViewing?: boolean;
  onPause?: () => void;
  onPressMoreInfo: (data) => void;
  shouldVisibleVideo: boolean;
  onFinish: () => void;
};

export const VideoHomeItem = ({
  data,
  isPause,
  onPlayVideo,
  index,
  isViewing,
  shouldVisibleVideo,
  onPause,
  onFinish,
  onPressMoreInfo,
}: VideoHomeItemProps) => {
  const [showControl, setShowControl] = useState(true);
  const progressRef = useRef(null);
  const [countDownPromotionTime, setCountDownPromotionTime] = useState(0);
  const intervalCountdown = useRef(null);
  const giftViewRef = useRef<any>(null);
  const [currentAtVideo, setCurrentAtVideo] = useState(-1);
  const intervalAnimateGift = useRef(null);
  const [isPlayed, setIsPlayed] = useState(false); //đã play qua
  const timeToClaimGift = useRef(5);

  useEffect(() => {
    if (isViewing) {
      onViewportEnter();
    } else {
      onViewportLeave();
    }
  }, [isViewing]);

  const onViewportLeave = async () => {
    clearInterval(intervalCountdown.current);
    clearInterval(intervalAnimateGift.current);
  };

  const onViewportEnter = () => {
    console.log("onViewportEnter");
    setIsPlayed(true);

    onPlayVideo(data.id);
    setShowControl(true);
  };

  useEffect(() => {
    const time = timeToClaimGift.current - currentAtVideo;
    if (time < 0) {
      return;
    }
    setCountDownPromotionTime(time);
  }, [currentAtVideo]);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        status.didJustFinish && onFinish();

        let progress = (status.positionMillis / status.durationMillis) * 100;
        let progressPlayable =
          (status.playableDurationMillis / status.durationMillis) * 100;
        setCurrentAtVideo(Math.floor(status.positionMillis / 1000));
        progressRef.current?.setProgress(progress);
        progressRef.current?.setProgressPlayable(progressPlayable || 0);
      }
    },
    [onFinish]
  );

  const handlePressVideo = () => {
    if (!isPause) {
      onPause();
    } else {
      onPlayVideo(data.id);
    }
  };

  const handleSeekToStart = useCallback(() => {
    setIsPlayed(false);
  }, []);

  const handlePressFavorite = async () => {
    await foodOrderStore.favoriteShop(data.store);
  };

  const handlePressStore = () => {
    onPause();
    requestAnimationFrame(() => {
      foodOrderStore.setSelectedShop(data.store);
      Navigation.navigate(ScreenName.ShopDetail);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        {shouldVisibleVideo && (
          <VideoProduct
            onSeekToStart={handleSeekToStart}
            isViewing={isViewing}
            isPause={isPause}
            poster={data.thumbnail}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            videoPath={data.url}
          />
        )}

        <View style={{ ...StyleSheet.absoluteFillObject, ...alignJustify() }}>
          {isPause && isPlayed && <PlaySvg size={72} />}
        </View>
      </View>

      <Header
        store={data.store}
        onPress={handlePressStore}
        onPressInfo={() => onPressMoreInfo(data)}
      />
      <Pressable onPress={handlePressVideo} style={{ flex: 1, opacity: 0 }} />
      <Footer
        ref={progressRef}
        store={data.store}
        onPressFavorite={handlePressFavorite}
      />
    </View>
  );
};

type Header = {
  store: FoodShop;
  onPress: () => void;
  onPressInfo: () => void;
};

const Header = React.memo(
  ({ store, onPress, onPressInfo }: Header) => {
    return (
      <LinearGradient
        colors={["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]}
        start={[0, 0]}
        end={[0, 1]}
        style={{
          width: "100%",
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        <RowView style={{ flexWrap: "wrap" }}>
          <Pressable onPress={onPress} style={{ marginRight: 12, flex: 1 }}>
            <Typography preset="mediumTitle" color="#fff">
              {store?.name}
            </Typography>
          </Pressable>
          <TouchableOpacity onPress={onPressInfo}>
            <InformationSvg color="#fff" />
          </TouchableOpacity>
        </RowView>

        <RowView style={{ marginTop: 8 }}>
          <StarSvg size={16} />
          <Typography preset="mediumLabel" colorPreset="placeholder">
            {formatNumber(store?.totalStar / store?.totalRate, 1)} (
            {store?.totalRate})
          </Typography>
          <DotView
            color={colors.background}
            size={4}
            style={{ marginHorizontal: 12 }}
          />
          <Typography
            preset="mediumLabel"
            colorPreset="placeholder"
            style={{ flex: 1 }}
          >
            {formatNumber(store?.distance)} km
          </Typography>

          <TimeSvg color={colors.placeholder} size={16} />
          <Typography
            preset="mediumLabel"
            colorPreset="placeholder"
            style={{ marginLeft: 8 }}
          >
            {convertDistanceToTime(store?.distance)} phút
          </Typography>
        </RowView>
      </LinearGradient>
    );
  },
  (prev, next) => isEqual(prev, next)
);

const Footer = observer(
  React.forwardRef(({ store, onPressFavorite }: any, ref) => {
    const [progress, setProgress] = useState(0);
    const [progressPlayable, setProgressPlayable] = useState(0);
    const [shop, setShop] = useState({ ...store });

    useEffect(() => {
      setShop({ ...store });
    }, [store]);

    useEffect(() => {
      const listener: any = EventRegister.addEventListener(
        EventRegisterType.LikedShop,
        (data: FoodShop) => {
          if (data?.id == shop?.id) {
            setShop({ ...data });
          }
        }
      );
      return () => {
        EventRegister.removeEventListener(listener);
      };
    }, [shop]);

    useImperativeHandle(
      ref,
      () => ({
        setProgress,
        setProgressPlayable,
      }),
      []
    );

    return (
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
        start={[0, 1]}
        end={[0, 0]}
        style={{
          width: "100%",
          paddingTop: 16,
        }}
      >
        <RowView
          style={{ paddingHorizontal: 16, marginBottom: 24, maxHeight: 100 }}
        >
          <ScrollView nestedScrollEnabled style={{ flex: 1, marginRight: 12 }}>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={_renderTruncatedFooter}
              renderRevealedFooter={_renderRevealedFooter}
            >
              <Typography preset="mediumParagraph" color={colors.background}>
                {shop?.description}
              </Typography>
            </ReadMore>
          </ScrollView>

          {shop && (
            <Pressable onPress={onPressFavorite}>
              <FavoriteSvg isFavorite={shop.isFavorite} />
            </Pressable>
          )}
        </RowView>
        <View>
          <Progress.Bar
            style={{
              // position: "absolute",
              left: 0,
              bottom: 0,
              // backgroundColor: "blue",
              transform: [
                {
                  translateY: 4.5,
                },
              ],
            }}
            progress={progressPlayable / 100}
            width={null}
            height={4}
            animationType="timing"
            borderRadius={0}
            color={"#dc45344d"}
            unfilledColor={"rgba(255,255,255,0.4)"}
            borderWidth={0}
          />
          <Progress.Bar
            progress={progress / 100}
            width={null}
            height={4}
            animated
            animationType="timing"
            borderRadius={0}
            color={colors.primary}
            unfilledColor={"rgba(255,255,255,0.4)"}
            borderWidth={0}
          />
        </View>
      </LinearGradient>
    );
  })
);

const _renderTruncatedFooter = (handlePress) => {
  return (
    <Typography
      preset="mediumParagraph"
      family="bold"
      colorPreset="primary"
      style={{ marginTop: 0 }}
      onPress={handlePress}
    >
      Xem thêm
    </Typography>
  );
};

const _renderRevealedFooter = (handlePress) => {
  return (
    <Typography
      preset="mediumParagraph"
      family="bold"
      colorPreset="primary"
      style={{ marginTop: 0 }}
      onPress={handlePress}
    >
      Thu gọn
    </Typography>
  );
};
