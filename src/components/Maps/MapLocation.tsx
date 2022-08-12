import React from "react";

import { Text } from "native-base";
import { View, Image, StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  MapViewProps,
  Polyline as PL,
  LatLng,
  Region,
} from "react-native-maps";
import {
  SCREEN_WIDTH,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "@/styles/dimensions";
import { decodeDirection } from "@/utils/helper";
import { CustomMarker } from "./components/CustomMarker";
import { LocationSvg } from "@/assets/svg/LocationSvg";
import { appStyle, colors } from "@/styles/theme";
import { observer } from "mobx-react";
import { EImage } from "../Image/EImage";
import { DestinationPointSvg } from "@/assets/svg/DestinationPointSvg";
import { isEmpty } from "lodash";
import { StartPointSvg } from "@/assets/svg/StartPointSvg";

interface IAppProps extends MapViewProps {
  children?: any;
  startLocation?: LatLng;
  endLocation?: LatLng;
  carLocation?: LatLng;
  mapRef?: any;
  address?: string; // Địa chỉ trên label
  points?: string;
  typeStartMarker?: string;
  heading?: number;
  isShowCar?: boolean;
}

const initial: Region = {
  latitude: 10.7901843,
  longitude: 106.6499492,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const MapLocation = observer(
  ({
    children,
    startLocation,
    endLocation,
    carLocation,
    mapRef,
    points,
    initialRegion = initial,
    heading,
    isShowCar,
    ...props
  }: IAppProps) => {
    const arrDirection = points ? decodeDirection(points) : [];

    return (
      <MapView
        style={[styles.mapView, props.style]}
        initialRegion={{
          ...initialRegion,
          latitude: initialRegion?.latitude || initial.latitude,
          longitude: initialRegion?.longitude || initial.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        loadingEnabled={true}
        zoomEnabled={true}
        {...props}
      >
        {!isEmpty(startLocation) && (
          <CustomMarker
            coordinate={{
              latitude: startLocation.latitude,
              longitude: startLocation.longitude,
            }}
            anchor={{ x: 0.5, y: 0.9 }}
          >
            <StartPointSvg size={30} />
          </CustomMarker>
        )}

        {!isEmpty(endLocation) && (
          <CustomMarker
            coordinate={{
              latitude: endLocation.latitude,
              longitude: endLocation.longitude,
            }}
            anchor={{ x: 0.5, y: 0.9 }}
          >
            <DestinationPointSvg size={30} />
          </CustomMarker>
        )}

        {carLocation && (
          <CustomMarker
            coordinate={{
              latitude: carLocation.latitude,
              longitude: carLocation.longitude,
            }}
            rotation={heading}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={{ height: 60, aspectRatio: 1 / 1 }}>
              <Image
                source={require("@/assets/images/bike-map.png")}
                resizeMode={"cover"}
                style={appStyle.image}
              />
            </View>
          </CustomMarker>
        )}

        {points ? (
          <PL
            coordinates={arrDirection}
            strokeWidth={5}
            strokeColor={colors.primary}
          />
        ) : null}

        {children}
      </MapView>
    );
  }
);

export default MapLocation;

const styles = StyleSheet.create({
  mapView: {
    width: SCREEN_WIDTH,
    aspectRatio: 1 / 1,
  },
});
