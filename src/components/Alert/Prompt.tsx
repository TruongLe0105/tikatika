import { border } from "@/styles/border";
import { colors } from "@/styles/theme";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import Typography from "../Text/Typography";

type PromptProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
};

export const Prompt = ({
  visible,
  onClose,
  title,
  description,
}: PromptProps) => {
  const [value, setValue] = React.useState("");

  return (
    <Dialog
      dialogStyle={[
        {
          backgroundColor: "#fff",
          borderRadius: 8,
        },
      ]}
      visible={visible}
      title={""}
      onTouchOutside={onClose}
    >
      <View style={{}}>
        <Typography
          style={{ textAlign: "center" }}
          size={14}
          lineHeight={20}
          color="#000"
          family="medium"
        >
          {title}
        </Typography>
        {!!description && (
          <Typography
            style={{ textAlign: "center" }}
            size={14}
            lineHeight={21}
            color="#000"
          >
            {description}
          </Typography>
        )}

        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            height: 50,
            width: "100%",
            borderRadius: 8,
            ...border(1, colors.borderBase),
          }}
        >
          <TextInput
            placeholder={""}
            placeholderTextColor={colors.placeholder}
            onChangeText={(text) => setValue(text)}
            value={value}
            style={{
              fontFamily: "text-regular",
              fontSize: 16,
              color: colors.primaryText,
              flex: 1,
            }}
          />
        </View>
      </View>
    </Dialog>
  );
};
