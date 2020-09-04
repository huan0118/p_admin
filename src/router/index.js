import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../layout/index";

Vue.use(VueRouter);
/**
 *  import(\/* webpackChunkName: "about" *\/ "../views/About.vue")
 *  route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited.
 */

export const constantRoutes = [
  {
    path: "/",
    name: "Home",
    component: layout,
    children: [
      {
        path: "",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  }
];

// const router = new VueRouter({
//   routes
// });

export const asyncRoutes = [];

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
