import request from "@/utils/request";


export const newsCategoryApi = {
    findAll: (params?) => request({
        url: '/v1/customer/newsCategory',
        params
    }),

}