import request from "@/utils/request";


export const addressCityApi = {
    findAll: (params?) => request({
        url: '/v1/customer/addressCity',
        params
    }),

}