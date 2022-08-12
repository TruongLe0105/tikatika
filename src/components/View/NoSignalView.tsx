import { useNetwork } from "@/hooks/useNetwork";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { alignJustify } from "@/styles/theme";
import { WifiSvg } from "@/assets/svg/WifiSvg";
import Typography from "../Text/Typography";
import { EButton } from "../Button/EButton";
import { Toast } from "native-base";

export default function NoSignalView() {
  const [isNetworkConnected, isConnectSlow, connectionType] = useNetwork();
  const [connected, setConnected] = useState(true);

  console.log("NETCONNECT isNetworkConnected", isNetworkConnected);

  useEffect(() => {
    setConnected(isNetworkConnected);
  }, [isNetworkConnected]);

  const handleRefresh = async () => {
    try {
      const status = await NetInfo.fetch();
      console.log("NETCONNECT status refresh:", status);
      setConnected(status.isConnected);
    } catch (err) {
      console.log("NETCONNECT err refresh:", JSON.stringify(err));
    }
  };

  if (connected != false) {
    return null;
  }

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#fff",
        ...alignJustify(),
      }}
    >
      <WifiSvg size={80} />
      <Typography
        size={20}
        lineHeight={24}
        family="bold"
        color={"#000"}
        style={{ marginTop: 16 }}
      >
        Ui, mất kết nối mạng rồi!
      </Typography>
      <Typography
        size={16}
        lineHeight={24}
        colorPreset="secondaryText"
        style={{ marginTop: 4 }}
      >
        Bạn hãy kiểm tra lại kết nối mạng nhé!
      </Typography>
      <EButton
        text={"Thử lại"}
        containerStyle={{ paddingVertical: 8 }}
        style={{ marginTop: 24 }}
        onPress={handleRefresh}
      />
    </View>
  );
}
