import axios from "axios";
import { BASE_URL, Version } from "@/config";
import { LocalStorage } from "./LocalStorage";
import { Toast } from "native-base";
import appStore from "@/store/appStore";
import { SCREEN_WIDTH } from "@/styles/dimensions";


// Create an axios instance
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000, // request timeout
  headers: {
    version: Version
  }
});

// request interceptor 
service.interceptors.request.use(
  async config => {
    // do something before request is sent

    let token: string = appStore.token

    // console.log('log token', token);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZSI6IkNVU1RPTUVSIiwiaWEiOjE2MzA5OTcwMjgsImlhdCI6MTYzMDk5NzAyOCwiZXhwIjoxNjYyMTAxMDI4fQ.pbz4NZvb4-D32ja3kpjggUMqS1JFmXYba5nVjQRCz_Q

    config.headers["token"] = token;

    return config;
  },
  error => {
    console.log(error); // for debug

    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    // debugger;

    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      alert(res.message);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log('err req', JSON.stringify(error));
    let status = error.response ? error.response.status : false;
    let message;
    if (status) {
      if (!__DEV__ && status == 500) {
        message = "Đã xảy ra lỗi ở máy chủ!";
      } else {
        message = error.response.data.message;
      }
      message = error.response.data.message;
      console.log('message req err', message);

      if (error.response.status === 401) {
        LocalStorage.remove("token");
        appStore.setToken('')
        // Navigation.navigate("RegisterNavigator");
      }
    } else {
      message = "Vui lòng kiểm tra kết nối mạng!";
    }
    Toast.closeAll();
    Toast.show({ status: 'error', title: message, duration: 5000, width: SCREEN_WIDTH })
    return Promise.reject(error);
  }
);

export default service;
export { service as request }
