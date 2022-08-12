import request from "@/utils/request";


export const newsApi = {
    findAll: (params?) => request({
        url: '/v1/customer/customerNews',
        params
    }),
    findOne: (id) => request({
        url: `/v1/customer/customerNews/${id}`,
    }),

}