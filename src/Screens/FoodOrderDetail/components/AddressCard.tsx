/**
 * Hiển thị điểm giao, nhận
 * @param {string} startAddress
 * @param {string} startRoute
 * @param {string} endAddress
 * @param {string} endRoute
 */

import { LocationSvg } from "@/assets/svg/LocationSvg";
import { StartPointSvg } from "@/assets/svg/StartPointSvg";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { boxShadow, colors } from "@/styles/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Dash from "react-native-dash";

type AddressCardProps = {
  startAddress: string;
  startRoute: string;
  endAddress: string;
  endRoute: string;
};

export const AddressCard = React.memo(
  ({ endAddress, endRoute, startAddress, startRoute }: AddressCardProps) => {
    return (
      <View
        style={{
          ...boxShadow("rgba(0,0,0,0.08)", 0, 2, 4),
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* start location */}
        <RowView>
          <Dash
            style={{
              width: 70,
              height: 1,
              left: -25,
              position: "absolute",
              top: 70,
              zIndex: 1,
              transform: [
                {
                  rotate: "-90deg",
                },
              ],
            }}
            dashColor={colors.background}
            dashThickness={1}
            dashGap={2}
            dashLength={5}
          />
          <View style={{ marginRight: 12, zIndex: 2 }}>
            <StartPointSvg size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography color="#9FA0A0" size={10} lineHeight={15}>
              Quán ăn
            </Typography>
            <Typography
              size={14}
              lineHeight={20}
              family="medium"
              color="#2196F3"
            >
              {startRoute}
            </Typography>
            <Typography color="#5B5B5B" size={12} family="medium">
              {startAddress}
            </Typography>
          </View>
        </RowView>
        {/* end location */}
        <RowView style={{ marginTop: 16 }}>
          <View style={{ marginRight: 12 }}>
            <LocationSvg size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Typography color="#9FA0A0" size={10} lineHeight={15}>
              Giao đến
            </Typography>
            <Typography
              size={14}
              lineHeight={20}
              family="medium"
              color="#FD6C9F"
            >
              {endRoute}
            </Typography>
            <Typography color="#5B5B5B" size={12} family="medium">
              {endAddress}
            </Typography>
          </View>
        </RowView>
      </View>
    );
  }
);
