import _ from 'lodash'
export default {
  data () {
    return {
      // 权限配置
      _authority: [],
      jurisdictionValue: ''
    }
  },
  created () {
    console.log(this.$route, 'serialize')
    // 获取角色  初始化默认选中
    this._authority = this.$route.meta.authority
    this.jurisdictionValue = this._authority[0].responsibilityId
  },
  computed: {
    // 职责组
    jurisdictionOptions () {
      return this._authority.map((e) => ({ label: e.responsibilityName, value: e.responsibilityId }))
    },
    // 按钮组
    jurisdictionButs () {
      let maps = this._authority.filter((e) => e.responsibilityId === this.jurisdictionValue)
      return maps.length ? _.cloneDeep(maps[0].map) : []
    }
  }
}
