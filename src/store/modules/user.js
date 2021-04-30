import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, asyncRoutes } from "@/router";
import { isDefStr } from "@/utils/index";
import intersection from "lodash/intersection";

/**
 * @param {Array} tree
 * @returns {Map} Map
 */
function generateTreeMap(tree, key, deep = new Map()) {
  if (!key) {
    console.warn("key is Must");
    return deep;
  }
  tree.forEach(item => {
    item.children && generateTreeMap(item.children, key, deep);
    if (!item.children || !item.children.length) {
      if (item.meta) {
        deep.set(item.meta[key], item);
      } else {
        deep.set(item[key], item);
      }
    }
  });
  return deep;
}

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  ids: [],
  navigation: [] //导航数据
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
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(({ data }) => {
          console.log(data);
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
        .then(({ data }) => {
          if (!data) {
            reject(new Error("用户信息获取失败, 请重新登入"));
            return;
          }

          const serveTreeMap = generateTreeMap(data, "menuId");
          const routesTreeMap = generateTreeMap(asyncRoutes, "menuId");

          const serveCollection = Array.from(serveTreeMap.keys());
          const collection = intersection(
            serveCollection,
            Array.from(routesTreeMap.keys())
          );

          for (const menuId of collection) {
            routesTreeMap.get(menuId).meta.authority = serveTreeMap.get(
              menuId
            ).authority;
          }

          commit("SET_ROLE_IDS", serveCollection);
          commit("SET_NAVIGATION", Object.freeze(data));
          resolve({ collection, routesTreeMap });
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
