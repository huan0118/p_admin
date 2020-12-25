import request from "@/utils/request";

export function getResources(data) {
  return request({
    url: "/power-admin/query/resources",
    method: "get",
    data
  });
}
