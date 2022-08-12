import request from "@/utils/request";


export const menuApi = {
    findAll: (params?) => request({
        url: '/v1/customer/menu',
        params
    }),

}