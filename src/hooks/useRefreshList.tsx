import React, { useEffect, useState } from "react";
import moment from "moment";
import { RefreshControl } from "react-native";
import { colors } from "@/styles/theme";

export const useRefreshList = (data) => {
  const [refresh, setRefresh] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setRefresh({
      refreshControl,
      onEndReachedThreshold,
      onEndReached,
    });
  }, []);

  const refreshControl = (
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={() => {
        setIsRefreshing(true);
        data.refreshList().finally(() => setIsRefreshing(false));
      }}
    />
  );
  const onEndReachedThreshold = 0.3;
  const onEndReached = () => {
    setIsRefreshing(true);
    data.fetchList().finally(() => setIsRefreshing(false));
  };

  return [refresh];
};
