<script>
export default {
  name: "Controll",
  render() {
    const { authority = [], _currentJobsId } = this.$route.meta;
    let data = authority.find(e => e.jobsId === _currentJobsId);
    let resource = data ? data.resource : [];
    return (
      <el-button-group>
        {resource.map(e => (
          <el-button v-on:click={() => this.hanldeClick(e)} type="primary">
            {e.name}
          </el-button>
        ))}
      </el-button-group>
    );
  },
  methods: {
    hanldeClick(row) {
      this.$emit("btnControll", row);
    }
  }
};
</script>
