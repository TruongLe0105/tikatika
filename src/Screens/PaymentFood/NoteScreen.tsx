/**
 * Màn hình chỉnh sửa ghi chú
 * @param {string} note //get từ route
 * @param {Function} onDone //call khi update done
 */

import { EButton } from "@/components/Button/EButton";
import { EInput } from "@/components/Input/EInput";
import { KeyboardSpacer } from "@/components/Keyboard/KeyboardSpacer";
import { EScreen } from "@/components/Screen/EScreen";
import React, { useEffect, useState } from "react";
import { Keyboard, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaymentFoodHeader } from "./components/PaymentFoodHeader";

export const NoteScreen = ({ route }) => {
  const [note, setNote] = useState(route.params?.note || "");
  const onDone: (val: string) => void = route.params.onDone;

  let timer = null;
  let firstPress = true;
  let delayTime = 1000;
  let lastTime = new Date().getTime();

  useEffect(() => {
    return () => {
      timer && clearTimeout(timer);
    };
  }, [timer]);

  const _onTap = () => {
    // get the instance of time when pressed
    let now = new Date().getTime();

    if (firstPress) {
      // set the flag indicating first press has occured
      firstPress = false;

      //start a timer --> if a second tap doesnt come in by the delay, trigger singleTap event handler
      timer = setTimeout(() => {
        // reset back to initial state
        firstPress = true;
        timer = false;
      }, delayTime);

      // mark the last time of the press
      lastTime = now;
    } else {
      //if user pressed immediately again within span of delayTime
      if (now - lastTime < delayTime) {
        // clear the timeout for the single press
        timer && clearTimeout(timer);
        Keyboard.dismiss();
        // reset back to initial state
        firstPress = true;
      }
    }
  };

  return (
    <EScreen
      headerTitle="Ghi Chú"
      showHeaderTool
      edges={["bottom"]}
      style={{ flexGrow: 1 }}
    >
      <EInput
        placeholder="Bạn có muốn dặn dò thêm gì không?"
        value={note}
        inputStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          height: "100%",
        }}
        onChangeText={setNote}
        multiline
        style={{ height: "100%", textAlignVertical: "top" }}
        containerStyle={{ flex: 1 }}
        onTouchEndCapture={_onTap}
        maxLength={300}
      />

      <View style={{ padding: 16 }}>
        <EButton text="Xong" onPress={() => onDone(note)} />
      </View>

      {Platform.OS === "ios" && <KeyboardSpacer />}
    </EScreen>
  );
};
