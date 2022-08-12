import request from "@/utils/request";


export const bannerVideoApi = {
    findAll: (params?) => request({
        url: '/v1/customer/bannerVideo',
        params
    }),

}