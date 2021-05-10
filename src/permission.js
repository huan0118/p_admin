/*
 * @Author: liuhuan
 * @Date: 2020-11-02 20:05:36
 * @LastEditors: liuhuan 1641186065@qq.com
 * @LastEditTime: 2021-05-10 11:47:00
 */
import { router } from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // 白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // 用token来标识用户是否登入
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // 防止用户手动返回
      next({ path: "/" });
      NProgress.done();
    } else {
      // 判断用户是否通过getInfo获取了权限id 用户不刷新的前提下只会获取一次用户信息
      const hasRoles =
        store.getters.menuIds && store.getters.menuIds.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // 获取用户信息
          const config = await store.dispatch("user/getInfo");
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            config
          );

          // dynamically add accessible routes
          router.addRoutes(accessRoutes);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          console.warn("permission err =>", error);
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error("权限初始化失败");
          try {
            if (whiteList.indexOf(from.path) !== -1) {
              next(false);
            } else {
              next({
                path: "/login",
                replace: true,
                query: { redirect: to.path }
              });
            }
          } catch (err) {
            console.log("redirect", err);
          }
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
router.onError(err => {
  console.warn(err);
});
