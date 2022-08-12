import request from "@/utils/request";
import { Platform } from "react-native";


export const customerApi = {
    affiliate: (params?) => request({
        url: '/v1/customer/customer/affiliate/children',
        params
    }),
    uploadImage: (image) => {
        const data = <any>new FormData();
        data.append("file", {
            uri: Platform.OS === "android" ? image : image.replace("file://", ""),
            name: Math.floor(Math.random() * Math.floor(999999999)) + ".jpg",
            type: "image/*",
        });

        return request({
            url: "/v1/customer/customer/upload",
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
            data,
        });
    },
}