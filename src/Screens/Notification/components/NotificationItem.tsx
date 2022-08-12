/**
 * Hiển thị thông báo của app
 * @param {Notification} notification
 * @param {Function} onPress gọi khi nhấn
 */

import { RightMenuNotificationSvg } from "@/assets/svg/RightMenuNotificationSvg";
import { TimeSvg } from "@/assets/svg/TimeSvg";
import { ShadowCard } from "@/components/Card/ShadowCard";
import Typography from "@/components/Text/Typography";
import { RowView } from "@/components/View/RowView";
import { colors } from "@/styles/theme";
import { Notification } from "@/types/notification";
import { formatDateTime } from "@/utils/helper";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type NotificationItemProps = {
  notification: Notification;
  onPress: (data: Notification) => void;
};

export const NotificationItem = ({
  notification,
  onPress,
}: NotificationItemProps) => {
  return (
    <Pressable onPress={() => onPress(notification)}>
      <ShadowCard style={{ padding: 12 }}>
        <RowView>
          <RightMenuNotificationSvg
            color={notification.isSeen ? colors.secondaryText : colors.primary}
          />
          <Typography
            preset="mediumLabel"
            color={notification.isSeen ? colors.secondaryText : "#000"}
            style={{ marginLeft: 8 }}
          >
            {notification.title}
          </Typography>
        </RowView>
        <Typography
          preset="smallParagraph"
          color={
            notification.isSeen ? colors.secondaryText : colors.regularText
          }
          style={{ marginTop: 8 }}
          numberOfLines={3}
          align="justify"
        >
          {notification.body}
        </Typography>

        <RowView style={{ marginTop: 8 }}>
          <TimeSvg color={colors.secondaryText} size={16} />
          <Typography style={{ marginLeft: 4 }}>
            {formatDateTime(notification.createdAt)}
          </Typography>
        </RowView>
      </ShadowCard>
    </Pressable>
  );
};
