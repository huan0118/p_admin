import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../layout/index";
import login from "@/views/login/index";
import errPage from "@/views/error-page/404";

Vue.use(VueRouter);
/**
 *  import(\/* webpackChunkName: "about" *\/ "../views/About.vue")
 *  route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited.
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
export const publicRoutes = {
  path: "/",
  component: layout
};

export const NoVerificationRoutes = [
  { path: "*", redirect: "/404", NoVerification: true, hidden: true }
];

export const asyncRoutes = [
  {
    path: "",
    name: "Index",
    meta: {},
    Identification: 3001,
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue")
  },

  {
    path: "index2",
    name: "Index2",
    meta: {},
    Identification: 3002,
    component: () => import(/* webpackChunkName: "Home" */ "../views/About.vue")
  },
  {
    path: "/about",
    name: "About",
    meta: {},
    Identification: 2000,
    component: () =>
      import(/* webpackChunkName: "About" */ "../views/About.vue")
  }
];

const createRouter = () =>
  new VueRouter({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export { router };
