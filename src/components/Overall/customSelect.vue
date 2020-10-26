<script>
export default {
  name: "Lockcode",
  props: {
    locktype: {
      type: [String],
      required: true
    },
    label: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: [Boolean]
    }
  },
  computed: {
    locks() {
      return this.$store.getters.dictionaryData.filters(
        e => e.lookupType === this.locktype
      );
    }
  },
  render(createElement) {
    return createElement("el-option", {
      props: {
        label: this.label,
        value: this.value,
        disabled: this.disabled
      }
    });
  }
};
</script>
