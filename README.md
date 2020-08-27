# power_admin

## 1 step
    设计权限数据

        tree
            
            角色不同导航

            岗位不同操作权限


            `
            {
                "status": 200,
                "msg": "OK",
                "data": [
                    {
                    "IconName": "fa fa-asterisk",
                    "levelId": 1,
                    "menuId": 2000,
                    "menuName": "一级 1",
                    "menuParentId": 0,
                    "children": [
                        {
                        "IconName": "fa fa-calculator",
                        "levelId": 2,
                        "menuId": 2001,
                        "menuName": "二级 1-1",
                        "menuParentId": 2000,
                        "children": [
                            {
                            "IconName": "",
                            "levelId": 3,
                            "menuId": 2002,
                            "menuName": "三级 1-1-1",
                            "menuParentId": 2001,
                            "authority": [
                                {
                                "responsibilityCode": "Code-1",
                                "responsibilityId": 10000,
                                "Buttons": [
                                    {
                                    "ButtonIcon": "fa fa-plus",
                                    "ButtonCode": "btnNew",
                                    "ButtonId": 1614005,
                                    "ButtonName": "新增"
                                    },
                                    {
                                    "ButtonIcon": "fa fa-download",
                                    "ButtonCode": "btnImport",
                                    "ButtonId": 1614006,
                                    "ButtonName": "导入"
                                    },
                                    {
                                    "ButtonIcon": "fa fa-file-excel-o",
                                    "ButtonCode": "btnExport",
                                    "ButtonId": 1614007,
                                    "ButtonName": "导出"
                                    },
                                    {
                                    "ButtonIcon": "fa fa-trash",
                                    "ButtonCode": "btnDel",
                                    "ButtonId": 1614008,
                                    "ButtonName": "删除"
                                    }
                                ]
                                },
                                {
                                "responsibilityCode": "Code-2",
                                "responsibilityId": 10001,
                                "Buttons": [
                                    {
                                    "ButtonIcon": "fa fa-plus",
                                    "ButtonCode": "btnNew",
                                    "ButtonId": 1614005,
                                    "ButtonName": "新增"
                                    },
                                    {
                                    "ButtonIcon": "fa fa-download",
                                    "ButtonCode": "btnImport",
                                    "ButtonId": 1614006,
                                    "ButtonName": "导入"
                                    }
                                ]
                                }
                            ]
                            },
                            {
                            "IconName": "",
                            "levelId": 3,
                            "menuId": 2003,
                            "menuName": "三级 1-1-2",
                            "menuParentId": 2001,
                            "authority": [
                                {
                                "responsibilityCode": "Code-3",
                                "responsibilityId": 10003,
                                "Buttons": [
                                    {
                                    "ButtonIcon": "fa fa-file-excel-o",
                                    "ButtonCode": "btnExport",
                                    "ButtonId": 1614007,
                                    "ButtonName": "导出"
                                    }
                                ]
                                }
                            ]
                            }
                        ]
                        },
                        {
                        "IconName": "",
                        "levelId": 2,
                        "menuId": 2004,
                        "menuName": "二级 2-1",
                        "menuParentId": 2000,
                        "authority": [
                            {
                            "responsibilityCode": "Code-4",
                            "responsibilityId": 10004,
                            "Buttons": [
                                {
                                "ButtonIcon": "fa fa-file-excel-o",
                                "ButtonCode": "btnExport",
                                "ButtonId": 1614007,
                                "ButtonName": "导出"
                                }
                            ]
                            },
                            {
                            "responsibilityCode": "Code-5",
                            "responsibilityId": 10005,
                            "Buttons": [
                                {
                                "ButtonIcon": "fa fa-plus",
                                "ButtonCode": "btnNew",
                                "ButtonId": 1614005,
                                "ButtonName": "新增"
                                },
                                {
                                "ButtonIcon": "fa fa-download",
                                "ButtonCode": "btnImport",
                                "ButtonId": 1614006,
                                "ButtonName": "导入"
                                }
                            ]
                            }
                        ]
                        }
                    ]
                    },
                    {
                    "IconName": "fa fa-taxi",
                    "levelId": 1,
                    "menuId": 3000,
                    "menuName": "一级 2",
                    "menuParentId": 0,
                    "children": [
                        {
                        "IconName": "",
                        "levelId": 2,
                        "menuId": 3001,
                        "menuName": "二级 2-1",
                        "menuParentId": 3000,
                        "authority": [
                            {
                            "responsibilityCode": "Code-6",
                            "responsibilityId": 10006,
                            "Buttons": []
                            }
                        ]
                        },
                        {
                        "IconName": "",
                        "levelId": 2,
                        "menuId": 3002,
                        "menuName": "二级 2-2",
                        "menuParentId": 3000,
                        "authority": [
                            {
                            "responsibilityCode": "Code-5",
                            "responsibilityId": 10005,
                            "Buttons": [
                                {
                                "ButtonIcon": "fa fa-plus",
                                "ButtonCode": "btnNew",
                                "ButtonId": 1614005,
                                "ButtonName": "新增"
                                },
                                {
                                "ButtonIcon": "fa fa-download",
                                "ButtonCode": "btnImport",
                                "ButtonId": 1614006,
                                "ButtonName": "导入"
                                }
                            ]
                            }
                        ]
                        },
                        {
                        "IconName": "",
                        "levelId": 2,
                        "menuId": 3003,
                        "menuName": "二级 2-3",
                        "menuParentId": 3000,
                        "authority": [
                            {
                            "responsibilityCode": "Code-2",
                            "responsibilityId": 10001,
                            "Buttons": [
                                {
                                "ButtonIcon": "fa fa-plus",
                                "ButtonCode": "btnNew",
                                "ButtonId": 1614005,
                                "ButtonName": "新增"
                                },
                                {
                                "ButtonIcon": "fa fa-download",
                                "ButtonCode": "btnImport",
                                "ButtonId": 1614006,
                                "ButtonName": "导入"
                                }
                            ]
                            }
                        ]
                        },
                        {
                        "IconName": "",
                        "levelId": 2,
                        "menuId": 3004,
                        "menuName": "二级 2-4",
                        "menuParentId": 3000,
                        "authority": [
                            {
                            "responsibilityCode": "Code-6",
                            "responsibilityId": 10006,
                            "Buttons": []
                            }
                        ]
                        }
                    ]
                    }
                ]
            }

            `


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
