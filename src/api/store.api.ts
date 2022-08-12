import request from "@/utils/request";


export const storeApi = {
    findAll: (params?) => request({
        url: '/v1/customer/store',
        params
    }),
    findOne: (id?) => request({
        url: `/v1/customer/store/${id}`,
    }),
    findAllFavorite: (params?) => request({
        url: '/v1/customer/store/favorite',
        params
    }),
    favorite: (id) => request({
        url: `/v1/customer/store/${id}/favorite`,
        method: 'post'
    }),
    unFavorite: (id) => request({
        url: `/v1/customer/store/${id}/unfavorite`,
        method: 'post'
    })
}