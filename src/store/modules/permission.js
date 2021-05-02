import {
  constantRoutes,
  publicRoutes,
  NoVerificationRoutes,
  asyncRoutes
} from "@/router";

function treeFilter(tree, func) {
  return tree
    .map(node => ({ ...node }))
    .filter(node => {
      if (node.children) {
        node.children = treeFilter(node.children, func);
      }
      return func(node);
    });
}

const state = {
  routes: [],
  addRoutes: [],
  menuMap: null
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
  generateRoutes({ commit }, { collection, routesTreeMap }) {
    return new Promise(resolve => {
      let filterRouteTree = treeFilter(asyncRoutes, function(node) {
        if (node.children && node.children.length) {
          return true;
        } else if (node.children && !node.children.length) {
          return false;
        } else {
          if (
            node.meta &&
            node.meta.menuId &&
            collection.includes(node.meta.menuId)
          ) {
            return true;
          } else {
            return false;
          }
        }
      });
      publicRoutes.children = filterRouteTree;
      const realRoutes = [publicRoutes, ...NoVerificationRoutes];

      commit("SET_MAP", routesTreeMap);
      commit("SET_ROUTES", realRoutes);

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
