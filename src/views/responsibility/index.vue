<template>
  <div class="responsibility">
    {{ this.$route.meta.authority }}
  </div>
</template>

<script>
export default {
  name: "Responsibility",
  components: {},
  created() {
    console.log(this.$route.meta);
  }
};
</script>
