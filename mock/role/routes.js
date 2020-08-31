// Just a mock data

const treeRoutes = [
  {
    IconName: "fa fa-asterisk",
    levelId: 1,
    menuId: 2000,
    menuName: "一级 1",
    menuParentId: 0,
    children: [
      {
        IconName: "fa fa-calculator",
        levelId: 2,
        menuId: 2001,
        menuName: "二级 1-1",
        menuParentId: 2000,
        children: [
          {
            IconName: "",
            levelId: 3,
            menuId: 2002,
            menuName: "三级 1-1-1",
            menuParentId: 2001,
            authority: [
              {
                responsibilityCode: "code-type-0",
                responsibilityId: 10,
                Buttons: [
                  {
                    ButtonIcon: "fa fa-plus",
                    ButtonCode: "btnNew",
                    ButtonId: 1614005,
                    ButtonName: "新增"
                  },
                  {
                    ButtonIcon: "fa fa-download",
                    ButtonCode: "btnImport",
                    ButtonId: 1614006,
                    ButtonName: "导入"
                  },
                  {
                    ButtonIcon: "fa fa-file-excel-o",
                    ButtonCode: "btnExport",
                    ButtonId: 1614007,
                    ButtonName: "导出"
                  }
                ]
              },
              {
                responsibilityCode: "code-type-1",
                responsibilityId: 11,
                Buttons: [
                  {
                    ButtonIcon: "fa fa-plus",
                    ButtonCode: "btnNew",
                    ButtonId: 1614005,
                    ButtonName: "新增"
                  },
                  {
                    ButtonIcon: "fa fa-download",
                    ButtonCode: "btnImport",
                    ButtonId: 1614006,
                    ButtonName: "导入"
                  },
                  {
                    ButtonIcon: "fa fa-trash",
                    ButtonCode: "btnDel",
                    ButtonId: 1614008,
                    ButtonName: "删除"
                  }
                ]
              },
              {
                responsibilityCode: "code-type-2",
                responsibilityId: 12,
                Buttons: [
                  {
                    ButtonIcon: "fa fa-plus",
                    ButtonCode: "btnNew",
                    ButtonId: 1614005,
                    ButtonName: "新增"
                  },
                  {
                    ButtonIcon: "fa fa-file-excel-o",
                    ButtonCode: "btnExport",
                    ButtonId: 1614007,
                    ButtonName: "导出"
                  },
                  {
                    ButtonIcon: "fa fa-trash",
                    ButtonCode: "btnDel",
                    ButtonId: 1614008,
                    ButtonName: "删除"
                  }
                ]
              },
              {
                responsibilityCode: "code-type-3",
                responsibilityId: 13,
                Buttons: [
                  {
                    ButtonIcon: "fa fa-download",
                    ButtonCode: "btnImport",
                    ButtonId: 1614006,
                    ButtonName: "导入"
                  },
                  {
                    ButtonIcon: "fa fa-file-excel-o",
                    ButtonCode: "btnExport",
                    ButtonId: 1614007,
                    ButtonName: "导出"
                  },
                  {
                    ButtonIcon: "fa fa-trash",
                    ButtonCode: "btnDel",
                    ButtonId: 1614008,
                    ButtonName: "删除"
                  }
                ]
              }
            ]
          },
          {
            IconName: "",
            levelId: 3,
            menuId: 2003,
            menuName: "三级 1-1-2",
            menuParentId: 2001,
            authority: [
              {
                responsibilityCode: "code-type-3",
                responsibilityId: 13,
                Buttons: [
                  {
                    ButtonIcon: "fa fa-download",
                    ButtonCode: "btnImport",
                    ButtonId: 1614006,
                    ButtonName: "导入"
                  },
                  {
                    ButtonIcon: "fa fa-file-excel-o",
                    ButtonCode: "btnExport",
                    ButtonId: 1614007,
                    ButtonName: "导出"
                  },
                  {
                    ButtonIcon: "fa fa-trash",
                    ButtonCode: "btnDel",
                    ButtonId: 1614008,
                    ButtonName: "删除"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        IconName: "",
        levelId: 2,
        menuId: 2004,
        menuName: "二级 2-1",
        menuParentId: 2000,
        authority: [
          {
            responsibilityCode: "code-type-0",
            responsibilityId: 10,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-download",
                ButtonCode: "btnImport",
                ButtonId: 1614006,
                ButtonName: "导入"
              },
              {
                ButtonIcon: "fa fa-file-excel-o",
                ButtonCode: "btnExport",
                ButtonId: 1614007,
                ButtonName: "导出"
              }
            ]
          },
          {
            responsibilityCode: "code-type-1",
            responsibilityId: 11,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-download",
                ButtonCode: "btnImport",
                ButtonId: 1614006,
                ButtonName: "导入"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    IconName: "fa fa-taxi",
    levelId: 1,
    menuId: 3000,
    menuName: "一级 2",
    menuParentId: 0,
    children: [
      {
        IconName: "",
        levelId: 2,
        menuId: 3001,
        menuName: "二级 2-1",
        menuParentId: 3000,
        authority: [
          {
            responsibilityCode: "code-type-1",
            responsibilityId: 11,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-download",
                ButtonCode: "btnImport",
                ButtonId: 1614006,
                ButtonName: "导入"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          }
        ]
      },
      {
        IconName: "",
        levelId: 2,
        menuId: 3002,
        menuName: "二级 2-2",
        menuParentId: 3000,
        authority: [
          {
            responsibilityCode: "code-type-2",
            responsibilityId: 12,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-file-excel-o",
                ButtonCode: "btnExport",
                ButtonId: 1614007,
                ButtonName: "导出"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          }
        ]
      },
      {
        IconName: "",
        levelId: 2,
        menuId: 3003,
        menuName: "二级 2-3",
        menuParentId: 3000,
        authority: [
          {
            responsibilityCode: "code-type-0",
            responsibilityId: 10,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-download",
                ButtonCode: "btnImport",
                ButtonId: 1614006,
                ButtonName: "导入"
              },
              {
                ButtonIcon: "fa fa-file-excel-o",
                ButtonCode: "btnExport",
                ButtonId: 1614007,
                ButtonName: "导出"
              }
            ]
          },
          {
            responsibilityCode: "code-type-1",
            responsibilityId: 11,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-download",
                ButtonCode: "btnImport",
                ButtonId: 1614006,
                ButtonName: "导入"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          },
          {
            responsibilityCode: "code-type-2",
            responsibilityId: 12,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-file-excel-o",
                ButtonCode: "btnExport",
                ButtonId: 1614007,
                ButtonName: "导出"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          },
          {
            responsibilityCode: "code-type-3",
            responsibilityId: 13,
            Buttons: [
              {
                ButtonIcon: "fa fa-download",
                ButtonCode: "btnImport",
                ButtonId: 1614006,
                ButtonName: "导入"
              },
              {
                ButtonIcon: "fa fa-file-excel-o",
                ButtonCode: "btnExport",
                ButtonId: 1614007,
                ButtonName: "导出"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          }
        ]
      },
      {
        IconName: "",
        levelId: 2,
        menuId: 3004,
        menuName: "二级 2-4",
        menuParentId: 3000,
        authority: [
          {
            responsibilityCode: "code-type-2",
            responsibilityId: 12,
            Buttons: [
              {
                ButtonIcon: "fa fa-plus",
                ButtonCode: "btnNew",
                ButtonId: 1614005,
                ButtonName: "新增"
              },
              {
                ButtonIcon: "fa fa-file-excel-o",
                ButtonCode: "btnExport",
                ButtonId: 1614007,
                ButtonName: "导出"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          },
          {
            responsibilityCode: "code-type-3",
            responsibilityId: 13,
            Buttons: [
              {
                ButtonIcon: "fa fa-download",
                ButtonCode: "btnImport",
                ButtonId: 1614006,
                ButtonName: "导入"
              },
              {
                ButtonIcon: "fa fa-file-excel-o",
                ButtonCode: "btnExport",
                ButtonId: 1614007,
                ButtonName: "导出"
              },
              {
                ButtonIcon: "fa fa-trash",
                ButtonCode: "btnDel",
                ButtonId: 1614008,
                ButtonName: "删除"
              }
            ]
          }
        ]
      }
    ]
  }
];

const Buttons = [
  {
    ButtonIcon: "fa fa-plus",
    ButtonCode: "btnNew",
    ButtonId: 1614005,
    ButtonName: "新增"
  },
  {
    ButtonIcon: "fa fa-download",
    ButtonCode: "btnImport",
    ButtonId: 1614006,
    ButtonName: "导入"
  },
  {
    ButtonIcon: "fa fa-file-excel-o",
    ButtonCode: "btnExport",
    ButtonId: 1614007,
    ButtonName: "导出"
  },
  {
    ButtonIcon: "fa fa-trash",
    ButtonCode: "btnDel",
    ButtonId: 1614008,
    ButtonName: "删除"
  }
];

module.exports = {
  treeRoutes,
  Buttons
};
