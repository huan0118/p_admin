<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item)">
      <r-link v-if="onlyOneChild.menuId" :to="resolveTo(onlyOneChild)">
        <el-menu-item :index="'' + onlyOneChild.menuId">
          <item :icon="onlyOneChild.icon" :title="onlyOneChild.menuName" />
        </el-menu-item>
      </r-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="item.menuId + ''"
      popper-append-to-body
    >
      <template slot="title">
        <item :icon="item.icon" v-if="item.menuId" :title="item.menuName" />
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
import Item from "./Item";
import RLink from "./Link";
import FixiOSBug from "./FixiOSBug";
import { isExternal } from "@/utils/validate";
export default {
  name: "SidebarItem",
  components: { Item, RLink },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
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
    return {};
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

      // levelId = 1 合并子导航
      if (parent.levelId === 1 && showingChildren.length === 1) {
        this.onlyOneChild = { ...children[0], onlyOne: true };
        return true;
      }
      return false;
    },
    resolveTo(data) {
      if (data.path && isExternal(data.path)) {
        return data.path;
      } else {
        let { menuMap } = this;
        return menuMap
          ? menuMap.get(data.menuId)
            ? menuMap.get(data.menuId)
            : "ErrPage"
          : "ErrPage";
      }
    }
  }
};
</script>
