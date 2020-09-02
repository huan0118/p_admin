<template>
  <div id="app">
    <router-view />
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
