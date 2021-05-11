<template>
  <div class="responsibility">
    {{ meta }}
  </div>
</template>

<script>
export default {
  name: "Responsibility",
  computed: {
    meta() {
      return this.$route.meta;
    }
  }
};
</script>
