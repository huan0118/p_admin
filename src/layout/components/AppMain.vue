<!--
 * @Author: liuhuan
 * @Date: 2020-11-02 20:05:36
 * @LastEditors: liuhuan 1641186065@qq.com
 * @LastEditTime: 2020-12-29 16:06:33
-->
<template>
  <section class="app-main">
    <el-scrollbar ref="scrollContainer" :vertical="true" class="warp-container">
      <!-- <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" class="warp-padding" />
        </keep-alive>
      </transition> -->

      <router-view :key="key" class="warp-padding" />
    </el-scrollbar>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  created() {},
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 0 4px #2f2b2b inset;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
  }
  .fixed-header + .app-main {
    padding-top: 50px;
  }
}
.warp-container {
  height: calc(100vh - 84px);
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.warp-container .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
