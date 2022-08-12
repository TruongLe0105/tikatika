import request from "@/utils/request";


export const categoryApi = {
    findAll: (params?) => request({
        url: '/v1/customer/category',
        params
    }),

}