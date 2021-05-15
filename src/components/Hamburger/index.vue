<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg-icon
      :class="{ 'is-active': isActive }"
      icon-class="hamburger"
      class="hamburger"
    />
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped>
.hamburger {
  /* display: inline-block; */
  vertical-align: middle !important;
  font-size: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
