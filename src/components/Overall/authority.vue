<script>
export default {
  name: "Authority",
  data() {
    return {
      respId: ""
    };
  },
  computed: {
    authorityMap() {
      return this.$store.state.permission.authorityMap;
    }
  },
  render(createElement) {
    const { authority = [], menuId } = this.$route.meta;
    let hasCache = this.authorityMap[menuId];
    if (hasCache) {
      let node = authority.find(e => e.responsibilityId === hasCache);
      this.respId = node ? node.responsibilityId : "";
    } else {
      this.respId = authority.length ? authority[0].responsibilityId : "";
    }
    //
    let vnode = authority.map((e, index) =>
      createElement("el-option", {
        props: {
          key: index,
          label: e.responsibilityName,
          value: e.responsibilityId
        }
      })
    );

    return createElement(
      "el-select",
      {
        props: {
          value: this.respId
        },
        on: {
          input: event => {
            this.respId = event;
          },
          change: val => {
            this.$store.commit("permission/SET_AUTHORITY_MAP", {
              key: menuId,
              value: val
            });
          }
        }
      },
      vnode
    );
  }
};
</script>
