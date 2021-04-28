import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, asyncRoutes } from "@/router";
import { isDefstr, generateTreeMap } from "@/utils/index";
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

          const serveDeeps = generateTreeMap(data, "menuId");
          const routesDeeps = generateTreeMap(asyncRoutes, "menuId");

          const config = intersection(
            Array.from(serveDeeps.keys()),
            Array.from(routesDeeps.keys())
          );

          for (const menuId of config) {
            serveDeeps.get(menuId).hrefName = routesDeeps.get(menuId).name;
            routesDeeps.get(menuId).meta.authority = serveDeeps.get(
              menuId
            ).authority;
          }

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
