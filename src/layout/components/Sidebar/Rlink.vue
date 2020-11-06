<template>
  <div>
    <router-link v-if="!linkProps(to)" :to="to">
      <slot />
    </router-link>
    <a v-else :href="to" target="_blank" rel="noopener">
      <slot />
    </a>
  </div>
</template>

<script>
import { isExternal } from "@/utils/validate";
export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  methods: {
    linkProps(url) {
      return isExternal(url);
    }
  }
};
</script>
