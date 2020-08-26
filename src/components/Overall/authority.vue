<script>

export default {
  name: 'Authority',
  props: {
    authorityBtns: {
      type: Array,
      default () {
        return []
      }
    }
  },
  render (createElement) {
    // const { authorityTokens } = context.props
    const vnodes = []
    // console.log(this, Object.keys(this.$slots), this.authorityTokens.map((e) => e.btn_key))
    const _slots = Object.keys(this.$slots)
    console.log(this.authorityBtns.map((e) => e.resourceName), _slots, 'createElement', this.authorityBtns)

    for (const item of this.authorityBtns) {
      if (_slots.includes(item.resourceCode)) {
        vnodes.push(this.$slots[item.resourceCode])
      }
    }
    return createElement('span', vnodes)
  }
}
</script>
