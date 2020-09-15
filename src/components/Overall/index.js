import _ from "lodash";
import { isObject } from "@/utils/validate";
export default {
  data() {
    return {
      paginationTotal: 0,
      tableData: [],
      tableLoading: false,
      currentPage: 1,
      pageSize: 10,
      // 权限配置
      _authority: [],
      jurisdictionValue: ""
    };
  },
  watch: {
    jurisdictionValue: function(newQuestion, oldQuestion) {
      console.log(newQuestion, "oldQuestion", oldQuestion);
      this.tableData = [];
    }
  },
  created() {
    // 获取角色  初始化默认选中
    this._authority = this.$route.meta.authority || [];
    this.jurisdictionValue = this._authority.length
      ? this._authority[0].responsibilityId
      : null;
    console.log(this._authority, "jurisdictionButs", this.jurisdictionValue);
  },
  computed: {
    // 职责组
    jurisdictionOptions() {
      return this._authority.map(e => ({
        label: e.responsibilityName,
        value: e.responsibilityId,
        disabled: e.disabled
      }));
    },
    // 按钮组
    jurisdictionButs() {
      let maps = this._authority.filter(
        e => e.responsibilityId === this.jurisdictionValue
      );
      return maps.length ? _.cloneDeep(maps[0].map) : [];
    }
  },
  methods: {
    getData(fn) {
      return async (...arg) => {
        const integration = arg
          .filter(e => isObject(e))
          .reduce(
            (accumulator, currentValue) =>
              Object.assign(accumulator, currentValue),
            {}
          );

        this.tableLoading = true;

        try {
          let { data } = await fn(integration);
          this.tableLoading = false;
          this.tableData = data.list;
          this.paginationTotal = +data.recordsTotal;
          return data;
        } catch (err) {
          console.warn(err);
          this.tableLoading = false;
          return Promise.reject(new Error(fn.toString()));
        }
      };
    }
  }
};
