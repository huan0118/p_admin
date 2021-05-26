<script>
export default {
  name: "Controll",
  data() {
    return {
      controllBtn: []
    };
  },
  computed: {
    authorityMap() {
      return this.$store.state.permission.authorityMap;
    }
  },
  render() {
    const { authority = [], menuId } = this.$route.meta;
    let hasCache = this.authorityMap[menuId];
    let controllBtn = [];
    if (hasCache) {
      let node = authority.find(e => e.responsibilityId === hasCache);
      if (node) {
        controllBtn = node.resource.filter(e => e.type === "buttons");
      }
    } else {
      if (authority.length) {
        controllBtn = authority[0].resource.filter(e => e.type === "buttons");
      }
    }
    return (
      <el-button-group>
        {controllBtn.map(e => (
          <el-button v-on:click={() => this.hanldeClick(e)} type="primary">
            {e.name}
          </el-button>
        ))}
      </el-button-group>
    );
  },
  methods: {
    hanldeClick() {}
  }
};
</script>
