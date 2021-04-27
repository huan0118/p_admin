<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- <template v-if="hasOneShowingChild(item.children, item)">
      <r-link v-if="onlyOneChild.menuId" :to="{ name: onlyOneChild.name }">
        <el-menu-item :index="resolvePath(onlyOneChild)">
          <item :title="onlyOneChild.menuName + '|' + onlyOneChild.menuId" />
        </el-menu-item>
      </r-link>
    </template> -->

    <el-submenu ref="subMenu" :index="item.menuId + ''" popper-append-to-body>
      <template slot="title">
        <item v-if="item.menuId" :title="item.menuName + '|' + item.menuId" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.menuId"
        :item="child"
        :base-menu-id="child.menuId"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import Item from "./Item";
// import RLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    baseMenuId: {
      type: [String, Number],
      default: ""
    }
  },
  computed: {
    menuMap() {
      return this.$store.state.permission.menuMap;
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      // onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      if (!children.length) {
        this.onlyOneChild = { ...parent, noShowingChildren: true };
        return true;
      }
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          return true;
        }
      });

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, childrenAllHide: true };
        return true;
      }
      return false;
    },
    resolveLink(data) {
      let value = this.menuMap[data.menuId];
      if (value) {
        return path.resolve("/", value.path);
      } else {
        return path.resolve("/", "404");
      }
    },
    resolvePath(data) {
      let value = this.menuMap[data.menuId];
      if (value) {
        return path.resolve("/", value.path);
      } else {
        return String(data.menuId);
      }
    }
  }
};
</script>
