import { router } from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  // console.log(hasToken, 'hasToken', to)
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission ids through getInfo
      const hasRoles = store.getters.ids && store.getters.ids.length > 0;
      // console.log(hasRoles, 'hasRoles')
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: ids must be a object array! tree ids
          const assemble = await store.dispatch("user/getInfo");
          // generate accessible routes map based on ids
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            assemble
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
