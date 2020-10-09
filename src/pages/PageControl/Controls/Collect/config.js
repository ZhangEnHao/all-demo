export default {
  controlType: "Collect",
  title: "采集",
  icon: "control",
  presentation: "采集表",
  controlledProps: [
    {
      code: "devicesInfo",
      label: "主机信息",
      parameterType: "controlledProps",
      type: "Select",
      rules: [{ required: true, message: `请选择主机信息来源组件编码!` }],
    }
  ],
  privateProps: [
    // {
    //   code: "operateCode",
    //   label: "操作",
    //   parameterType: "privateProps",
    //   type: "Select",
    //   optionType: "HTTP",
    //   options: {
    //     requestURL: "http://jsonplaceholder.typicode.com/users",
    //     method: "GET",
    //     queryData: null,
    //     value: "id",
    //     label: "name"
    //   }
    // },
    {
      code: "manageExecute",
      label: "是否在管理机上执行",
      parameterType: "privateProps",
      type: "Switch",
    },
    {
      code: "classifyId",
      label: "操作分类",
      parameterType: "privateProps",
      type: "TreeSelect",
      optionType: "HTTP",
      options: {
        requestURL: "http://jsonplaceholder.typicode.com/users",
        method: "GET",
        queryData: null,
        value: "username",
        label: "name"
      },

    },
    {
      code: "operateCode",
      label: "操作",
      parameterType: "privateProps",
      type: "Select",
      optionType: "HTTP",
      options: {
        requestURL: "http://jsonplaceholder.typicode.com/users",
        method: "GET",
        queryData: {classifyId: null},
        queryByDependForm: "classifyId",
        value: "id",
        label: "name"
      }
    },
    {
      code: "hiddenFlag",
      label: "是否展示",
      parameterType: "privateProps",
      type: "Switch",
    },
  ],
}