import { BASE_URL } from "@/config";
import request from "@/utils/request";
import Axios from "axios";

export const userApi = {
    findAll: (params?) => request({
        url: '/user/v1/users',
        params
    }),
    getInfo: () => request({
        url: '/user/v1/users'
    }),

    findOne: (id) => request({
        url: `/user/v1/users/${id}`,
    }),
    checkExist: (token) => Axios.get('/user/v1/users', {
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }),
    create: (data, token) => request({
        url: `/user/v1/users`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'post'
    }),

    update: (data, token) => request({
        url: `/user/v1/users`,
        data,
        method: 'put',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }),
    delete: (id) => request({
        url: `/user/v1/users/${id}`,
        method: 'delete'
    }),
    search: (params?) => request({
        url: '/user/v1/users/search',
        params
    }),
    suggestion: (params?) => request({
        url: '/user/v1/users/suggestion',
        params
    }),
}