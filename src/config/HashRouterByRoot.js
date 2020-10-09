// 所有前端页面根路径前缀
export const urlByRoot = "";

// 项目前端左侧路由设置
export const siderMenusByRoot = [
  {
    title: "流程编辑器",
    key: `${urlByRoot}/processDesign`,
    icon: "area-chart",
  },
  {
    title: "可拖拽弹框",
    key: `${urlByRoot}/dragModal`,
    icon: "zoom-in",
  },
  {
    title: "表单控件配置",
    key: `${urlByRoot}/pageControl/configView`,
    icon: "reconciliation",
  },
  {
    title: "表单控件渲染",
    key: `${urlByRoot}/pageControl/renderView`,
    icon: "form",
  },
];
