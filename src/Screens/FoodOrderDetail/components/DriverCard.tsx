/**
 * Hiển thị thông tin x.ế đang giao, khi hoàn thành hoặc bị huỷ sẽ k hiện
 * @param {Driver} driver
 * @method call
 * @method message
 */

import { AvatarDefault } from "@/assets/svg/AvatarDefaultSvg";
import { CallSvg } from "@/assets/svg/CallSvg";
import { MessageSvg } from "@/assets/svg/MessageSvg";
import { EImage } from "@/components/Image/EImage";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { boxShadow } from "@/styles/theme";
import { Driver } from "@/types/driver";
import { isEmpty } from "lodash";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DriverCardProps = {
  driver: Driver;
  onPressChat: () => void;
};

export const DriverCard = React.memo(
  ({ driver, onPressChat }: DriverCardProps) => {
    return (
      <RowView
        style={{
          ...boxShadow("rgba(0,0,0,0.08)", 0, 2, 4),
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 8,
        }}
      >
        {/* avatar */}
        <View>
          {isEmpty(driver) ? (
            <AvatarDefault size={40} />
          ) : (
            <View
              style={{
                width: 40,
                aspectRatio: 1,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <EImage source={{ uri: driver.avatar }} />
            </View>
          )}
        </View>

        {/* driver info */}
        <View style={{ marginLeft: 12, flex: 1 }}>
          {isEmpty(driver) && (
            <Typography
              style={{ fontSize: 12, lineHeight: 16 }}
              color="#5B5B5B"
            >
              Đang chờ bác tài tiếp nhận. Vui lòng chờ trong giây lát. Xin cảm
              ơn!
            </Typography>
          )}

          {!isEmpty(driver) && (
            <RowView style={{ justifyContent: "space-between" }}>
              <View>
                <Typography
                  style={{ fontSize: 12, lineHeight: 16 }}
                  color="#9FA0A0"
                >
                  Bác tài
                </Typography>
                <Typography
                  family="medium"
                  color="#000"
                  style={{ fontSize: 14, lineHeight: 20 }}
                >
                  {driver?.name}
                </Typography>
              </View>
              <RowView>
                {/* call btn */}
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${driver.phone}`);
                  }}
                  style={{ marginRight: 8 }}
                  activeOpacity={0.7}
                >
                  <CallSvg size={32} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressChat} activeOpacity={0.7}>
                  <MessageSvg size={32} />
                </TouchableOpacity>
              </RowView>
            </RowView>
          )}
        </View>
      </RowView>
    );
  }
);
