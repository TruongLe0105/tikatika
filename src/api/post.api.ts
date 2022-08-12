import request from "@/utils/request";
import { Platform } from "react-native";


export const postApi = {
    findAll: (params?) => request({
        url: '/v1/customer/post',
        params
    }),
    findFavorite: (params?) => request({
        url: '/v1/customer/post/favorite',
        params
    }),
    showOn: (postId) => request({
        url: `/v1/customer/post/${postId}/isShow/on`,
        method: 'post'
    }),
    showOff: (postId) => request({
        url: `/v1/customer/post/${postId}/isShow/off`,
        method: 'post'
    }),
    findOne: (postId) => request({
        url: `/v1/customer/post/${postId}`,
    }),
    like: (postId) => request({
        url: `/v1/customer/post/${postId}/like`,
        method: 'post'
    }),
    unlike: (postId) => request({
        url: `/v1/customer/post/${postId}/unlike`,
        method: 'post'
    }),
    findAllOwn: (params?) => request({
        url: '/v1/customer/post/own',
        params
    }),
    create: (data) => request({
        url: '/v1/customer/post',
        data,
        method: 'post'
    }),
    update: (postId, data) => request({
        url: `/v1/customer/post/${postId}/update`,
        data,
        method: 'post'
    }),
    uploadImage: (image) => {
        const data = <any>new FormData();
        data.append("file", {
            uri: Platform.OS === "android" ? image : image.replace("file://", ""),
            name: Math.floor(Math.random() * Math.floor(999999999)) + ".jpg",
            type: "image/*",
        });

        return request({
            url: "/v1/customer/post/upload",
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
            data,
        });
    },

}