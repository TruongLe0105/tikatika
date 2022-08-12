import request from "@/utils/request";


export const customerTransactionApi = {
    findAll: (params?) => request({
        url: '/v1/customer/customerTransaction',
        params
    }),

}