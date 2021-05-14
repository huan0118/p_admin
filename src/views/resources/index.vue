<template>
  <div class="resources">
    <el-row>
      <el-col :span="12">
        <p-authority />
      </el-col>
      <el-col :span="12">
        <el-button-group>
          <el-button
            v-for="(btn, index) in btnGroup"
            :key="index"
            type="primary"
            icon="el-icon-edit"
            >{{ btn.name }}</el-button
          >
        </el-button-group>
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
    this.initData();
  },
  computed: {
    btnGroup() {
      if (this.value) {
        return this.$route.meta.authority.find(
          e => e.responsibilityId === this.value
        ).resource;
      } else {
        return [];
      }
    }
  },
  methods: {
    async initData() {
      let { data = [] } = await getResources();
      this.tableData = data;
    }
  },
  components: {}
};
</script>
