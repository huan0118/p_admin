## 细颗粒度权限方案（vue）
   1. 角色下面添加岗位的概念，由岗位来对应相应的权限资源，权限资源挂载于路由mate中
   2. 采用路由树与权限树最深叶子节点取交集的权限路由过滤方式；最大限度支持动态路由

基于[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)设计
