export default {
  controlType: "ChooseHost",
  title: "选主机",
  icon: "control",
  presentation: "选主机需求场景: 现在有大量的子组件存放在对应文件夹",
  controlledProps: [],
  privateProps: [
    { 
      code: "hostRuleCode", 
      label: "选择主机规则", 
      type: "Select", 
      rules: [{ required: true, message: `请选择主机规则!` }],
      optionType: "JSON",
      options: [
        {value: "DU_ONE_DEVICE", label: "一个部署单元一台机器"},
        {value: "DU_ANY_DEVICE", label: "一个部署单元任选机器"},
        {value: "DU_ALL_DEVICE", label: "一个部署单元全部机器"},
      ] 
    },
    {
      code: "groupRuleCode",
      label: "主机分组规则",
      type: "Switch",
      parameterType: "privateProps",
      childrenByChange: [
        {
          trigger: true,
          formItems: [
            { 
              code: "machineGroupRule", 
              label: "不破坏高可用", 
              type: "Select",
              optionType: "JSON",
              options: [
                { value: "allMachineInSameGroup", label: "同一部署单元的全部主机需要分到同一组内" },
                { value: "canNotselectAllMachine", label: "同一部署单元的全部主机不能分到同一组内" },
              ]
            },
            {
              code: "maximumConcurrent",
              label: "每组最大并发量",
              type: "InputNumber",
            },
            {
              code: "executiveRestriction",
              label: "组间执行限制",
              type: "MultipleSelect",
              optionType: "JSON",
              options: [
                { value: "manualSerial", label: "串行手动" },
                { value: "manualParallel", label: "串行自动" },
                { value: "automaticSerial", label: "并行手动" },
                { value: "automaticParallel", label: "并行自动" },
              ],
              rules: [{ required: true, message: `请选择组间执行限制!` }],
            }
          ]
        },
        {
          trigger: false,
          formItems: []
        }
      ]
    }
  ],
}