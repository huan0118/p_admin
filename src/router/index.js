import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../layout/index";
import login from "@/views/login/index";
import errPage from "@/views/error-page/404";
import redirect from "../layout/redirect/index";

Vue.use(VueRouter);

/**
 * Note: 借鉴于 @花裤衩 开源项目 https://github.com/PanJiaChen
 * Note: sub-menu only appear when route children all set hidden
 *
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * menuId                         The only sign (asyncRoutes must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenuId: '3000'         if set menuId, the sidebar will highlight the path you set
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
  },
  {
    path: "/redirect/:path(.*)",
    component: redirect,
    name: "Redirect"
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
  {
    path: "*",
    redirect: "/404",
    NoVerification: true,
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: "",
    name: "Home",
    meta: {
      affix: true,
      menuId: 3001,
      title: "首页"
    },
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue")
  },

  {
    path: "about",
    name: "About",
    meta: {},
    component: () =>
      import(/* webpackChunkName: "About" */ "../views/About.vue"),
    children: [
      {
        path: "resources",
        name: "Resources",
        meta: {
          menuId: 3002
        },
        component: () =>
          import(
            /* webpackChunkName: "Resources" */ "../views/resources/index.vue"
          )
      }
    ]
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
