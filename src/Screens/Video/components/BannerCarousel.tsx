/**
 * Ds banner
 * @param {Banner[]} banners
 * @param {Function} onPress gọi khi nhấn vào banner
 */

import { EImage } from "@/components/Image/EImage";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { alignJustify, colors } from "@/styles/theme";
import { Banner } from "@/types/banner";
import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Carousel, {
  getInputRangeFromIndexes,
  Pagination,
} from "react-native-snap-carousel";

const sliderWidth = SCREEN_WIDTH;
const itemWidth = SCREEN_WIDTH;

type BannerCarouselProps = {
  banners: Banner[];
  onPress: (banner: Banner) => void;
};

export const BannerCarousel = ({ banners, onPress }: BannerCarouselProps) => {
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);
  const _scrollInterpolator = (index, carouselProps) => {
    const range = [3, 2, 1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
  };

  return (
    <View style={[styles.container]}>
      {banners.length == 0 && (
        <View
          style={[styles.itemView, { backgroundColor: "transparent" }]}
        ></View>
      )}

      <View>
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          loop={true}
          autoplay={true}
          enableSnap={true}
          autoplayDelay={1500}
          useScrollView={true}
          loopClonesPerSide={7}
          layout={"stack"}
          data={banners}
          renderItem={({ item }) => (
            <CarouselItem data={item} onPress={onPress} />
          )}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={0.3}
          onSnapToItem={(index) => setSlider1ActiveSlide(index)}
        />
        <Pagination
          dotsLength={banners.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={{
            position: "absolute",
            bottom: -22,
            alignSelf: "center",
          }}
          dotStyle={{
            height: 8,
            aspectRatio: 3 / 1,
            backgroundColor: colors.primary,
            borderRadius: 4,
            marginHorizontal: 2,
          }}
          dotContainerStyle={{ marginHorizontal: 2 }}
          inactiveDotStyle={{
            height: 8,
            aspectRatio: 1,
            backgroundColor: "#fff",
            borderRadius: 4,
            marginHorizontal: 2,
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
    </View>
  );
};

interface CarouselItemProps {
  data: Banner;
  onPress: (data) => void;
}

const CarouselItem = React.memo(({ data, onPress }: CarouselItemProps) => {
  return (
    <Pressable style={styles.itemView} onPress={() => onPress && onPress(data)}>
      <EImage resizeMode={"cover"} source={{ uri: data?.thumbnail }} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    alignSelf: "center",
    aspectRatio: 2 / 1,
  },
  itemView: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    ...alignJustify(),
    backgroundColor: "#fff",
  },
});
