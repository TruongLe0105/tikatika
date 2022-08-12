import request from "@/utils/request";


export const addressDistrictApi = {
    findAll: (params?) => request({
        url: '/v1/customer/addressDistrict',
        params
    }),

}