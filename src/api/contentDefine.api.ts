import request from "@/utils/request";

export enum ContentDefineType {
  About = "ABOUT", // Gioi thieu
  Faq = "FAQ", // Cac van de thuong gap
  HowToUse = "HOW_TO_USE", // Huong dan su dung
  Security = "SECURITY", // Chinh sach bao mat
  TermCondition = "TERM_CONDITION", // Dieu khoan su dung
  ShareAppCustomer = 'SHARE_APP_CUSTOMER',
}

export interface IContentDefine {
  id?: number,
  createdAt?: number,
  updatedAt?: number,
  title?: string,
  image?: string,
  body?: string,
  type?: string
}

export const contentDefineApi = {
  find: (params) => request({
    url: '/v1/customer/contentDefine',
    params
  }),
}