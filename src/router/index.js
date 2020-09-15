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

export const asyncRoutes = [
  {
    path: "/",
    name: "Home",
    component: layout,
    children: [
      {
        path: "",
        name: "Index",
        meta: {},
        Identification: 3000,
        component: () =>
          import(/* webpackChunkName: "Home" */ "../views/Home.vue")
      },
      {
        path: "/about",
        name: "About",
        meta: {},
        Identification: 2000,
        component: () =>
          import(/* webpackChunkName: "About" */ "../views/About.vue")
      }
    ]
  },
  { path: "*", redirect: "/404", hidden: true }
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
