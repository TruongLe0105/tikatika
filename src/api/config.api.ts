import request from "@/utils/request";


export const configApi = {
  findAll: ({ param }) => request({
    url: '/v1/customer/configuration',
    params: {
      param
    }
  }),

}
