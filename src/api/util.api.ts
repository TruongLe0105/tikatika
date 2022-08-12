import request from "@/utils/request";


export const utilApi = {
    findAll: (params?) => request({
        url: '/v1/customer/util',
        params
    }),

}