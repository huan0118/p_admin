import Authority from "@/components/Overall/authority";
import Controlled from "@/components/Overall/controlled";
export default {
  // eslint-disable-next-line no-unused-vars
  install: function(Vue, options) {
    Vue.component("p-authority", Authority);
    Vue.component("p-controlled", Controlled);
  }
};
