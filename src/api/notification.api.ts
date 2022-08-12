import request from "@/utils/request";


export const notificationApi = {
    findAll: (params?) => request({
        url: '/v1/customer/notification',
        params
    }),

}