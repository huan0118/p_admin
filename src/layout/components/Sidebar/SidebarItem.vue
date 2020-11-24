<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item)">
      <r-link v-if="onlyOneChild.menuId" :to="resolveLink(onlyOneChild)">
        <el-menu-item :index="resolvePath(onlyOneChild)">
          <item :title="onlyOneChild.menuName + '|' + onlyOneChild.menuId" />
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
    // isNest: {
    //   type: Boolean,
    //   default: false
    // },
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
          // Temp set(will be used if only has one showing child)
          // this.onlyOneChild = item;
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
        return { name: value.name };
      } else {
        return { name: "ErrPage" };
      }
    },
    resolvePath(data) {
      let value = this.menuMap[data.menuId];
      if (value) {
        console.log(path);
        if (isExternal(value.path)) {
          return value.path;
        }
        // if (isExternal(this.basePath)) {
        //   return this.basePath;
        // }
        return path.resolve("/", value.path);
      } else {
        return String(data.menuId);
      }
    }
  }
};
</script>
