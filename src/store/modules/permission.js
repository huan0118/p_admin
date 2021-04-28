import {
  constantRoutes,
  publicRoutes,
  NoVerificationRoutes,
  asyncRoutes
} from "@/router";
import { treeFilter } from "@/utils/index";
const state = {
  routes: [],
  addRoutes: [],
  menuMap: {}
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = Object.freeze(routes);
    state.routes = Object.freeze(constantRoutes.concat(routes));
  },
  SET_MAP: (state, payload) => {
    state.menuMap = payload;
  }
};

const actions = {
  generateRoutes({ commit }, config) {
    return new Promise(resolve => {
      let filterRouteTree = treeFilter(asyncRoutes, function(node) {
        if (node.children) {
          return true;
        } else {
          return config.includes(node.menuId);
        }
      });
      commit("SET_ROUTES", []);

      publicRoutes.children = filterRouteTree;
      const realRoutes = [publicRoutes, ...NoVerificationRoutes];

      console.log(realRoutes, "realRoutes");
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
