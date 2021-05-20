<template>
  <div class="resources">
    <el-row class="pt5">
      <el-col :span="12">
        <p-authority />
      </el-col>
      <el-col :span="12">
        <p-controlled class="fr" />
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="explain" label="展示说明" width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180"> </el-table-column>
      <el-table-column prop="status" label="是否失效" width="120">
      </el-table-column>
      <el-table-column prop="des" label="功能描述"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getResources } from "@/api/index";
export default {
  name: "Resources",
  data() {
    return {
      tableData: [],
      value: ""
    };
  },
  created() {
    this.initData({ respid: this.activeResp });
  },
  computed: {
    activeResp() {
      let { menuId } = this.$route.meta;
      return this.$store.state.permission.authorityMap[menuId];
    }
  },
  methods: {
    async initData(query) {
      let { data = [] } = await getResources(query);
      this.tableData = data;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.pt5 {
  padding-bottom: 10px;
}
.resources {
  background: #eee;
  padding: 20px;
}
</style>
