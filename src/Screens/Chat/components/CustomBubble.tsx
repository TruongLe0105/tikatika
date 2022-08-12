import React from "react";
import { Bubble } from "react-native-gifted-chat";
import { CustomTime } from "./CustomTime";

export const CustomBubble = (props) => {
    return (
        <Bubble
            {...props}
            renderTime={CustomTime}
            wrapperStyle={{
                left: { backgroundColor: "transparent" },
                right: { backgroundColor: "transparent" },
            }} />
    );
};
