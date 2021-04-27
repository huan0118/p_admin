import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, asyncRoutes } from "@/router";
import { isDefstr } from "@/utils/index";
import intersection from "lodash/intersection";
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
          if (isDefstr(data.certificate)) {
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
          // let serveConfig = [];
          // let node = null;
          // let list = [...data];
          // while ((node = list.shift())) {
          //   serveConfig.push(node.menuId);
          //   let route = asyncRoutes.find(e => e.id === node.menuId);
          //   if (route) {
          //     Object.assign(node, route);
          //   }
          //   node.children && list.push(...node.children);
          // }

          function treeForeach(tree, key, deep = []) {
            if (!key) {
              console.warn("key is undefined");
              return [];
            }
            tree.forEach(item => {
              item.children && treeForeach(item.children, key, deep); // 遍历子树
              if (!item.children) {
                deep.push(item[key]);
              }
            });
            return deep;
          }
          const serveDeeps = treeForeach(data, "menuId");
          console.log(serveDeeps, "serveDeeps");

          const routesDeeps = treeForeach(asyncRoutes, "id");
          console.log(routesDeeps, "routesDeeps");

          const config = intersection(serveDeeps, routesDeeps);

          commit("SET_ROLE_IDS", config);
          commit("SET_NAVIGATION", Object.freeze(data));
          resolve(config);
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
