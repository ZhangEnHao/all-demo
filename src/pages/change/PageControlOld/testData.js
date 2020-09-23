export const testData = [
  {
    type: "Tree",
    name: "部署单元树",
    code: "tree",
    colSpan: 4,
  },
  {
    type: "TableBySearch",
    name: "主机查询列表",
    code: "table",
    colSpan: 10,
    relyControls: ["tree"],
    dataSourceCode: "tree",
  },
  {
    type: "Table",
    name: "主机添加列表",
    code: "table1",
    colSpan: 10,
    relyControls: ["table"],
    dataSourceCode: "table",
  },
]