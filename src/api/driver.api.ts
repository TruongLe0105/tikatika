import request from "@/utils/request";



export const driverApi = {
    getGps: (params?) => request({
        url: '/v1/customer/driver/gps',
        params
    }),

}