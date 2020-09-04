import request from "@/utils/request";
// import { join } from 'core-js/fn/array'

export function login(data) {
  return request({
    url:
      process.env.VUE_APP_LOCAL_API + "/api/baseServer/baseLoginService/login",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: data
  });
}

export function getInfo() {
  return request({
    url: "/admins/get-menu-routes",
    method: "get"
    // params: { sign: process.env.VUE_APP_API_KEY, except_field: 'sign' }
  });
}

export function logout() {
  return request({
    url: "/admins/logout",
    method: "post"
  });
}

export function setids(data) {
  return request({
    url: "/user/setids",
    method: "post",
    data
  });
}

export function getcaptcha(data) {
  return request({
    url: "/admins/captcha",
    method: "get",
    params: data
  });
}
