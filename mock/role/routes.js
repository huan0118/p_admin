// permissions data
const permissions = [
  {
    levelId: 1,
    menuId: 3000,
    menuName: "一级菜单",
    menuParentId: 0,
    children: [
      {
        levelId: 2,
        menuId: 3001,
        menuName: "二级菜单 2-1",
        menuParentId: 3000,
        authority: [
          {
            responsibilityName: "新增权限",
            responsibilityId: 1,
            resource: [
              {
                id: 1614005,
                name: "新增",
                type: "buttons"
              }
            ]
          }
        ]
      },
      {
        levelId: 2,
        menuId: 3002,
        menuName: "二级菜单 2-2",
        menuParentId: 3000,
        authority: [
          {
            responsibilityName: "修改权限",
            responsibilityId: 10,
            resource: [
              {
                id: 1614006,
                name: "修改",
                type: "buttons"
              }
            ]
          },
          {
            responsibilityName: "混合权限",
            responsibilityId: 100,
            resource: [
              {
                id: 1614005,
                name: "新增",
                type: "buttons"
              },
              {
                id: 1614006,
                name: "修改",
                type: "buttons"
              },
              {
                id: 1614007,
                name: "导出",
                type: "buttons"
              }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = {
  permissions
};
