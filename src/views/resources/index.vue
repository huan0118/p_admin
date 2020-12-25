<template>
  <div class="resources">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="explain" label="展示说明"> </el-table-column>
      <el-table-column prop="type" label="类型" width="180"> </el-table-column>
      <el-table-column prop="status" label="是否失效"> </el-table-column>
      <el-table-column prop="des" label="功能描述"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Resources",
  data() {
    return {
      tableData: []
    };
  },
  components: {}
};
</script>
