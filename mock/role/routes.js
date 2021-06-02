// permissions data
const permissions = [
  {
    levelId: 1,
    menuId: 3000,
    menuName: "一级菜单",
    menuParentId: 0,
    icon: "permissions",
    authority: [
      {
        responsibilityName: "新增权限",
        responsibilityId: 1,
        resource: [
          {
            id: 1614005,
            name: "新增",
            type: "buttons",
            code: "btnNew"
          }
        ]
      }
    ],
    children: [
      {
        levelId: 2,
        menuId: 3001,
        menuName: "二级菜单 2-1",
        menuParentId: 3000,
        hidden: false,
        authority: [
          {
            responsibilityName: "新增权限",
            responsibilityId: 1,
            resource: [
              {
                id: 1614005,
                name: "新增",
                type: "buttons",
                code: "btnNew"
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
        hidden: false,
        authority: [
          {
            responsibilityName: "修改权限",
            responsibilityId: 10,
            resource: [
              {
                id: 1614006,
                name: "修改",
                type: "buttons",
                code: "btnEdit"
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
                type: "buttons",
                code: "btnNew"
              },
              {
                id: 1614006,
                name: "修改",
                type: "buttons",
                code: "btnEdit"
              },
              {
                id: 1614007,
                name: "导出",
                type: "buttons",
                code: "btnExport"
              }
            ]
          }
        ]
      },
      {
        levelId: 2,
        menuId: 3003,
        menuName: "新增",
        menuParentId: 3000,
        hidden: true,
        authority: []
      }
    ]
  },

  {
    levelId: 1,
    menuId: 4000,
    menuName: "权限管理",
    menuParentId: 0,
    icon: "permissions",
    children: [
      {
        levelId: 2,
        menuId: 4001,
        menuName: "权限管理",
        menuParentId: 4000,
        icon: "permissions",
        authority: [
          {
            responsibilityName: "新增权限",
            responsibilityId: 1,
            resource: [
              {
                id: 1614005,
                name: "新增",
                type: "buttons",
                code: "btnNew"
              }
            ]
          }
        ]
      }
    ]
  },

  {
    levelId: 1,
    menuId: 9999,
    menuName: "外部链接",
    menuParentId: 0,
    icon: "Link",
    path: "https://cn.bing.com/"
  }
];

module.exports = {
  permissions
};
