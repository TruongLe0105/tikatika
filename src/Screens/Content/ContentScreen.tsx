import React, { useEffect, useState } from "react";
import { colors } from "@/styles/theme";
import AutoHeightWebView from "react-native-autoheight-webview";
import { SCREEN_WIDTH } from "@/styles/dimensions";
import { contentDefineApi, IContentDefine } from "@/api/contentDefine.api";
import { Navigation } from "@/utils/Navigation";
import { EScreen } from "@/components/Screen/EScreen";

export const ContentScreen = ({ route }) => {
  const [type] = useState(route.params && route.params.type);
  const [data, setData] = useState<IContentDefine>({
    title: " ",
    body: "",
  });
  console.log("type", type);

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    const res = await contentDefineApi.find({ type });
    setData(res.data);
  };

  return (
    <EScreen
      headerTitle={data?.title}
      showHeaderTool
      edges={["bottom"]}
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      <AutoHeightWebView
        originWhitelist={["*"]}
        source={{
          html: `<div class="body">${data?.body}</div>`,
        }}
        customStyle={`
            * {
              font-family: 'Roboto', sans-serif;
            }
            p {
              font-style: normal;
              font-weight: normal;
              font-size: 18px;
              line-height: 27px;
              color: ${colors.primaryText};
            }
            .body {
              background-color: transparent
            }
          `}
        startInLoadingState={true}
        style={{
          width: SCREEN_WIDTH - 32,
          backgroundColor: "transparent",
        }}
        contentInset={{ top: 16 }}
      />
    </EScreen>
  );
};
