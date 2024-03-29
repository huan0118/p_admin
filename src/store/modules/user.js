import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, asyncRoutes } from "@/router";
import { isDefStr } from "@/utils/index";
import intersection from "lodash/intersection";

/**
 * @param {Array} tree
 * @returns {Map} Map
 */
function generateTreeMap(tree, func, deep = new Map()) {
  if (!func) {
    console.warn("func is Must");
    return deep;
  }
  tree.forEach(item => {
    let flag = func(item, deep);
    if (flag) {
      return;
    }

    item.children && generateTreeMap(item.children, func, deep);
  });
  return deep;
}

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  ids: [],
  navigation: [], //导航数据
  successGetInfo: false
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLE_IDS: (state, ids) => {
    state.ids = ids;
  },
  SET_NAVIGATION: (state, payload) => {
    state.navigation = payload;
  },
  SET_AUTHORITY: (
    state,
    { intersectionCollection, routesTreeMap, serveTreeMap }
  ) => {
    for (const menuId of intersectionCollection) {
      Object.assign(routesTreeMap.get(menuId).meta, serveTreeMap.get(menuId));
    }
  },
  CHANGE_INFO_STATE: (state, payload) => {
    state.successGetInfo = payload;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(({ data }) => {
          if (isDefStr(data.certificate)) {
            commit("SET_TOKEN", data.certificate);
            setToken(data.certificate);
            resolve();
          } else {
            reject(new Error("certificate 信息不存在！请重试"));
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(({ data, info }) => {
          if (!data) {
            reject(new Error("用户信息获取失败, 请重新登入"));
            return;
          }

          const serveTreeMap = generateTreeMap(data, function(row, deep) {
            if (row.children && row.children.length) {
              const showingChildren = row.children.filter(item => {
                if (item.hidden) {
                  return false;
                } else {
                  return true;
                }
              });

              if (!showingChildren.length) {
                deep.set(row.menuId, row);
                return true;
              }
            } else {
              deep.set(row.menuId, row);
            }
          });
          const routesTreeMap = generateTreeMap(asyncRoutes, function(
            row,
            deep
          ) {
            if (!row.children || !row.children.length) {
              deep.set(row.meta.menuId, row);
            }
          });

          const serveCollection = Array.from(serveTreeMap.keys());
          const routesCollection = Array.from(routesTreeMap.keys());

          const intersectionCollection = intersection(
            serveCollection,
            routesCollection
          );

          commit("SET_AUTHORITY", {
            intersectionCollection,
            routesTreeMap,
            serveTreeMap
          });

          commit("SET_NAME", info.name);
          commit("SET_ROLE_IDS", serveCollection);
          commit("SET_NAVIGATION", Object.freeze(data));
          commit("CHANGE_INFO_STATE", true);
          resolve({ collection: intersectionCollection, routesTreeMap });
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLE_IDS", []);
          commit("SET_NAVIGATION", []);
          commit("CHANGE_INFO_STATE", false);
          commit("permission/SET_MAP", null, { root: true });
          commit("permission/CLEAR_ROUTES", null, { root: true });

          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLE_IDS", []);
      commit("CHANGE_INFO_STATE", false);

      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
