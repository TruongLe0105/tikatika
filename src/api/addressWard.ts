import request from "@/utils/request";


export const addressWardApi = {
    findAll: (params?) => request({
        url: '/v1/customer/addressWard',
        params
    }),

}