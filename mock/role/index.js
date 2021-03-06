/* eslint-disable no-unused-vars */
const Mock = require("mockjs");
const { deepClone } = require("../utils");
const { treeRoutes } = require("./routes.js");

const routes = deepClone(treeRoutes);
function rolesFilter(query, treeRoutes) {
  let res = null;
  for (const iterator of treeRoutes) {
    if (iterator.authority) {
      for (const item of iterator.authority) {
        if (item.responsibilityId === +query.responsibilityId) {
          console.log(item);
          return item;
        }
      }
    } else {
      if (iterator.children) {
        res = rolesFilter(query, iterator.children);
      }
    }
  }
  return res;
}

module.exports = [
  // mock get all routes form server
  {
    url: "/power-admin/routes",
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: routes
      };
    }
  },
  // mock get all roles form server
  {
    url: "/power-admin/query/roles",
    type: "get",
    response: _ => {
      // console.log(_.query);
      let res = rolesFilter(_.query, deepClone(treeRoutes));
      return {
        code: 20000,
        data: res
      };
    }
  },

  // add role
  {
    url: "/power-admin/role",
    type: "post",
    response: {
      code: 20000,
      data: {
        key: Mock.mock("@integer(300, 5000)")
      }
    }
  },

  // update role
  {
    url: "/power-admin/role/[A-Za-z0-9]",
    type: "put",
    response: {
      code: 20000,
      data: {
        status: "success"
      }
    }
  },

  // delete role
  {
    url: "/power-admin/role/[A-Za-z0-9]",
    type: "delete",
    response: {
      code: 20000,
      data: {
        status: "success"
      }
    }
  }
];
