<template>
  <div class="login-container">
    <div class="from-box">
      <div class="title-container">
        <h3 class="title">RM</h3>
      </div>

      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            type="text"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container"><svg-icon icon-class="password"/></span>
          <el-input
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            autocomplete="on"
          />
          <span class="show-pwd" @click.stop="hanleEye">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
      <span class="wave" />
      <span class="wave" />
      <span class="wave" />
    </div>
  </div>
</template>

<script>
import { removeSpaces } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin", // dhadmin
        password: "123456" // 123456
      },
      passwordType: "password",
      loading: false,
      redirect: null
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    hanleEye() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    async handleLogin() {
      this.loading = true;
      let data = removeSpaces({
        userName: this.loginForm.username,
        pwd: this.loginForm.password,
        want_except: "pwd"
      });
      try {
        await this.$store.dispatch("user/login", data);
        await this.$router.push({ path: this.redirect || "/" });
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #3881c6;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }

  .el-form-item__content {
    display: flex;
    align-items: center;
  }

  .login-container .login-form .el-form-item {
    background: none;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    flex: 1;
    -webkit-flex: 1;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$loginBg: whitesmoke;
$dark_gray: azure;
$light_gray: white;

.login-container {
  min-height: 100%;
  width: 100%;
  background: #3881c6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .from-box {
    width: 500px;
    height: 500px;
    background: #fff;
    border-radius: 5px;
    z-index: 99;
    background: $loginBg;
    background-image: linear-gradient(
      darkblue,
      rgba(255, 255, 255, 0) 80%,
      rgba(255, 255, 255, 0.5)
    );
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;

    span.wave {
      z-index: 10;
    }
    .wave {
      position: absolute;
      top: -260px;
      left: -100px;
      width: 700px;
      height: 700px;
      background: deepskyblue;
      border-radius: 43%;
      filter: opacity(0.4);
      animation: drift linear infinite;
      transform-origin: 50% 48%;
    }
    .wave:nth-of-type(1) {
      animation-duration: 5s;
    }
    .wave:nth-of-type(2) {
      animation-duration: 7s;
    }
    .wave:nth-of-type(3) {
      animation-duration: 9s;
      background-color: orangered;
      filter: opacity(0.1);
    }
    @keyframes drift {
      from {
        transform: rotate(360deg);
      }
    }
  }

  .login-form {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    position: relative;
    z-index: 99;

    .login-btn {
      margin-top: 20px;
      border-radius: inherit;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    .title {
      font-size: 24px;
      color: $light_gray;
      text-align: center;
      font-weight: bold;
      padding: 50px 0 30px 0;
      text-align: center;
      position: relative;
      z-index: 99;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  @media only screen and (max-width: 470px) {
    .login-form {
      width: 92%;
    }
  }
}
</style>
