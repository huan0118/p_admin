<template>
  <div id="app">
    <el-container>
      <el-header height="50px">Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <router-view class="warp" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getRoutes } from "@/api/role";
export default {
  name: "App",
  components: {},
  methods: {
    hanldeClick() {
      getRoutes();
    }
  }
};
</script>

<style></style>
