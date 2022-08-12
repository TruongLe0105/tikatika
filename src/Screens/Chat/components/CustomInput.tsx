import Typography from "@/components/Text/Typography";
import React from "react";
import { InputToolbar } from "react-native-gifted-chat";

export const CustomInput = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#fff",
        paddingRight: 20,
        paddingLeft: 10,
        paddingVertical: 10,
      }}
      accessoryStyle={{ height: 50 }}
      primaryStyle={{ alignItems: "center" }}
    >
      <Typography style={{ position: "absolute" }}>Ok input</Typography>
    </InputToolbar>
  );
};
