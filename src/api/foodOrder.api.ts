import request from "@/utils/request";


export const foodOrderApi = {
  findAll: (params) => request({
    url: '/v1/customer/order',
    params
  }),
  findOne: (id) => request({
    url: `/v1/customer/order/${id}`,
  }),
  invoice: (id, params) => request({
    url: `/v1/customer/order/${id}/invoice`,
    params
  }),
  chat: (id, data) => request({
    url: `/v1/customer/order/${id}/chat`,
    method: 'post',
    data
  }),
  findAllChat: (id) => request({
    url: `/v1/customer/order/${id}/chat`,

  }),
  cancel: (id) => request({
    url: `/v1/customer/order/${id}/cancel`,
    method: 'post'
  }),
  est: (data) => request({
    url: '/v1/customer/order/estimate',
    data,
    method: 'post'
  }),
  create: (data) => request({
    url: '/v1/customer/order',
    data,
    method: 'post'
  }),
  rate: (id, data) => request({
    url: `/v1/customer/order/${id}/rate`,
    data,
    method: 'post'
  }),
  lastOrder: () => request({
    url: '/v1/customer/order/last',
  }),
}
