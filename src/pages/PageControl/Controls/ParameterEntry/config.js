export default {
  controlType: "ParameterEntry",
  title: "参数录入",
  icon: "control",
  presentation: "参数录入表介绍",
  controlledProps: [
    // {
    //   code: "devicesInfo",
    //   label: "主机信息",
    //   parameterType: "controlledProps",
    //   type: "Select",
    //   rules: [{ required: true, message: `请选择主机信息来源组件!` }],
    // },
    // {
    //   code: "collectionInfo",
    //   label: "采集表信息",
    //   parameterType: "controlledProps",
    //   type: "Select",
    //   rules: [{ required: true, message: `请选择采集表信息来源组件!` }],
    // }
  ],
  privateProps: [
    {
      code: "parRowType",
      label: "参数录入方式",
      parameterType: "privateProps",
      type: "MultipleSelect",
      options: [
        {value: "byAllDevice", label: "按所有主机维度"},
        {value: "byDeploymentUnit", label: "按部署单元维度"},
      ]
    },
  ],
  liveProps: require("./Config/ConfigByRender.js").default,
}