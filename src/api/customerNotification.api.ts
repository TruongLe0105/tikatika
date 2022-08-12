import request from "@/utils/request";


export const customerNotificationApi = {
    findAll: (params?) => request({
        url: '/v1/customer/customerNotification',
        params
    }),
    seen: (notificationCustomerId) => request({
        url: `/v1/customer/customerNotification/${notificationCustomerId}/seen`,
        method: 'post',
    }),
    seenAll: () => request({
        url: `/v1/customer/customerNotification/seen/all`,
        method: 'post',
    }),
    totalUnseen: () => request({
        url: '/v1/customer/customerNotification/total/unseen',
    })
}