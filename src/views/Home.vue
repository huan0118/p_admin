<template>
  <div class="home" @click="handleClick">
    首页12
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Index",
  components: {},
  methods: {
    handleClick() {
      console.log(this.$router.resolve());
    }
  }
};
</script>
