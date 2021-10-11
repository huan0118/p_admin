<template>
  <div class="home">
    <h3>当前路由元信息</h3>
    {{ this.$route.meta }}
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      x: 2
    };
  },
  created() {
    console.log(this._routerRoot === this);
  }
};
</script>
