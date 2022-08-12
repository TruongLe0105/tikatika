import React from "react";
import { Send } from "react-native-gifted-chat";
import { colors } from "@/styles/theme";
import { SendSvg } from "@/assets/svg/SendSvg";

export const CustomSend = (props) => {
    return (
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width: 25,
                height: 25,
            }}
        >
            <SendSvg size={25} color={colors.primary} />
        </Send>
    );
};
