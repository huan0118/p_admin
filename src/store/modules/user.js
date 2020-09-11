import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, asyncRoutes } from "@/router";
import { flat, flatObject, isDefstr } from "@/utils/index";
import _ from "lodash";
const state = {
  token: getToken(),
  name: "",
  avatar: "",
  ids: [],
  NAVIGATION: [] //导航数据
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
    state.NAVIGATION = payload;
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

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(({ data }) => {
          console.log(data, "getInfo");
          if (!data) {
            reject(new Error("验证失败, 请重新登入"));
            return;
          }
          const nav = flat(data, "menuId")
            .map(e => +e)
            .sort();
          const webs = flat(asyncRoutes, "meta.Identification")
            .map(e => +e.meta.Identification)
            .sort();
          // 交集
          const ids = _.intersection(nav, webs);

          const map = flatObject(data);
          // ids must be a non-empty array
          if (!ids || ids.length <= 0) {
            reject(new Error("getInfo: ids must be a non-null array!"));
            return;
          }

          commit("SET_ROLE_IDS", ids);
          commit("SET_NAVIGATION", Object.freeze(data));
          resolve(Object.freeze({ ids, map }));
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
