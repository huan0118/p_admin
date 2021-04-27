import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../layout/index";
import login from "@/views/login/index";
import errPage from "@/views/error-page/404";

Vue.use(VueRouter);

/**
 * Note: 借鉴于 @花裤衩 开源项目 https://github.com/PanJiaChen
 * Note: sub-menu only appear when route children all set hidden
 *
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               delete !!!
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * id                 The only sign (asyncRoutes must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: login
  },
  {
    path: "/404",
    name: "ErrPage",
    component: errPage
  }
];

/**
 * publicRoutes
 * Common Layout components
 */

export const publicRoutes = {
  path: "/",
  component: layout
};

/**
 * NoVerificationRoutes
 * 404 components
 */

export const NoVerificationRoutes = [
  { path: "*", redirect: "/404", NoVerification: true, hidden: true }
];

export const asyncRoutes = [
  {
    path: "home",
    name: "Home",
    meta: {
      affix: true
    },
    id: 3000,
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue")
  },

  {
    path: "about",
    name: "About",
    meta: {
      affix: true
    },
    id: 3002,
    component: () =>
      import(/* webpackChunkName: "Responsibility" */ "../views/About.vue")
  },

  {
    path: "resources",
    name: "Resources",
    meta: {
      affix: true
    },
    id: 3003,
    component: () =>
      import(/* webpackChunkName: "Resources" */ "../views/resources/index.vue")
  }
];

const createRouter = () =>
  new VueRouter({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export { router };
