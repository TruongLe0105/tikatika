import request from "@/utils/request";


export const mediaApi = {
    findAll: (params?) => request({
        url: '/v1/customer/media',
        params
    }),

}