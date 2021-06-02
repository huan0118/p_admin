<template>
  <div class="resources">
    <el-row class="pt5">
      <el-col :span="12">
        <p-authority />
      </el-col>
      <el-col :span="12">
        <p-controlled class="fr" @btnControll="hanldeBtn" />
      </el-col>
    </el-row>

    <h3>This is an resources page</h3>
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
    },
    hanldeBtn(data) {
      switch (data.code) {
        case "btnNew":
          this.$router.push({ name: "Creat" });
          break;

        default:
          break;
      }
    }
  }
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
