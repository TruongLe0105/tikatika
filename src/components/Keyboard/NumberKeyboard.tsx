import React from "react";
import { View, FlatList, NetInfo } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SFTextBold, SFTextSemiBold } from "../Text";
import { REM, SCREEN_WIDTH, PADDING_BOTTOM } from "@/styles/dimensions";
import BackSpaceSvg from "@/assets/svg/BackSpaceSvg";
import { Grid, Col } from "native-base";
import { primary } from "@/styles/color";

interface NumberKeyboardProps {
  onResult: (arg0: any) => void;
  text: string;
}

enum Number {
  number0 = "0",
  number1 = "1",
  number2 = "2",
  number3 = "3",
  number4 = "4",
  number5 = "5",
  number6 = "6",
  number7 = "7",
  number8 = "8",
  number9 = "9",
  numberReset = "10",
  numberRemove = "11"
}

const data = [
  {
    title: "1",
    value: Number.number1
  },
  {
    title: "2",
    value: Number.number2
  },
  {
    title: "3",
    value: Number.number3
  },
  {
    title: "4",
    value: Number.number4
  },
  {
    title: "5",
    value: Number.number5
  },
  {
    title: "6",
    value: Number.number6
  },
  {
    title: "7",
    value: Number.number7
  },
  {
    title: "8",
    value: Number.number8
  },
  {
    title: "9",
    value: Number.number9
  },
  {
    title: "Làm mới",
    value: Number.numberReset
  },
  {
    title: "0",
    value: Number.number0
  },
  {
    title: "remove",
    value: Number.numberRemove
  }
];

const NumberKeyboard = ({ onResult, text = "" }: NumberKeyboardProps) => {
  const convertKeyboardToText = (value: string): string => {
    if (text == "0") {
      text = "";
    }

    if (value == Number.numberRemove) {
      text = text.slice(0, -1);
    }

    if (value != Number.numberRemove && value != Number.numberReset) {
      text += value;
    }

    if (text == "" || text == "00" || value == Number.numberReset) {
      text = "";
      return "0";
    }

    return text;
  };

  return (
    <Grid
      style={{
        paddingTop: 15,
        paddingHorizontal: 10,
        backgroundColor: "#FCFCFC"
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NumberKeyboardItem
            data={item}
            onPress={value => onResult(convertKeyboardToText(value))}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 10 + PADDING_BOTTOM }}
      />
    </Grid>
  );
};

export default NumberKeyboard;

const NumberKeyboardItem = ({ data, onPress }) => {
  return (
    <Col>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(data.value)}
        style={{
          height: 55 * REM,
          borderRadius: 6 * REM,
          backgroundColor: "#F5F6FA",
          borderWidth: 1,
          borderColor: "#EAEDF5",
          alignItems: "center",
          justifyContent: "center",
          margin: 5 * REM
        }}
      >
        <NumberKeyboardText data={data} />
      </TouchableOpacity>
    </Col>
  );
};

const NumberKeyboardText = ({ data }) => {
  if (data.value == Number.numberReset) {
    return (
      <SFTextSemiBold style={{ fontSize: 13 * REM, color: primary }}>
        {data.title}
      </SFTextSemiBold>
    );
  }

  if (data.value == Number.numberRemove) {
    return <BackSpaceSvg />;
  }

  return (
    <SFTextBold style={{ fontSize: 17 * REM, color: primary }}>
      {data.title}
    </SFTextBold>
  );
};
