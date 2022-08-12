import request from "@/utils/request";


export const couponApi = {
    findAll: (params?) => request({
        url: '/v1/customer/coupon',
        params
    }),

}