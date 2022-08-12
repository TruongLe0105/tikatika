import request from "@/utils/request";


export const storeVideoApi = {
    findAll: (params?) => request({
        url: '/v1/customer/storeVideo',
        params
    }),
    viewIncrease: (id, data?) => request({
        url: `/v1/customer/storeVideo/${id}/view/increase`,
        method: 'post',
        data
    }),
}