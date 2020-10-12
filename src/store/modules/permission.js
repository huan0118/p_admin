import {
  asyncRoutes,
  constantRoutes,
  publicRoutes,
  NoVerificationRoutes
} from "@/router";
// import _ from "lodash";
/**
 * 检测路由id 匹配路由数据 ids后端返回权限id列表
 * @param ids
 * @param route
 */

function hasDetection(ids, route) {
  if (route.Identification) {
    return ids.includes(route.Identification);
  } else {
    return false;
  }
}
/**
 * 注入路由权限等信息
 * @param route asyncRoutes
 * @param info 获取的信息
 */
function setAsyncRoutes(route, info) {
  for (const item of info) {
    if (+item.menuId === +route.Identification) {
      if (item.icon) {
        route.meta.icon = item.icon;
      }
      if (item.menuName) {
        route.meta.title = item.menuName;
      }
      route.meta.authority = item.authority ? item.authority : "no-authority";
      route.hidden = +item.is_hidden === 1;
    }
  }
}
/**
 * 生成映射
 * @param routes asyncRoutes
 * @param ids
 * @param map
 */
function filterAsyncMap(routes, ids, map, esMap = {}) {
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasDetection(ids, tmp)) {
      for (const item of map) {
        if (+item.menuId === +tmp.Identification) {
          esMap[item.menuId] = { name: route.name, path: route.path };
        }
      }
      if (tmp.children) {
        filterAsyncMap(tmp.children, ids, map, esMap);
      }
    }
  });

  return esMap;
}
/**
 * 过滤路由
 * @param routes asyncRoutes
 * @param ids
 */
export function exfilterAsyncRoutes(routes, ids, map) {
  const res = [];
  // console.log(routes, 'routes, ids, map')
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasDetection(ids, tmp)) {
      setAsyncRoutes(tmp, map);
      if (tmp.children) {
        tmp.children = exfilterAsyncRoutes(tmp.children, ids, map);
        tmp.redirect = { name: tmp.children[0].name };
      }
      res.push(tmp);
    }
  });

  return res;
}

const state = {
  routes: [],
  addRoutes: [],
  map: new Map()
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = Object.freeze(routes);
    state.routes = Object.freeze(constantRoutes.concat(routes));
  },
  SET_MAP: (state, palyload) => {
    for (const item of palyload) {
      state.map.set(item.menuId, item);
    }
  }
};

const actions = {
  generateRoutes({ commit }, { ids, map }) {
    return new Promise(resolve => {
      const accessedRoutes = exfilterAsyncRoutes(asyncRoutes, ids, map);
      commit("SET_ROUTES", accessedRoutes);
      console.log(
        accessedRoutes,
        "accessedRoutes",
        publicRoutes,
        NoVerificationRoutes
      );
      const asyncMap = filterAsyncMap(asyncRoutes, ids, map);
      // Building a real routing information
      console.log(asyncMap, "asyncMap");
      publicRoutes.children = accessedRoutes;
      const realRoutes = [publicRoutes, ...NoVerificationRoutes];
      console.log(realRoutes);
      resolve(realRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
