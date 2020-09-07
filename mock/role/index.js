/* eslint-disable no-unused-vars */
const Mock = require("mockjs");
const { deepClone } = require("../utils");
const { treeRoutes } = require("./routes.js");

const routes = deepClone(treeRoutes);
// let map = [];
// function flat(arr, num, res = []) {
//   for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     if (index !== num) {
//       res.push(element);
//     }
//   }
//   map.push(res);
//   num--;
//   if (num < 0) {
//     return;
//   } else {
//     flat(arr, num);
//   }
// }
// flat(Buttons, 3);
// console.log(map);

// function set(routes) {
//   for (const iterator of routes) {
//     if (iterator.authority && !iterator.authority.length) {
//       iterator.authority = Mock.mock({
//         "array|1-3": [
//           {
//             responsibilityCode: `Code-${Mock.mock("@id()")}`,
//             responsibilityId: Mock.mock("@id()"),
//             Buttons: Buttons.slice(Mock.mock("@integer(0, 3)"))
//           }
//         ]
//       });
//       console.log(iterator.menuName);
//     }
//     if (iterator.children && iterator.children.length) {
//       set(iterator.children);
//     }
//   }
// }

// set(routes);
// const roles = [
//   {
//     key: "admin",
//     name: "admin",
//     description: "Super Administrator. Have access to view all pages.",
//     routes: routes
//   },
//   {
//     key: "editor",
//     name: "editor",
//     description: "Normal Editor. Can see all pages except permission page",
//     routes: routes.filter(i => i.path !== "/permission") // just a mock
//   },
//   {
//     key: "visitor",
//     name: "visitor",
//     description:
//       "Just a visitor. Can only see the home page and the document page",
//     routes: [
//       {
//         path: "",
//         redirect: "dashboard",
//         children: [
//           {
//             path: "dashboard",
//             name: "Dashboard",
//             meta: { title: "dashboard", icon: "dashboard" }
//           }
//         ]
//       }
//     ]
//   }
// ];
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
