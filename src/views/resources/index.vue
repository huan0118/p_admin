<template>
  <div class="resources">
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
      tableData: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getResources()
        .then(({ data }) => {
          this.tableData = data;
        })
        .catch(err => {
          console.warn(err);
        });
    }
  },
  components: {}
};
</script>
