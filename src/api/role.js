import request from "@/utils/request";

export function getRoutes() {
  return request({
    url: "/power-admin/query/roles",
    method: "get",
    params: {
      responsibilityId: 12
    }
  });
}

export function getRoles() {
  return request({
    url: "/power-admin/roles",
    method: "get"
  });
}

export function addRole(data) {
  return request({
    url: "/power-admin/role",
    method: "post",
    data
  });
}

export function updateRole(id, data) {
  return request({
    url: `/power-admin/role/${id}`,
    method: "put",
    data
  });
}

export function deleteRole(id) {
  return request({
    url: `/power-admin/role/${id}`,
    method: "delete"
  });
}
