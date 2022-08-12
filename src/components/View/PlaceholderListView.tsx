import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { REM } from "@/styles/dimensions";
import { useCountDown } from "@/hooks/useCountdown";
import { Card } from "../Card/Card";
import { ShadowCard } from "../Card/ShadowCard";

export const PlaceholderListView = ({ enableShadow = true }) => {
  const [timeLeft, start, stopTime] = useCountDown(3);

  useEffect(() => {
    start();
    return () => {
      stopTime();
    };
  }, []);

  if (timeLeft == 0) {
    return null;
  }
  return (
    <FlatList
      data={[{}, {}, {}, {}, {}]}
      renderItem={({}) =>
        enableShadow ? (
          <ShadowCard style={{ padding: 20, marginBottom: 20 }}>
            <Placeholder Left={PlaceholderMedia} Animation={Fade}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
          </ShadowCard>
        ) : (
          <Card style={{ padding: 20, marginBottom: 20 }}>
            <Placeholder Left={PlaceholderMedia} Animation={Fade}>
              <PlaceholderLine width={80} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
          </Card>
        )
      }
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 * REM }}
    />
  );
};
