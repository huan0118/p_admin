import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
// 日志插件
import createLogger from "vuex/dist/logger";

let modules = require.context("./modules", false, /\.js$/);

let obj = Object.create(null);

/**
 * inject modules
 */
modules.keys().forEach(key => {
  obj[key.replace(/(.*\/)*([^.]+).*/gi, "$2")] = modules(key).default;
});
Vue.use(Vuex);

export default new Vuex.Store({
  modules: obj,
  getters,
  plugins: process.env.NODE_ENV !== "production" ? [createLogger()] : [],
  strict: process.env.NODE_ENV !== "production"
});
