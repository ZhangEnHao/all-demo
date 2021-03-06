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
    outputFun: () => { },
    property:{
      table: "tree",
    }
  },
  {
    type: "TableByAdd",
    name: "主机添加列表",
    code: "table1",
    colSpan: 10,
    property:{
      data: "table",
    }
  },
]