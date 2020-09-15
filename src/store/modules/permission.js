import { asyncRoutes, constantRoutes } from "@/router";

/**
 * 检测路由id 匹配路由数据 ids后端返回权限id列表
 * @param ids
 * @param route
 */

function hasDetection(ids, route, map) {
  if (route.meta && route.meta.Identification) {
    for (const item of map) {
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
    return ids.includes(route.meta.Identification);
  } else {
    return true;
  }
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
    if (hasDetection(ids, tmp, map)) {
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
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = Object.freeze(routes);
    state.routes = Object.freeze(constantRoutes.concat(routes));
  }
};

const actions = {
  generateRoutes({ commit }, { ids, map }) {
    return new Promise(resolve => {
      const accessedRoutes = exfilterAsyncRoutes(asyncRoutes, ids, map);
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
