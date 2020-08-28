import axios from "axios";
import { MessageBox, Notification } from "element-ui";
import store from "@/store";

axios.defaults.withCredentials = false;
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers["Certificate"] = store.getters.token;
    }
    // 处理sign
    // if (config.data) {
    //   config.data = signPrams(config.data);
    // }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 20000) {
      // 401: Illegal token;
      if (+res.code === 401) {
        // to re-login
        MessageBox.confirm("您的登入信息已失效", "是否注销", {
          confirmButtonText: "重新登入",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            store.dispatch("user/resetToken").then(() => {
              location.reload();
            });
          })
          .catch(err => {
            console.warn(err);
          });
      } else {
        Notification({
          message: res.message || "Error",
          type: "error",
          duration: 5 * 1000
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    try {
      Notification({
        message: error.message || "服务繁忙",
        type: "error",
        duration: 0
      });
    } catch (error) {
      console.warn(error);
    }

    return Promise.reject(error);
  }
);

export default service;
