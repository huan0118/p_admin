<script>
export default {
  name: "Authority",
  render(createElement) {
    const { authority = [], menuId, _currentRespId } = this.$route.meta;
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
          value: _currentRespId
        },
        on: {
          change: val => {
            this.$store.commit("permission/SET_AUTHORITY_MAP", {
              key: menuId,
              value: val
            });
            let { name, fullPath } = this.$route;
            this.$store
              .dispatch("tagsView/delCachedView", { name })
              .then(() => {
                this.$nextTick(() => {
                  this.$router.replace({
                    path: "/redirect" + fullPath
                  });
                });
              });
          }
        }
      },
      vnode
    );
  }
};
</script>
