import request from "@/utils/request";


export const bannerApi = {
    findAll: (params?) => request({
        url: '/v1/customer/banner',
        params
    }),

}