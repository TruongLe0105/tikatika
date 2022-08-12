import request from "@/utils/request";
import { Platform } from "react-native";


export const authApi = {
    signup: (data) => request({
        url: '/v1/customer/auth/signup',
        data,
        method: 'post',
    }),
    profile: ({ fcmToken }) => request({
        url: '/v1/customer/auth/profile',
        headers: {
            fcmToken
        }
    }),
    updateProfile: (data) => request({
        url: '/v1/customer/auth/profile',
        data,
        method: 'post'
    }),
    updatePassword: (data) => request({
        url: '/v1/customer/auth/password/update',
        data,
        method: 'post'
    }),
    checkExistPhone: (data) => request({
        url: '/v1/customer/auth/phone/exist',
        method: 'post',
        data
    }),
    checkRegister: (data) => request({
        url: '/v1/customer/auth/check-signup',
        method: 'post',
        data
    }),
    login: (data) => request({
        url: '/v1/customer/auth/login',
        method: 'post',
        data
    }),
    loginFb: (data) => request({
        url: '/v1/customer/auth/login/fb',
        method: 'post',
        data
    }),
    loginZalo: (data) => request({
        url: '/v1/customer/auth/login/zalo',
        method: 'post',
        data
    }),
    loginGoogle: (data) => request({
        url: '/v1/customer/auth/login/google',
        method: 'post',
        data
    }),
    loginApple: (data) => request({
        url: '/v1/customer/auth/login/apple',
        method: 'post',
        data
    }),
    checkOTP: ({ otp, phone }) => request({
        url: `/v1/customer/auth/otp/exist`,
        method: "post",
        data: { otp, phone },
    }),
    getOTP: ({ phone }) => request({
        url: "/v1/customer/auth/otp",
        params: { phone }
    }),
    forgotPassword: (data) => request({
        url: "/v1/customer/auth/password/forgot",
        data,
        method: "post",
    }),
    forgotPasswordConfirm: (data) => request({
        url: "/v1/customer/auth/password/forgot/confirm",
        data,
        method: "post",
    }),
    logout: () => request({
        url: "/v1/customer/auth/logout",
        method: "post",
    })
}