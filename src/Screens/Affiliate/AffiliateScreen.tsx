import { contentDefineApi, ContentDefineType } from "@/api/contentDefine.api";
import { customerApi } from "@/api/customer.api";
import { Loading } from "@/components/Loading/Loading";
import { EScreen } from "@/components/Screen/EScreen";
import { userStore } from "@/store/userStore";
import { Affiliate } from "@/types/affilicate";
import React, { useEffect, useRef, useState } from "react";
import { Platform, Share, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AffiliateList } from "./components/AffiliateList";
import { SharePanel } from "./components/SharePanel";

export const AffiliateScreen = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const contentShare = useRef("");
  const search = useRef("");

  useEffect(() => {
    fetchContentShare();
    fetchAffiliate();
  }, []);

  const fetchContentShare = async () => {
    try {
      // Loading.load();
      const res = await contentDefineApi.find({
        type: ContentDefineType.ShareAppCustomer,
      });

      contentShare.current = res.data.body;
    } finally {
      // Loading.hide();
    }
  };

  const handleShare = async () => {
    try {
      let content = contentShare.current;
      if (!content) {
        await fetchContentShare();
        const res = await contentDefineApi.find({
          type: ContentDefineType.ShareAppCustomer,
        });
        content = res.data.body;
      }
      const message = content.replace(/\{code\}/g, userStore.info.code);
      const result = await Share.share({
        message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = (text) => {
    search.current = text;
    fetchAffiliate();
  };

  const fetchAffiliate = async () => {
    const res = await customerApi.affiliate({ search: search.current });
    setAffiliates(res.data.children);
  };

  return (
    <EScreen
      headerTitle="Giới thiệu bạn bè"
      showHeaderTool
      edges={["bottom"]}
      style={{ flex: 1, padding: 16 }}
    >
      {/* Mã giới thiệu, nút share */}
      <SharePanel code={userStore.info.code} onPress={handleShare} />

      {/* ds ng gioi thieu */}
      <AffiliateList affiliates={affiliates} onSearch={handleSearch} />
    </EScreen>
  );
};
