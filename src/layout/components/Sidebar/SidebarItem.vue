<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <r-link v-if="onlyOneChild.menuId" :to="resolveLink(onlyOneChild)">
        <el-menu-item
          :index="resolvePath(onlyOneChild)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item :title="onlyOneChild.menuName + '|' + onlyOneChild.menuId" />
        </el-menu-item>
      </r-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item)"
      popper-append-to-body
    >
      <template slot="title">
        <item v-if="item.menuId" :title="item.menuName + '|' + item.menuId" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.menuId"
        :is-nest="true"
        :item="child"
        :base-menu-id="child.menuId"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
// import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
// import AppLink from './Link'
import RLink from "./Rlink";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, RLink },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    baseMenuId: {
      type: [String, Number],
      default: ""
    }
  },
  computed: {
    keymap() {
      return this.$store.state.permission.map;
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
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      // console.log(this)

      return false;
    },
    resolveLink(data) {
      let value = this.keymap.get(data.menuId);
      if (value) {
        return { name: value.name, params: { id: data.menuId } };
      } else {
        return { name: "ErrPage", params: { id: data.menuId } };
      }
    },
    resolvePath(data) {
      // console.log(data);
      // console.log(this.keymap.get(data.menuId));
      let value = this.keymap.get(data.menuId);
      if (value) {
        if (isExternal(value.path)) {
          return value.path;
        }
        // if (isExternal(this.basePath)) {
        //   return this.basePath;
        // }
        return value.path;
      } else {
        return String(data.menuId);
      }
    }
  }
};
</script>
