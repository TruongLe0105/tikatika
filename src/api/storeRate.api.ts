import request from "@/utils/request";


export const storeRateApi = {
    findAll: (params?) => request({
        url: '/v1/customer/storeRate',
        params
    }),
    summary: (id?) => request({
        url: `/v1/customer/storeRate/${id}/summary`,
    }),
    findAllOwn: (params?) => request({
        url: '/v1/customer/storeRate/own',
        params
    }),
    rateOrder: (data) => request({
        url: '/v1/customer/storeRate/order',
        method: 'post',
        data
    }),
    rateStore: (data) => request({
        url: '/v1/customer/storeRate/store',
        method: 'post',
        data
    }),
    report: (id, data) => request({
        url: `/v1/customer/storeRate/${id}/report`,
        method: 'post',
        data
    })
}