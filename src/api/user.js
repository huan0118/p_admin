import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/power-admin/user/login",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: data
  });
}

export function getInfo() {
  return request({
    url: "/power-admin/routes",
    method: "get"
  });
}

export function logout() {
  return request({
    url: "/power-admin/user/logout",
    method: "post"
  });
}
