export default {
  draw(item) {
    const keyShape = this.drawKeyShape(item);

    const group = item.getGraphicGroup();
    const model = item.getModel();

    group.addShape("image", {
      attrs: {
        x: -24,
        y: -24,
        width: 48,
        height: 48,
        img: model.icon
      }
    });

    // 名称文本
    const label = model.label ? model.label : this.label;
    group.addShape('text', {
      attrs: {
        text: label,
        x: 0,
        y: 30,
        textAlign: 'center',
        textBaseline: 'top',
        fill: 'rgba(0,0,0,0.65)',
      },
    });

    return keyShape;
  },
  // 设置锚点
  anchor: [[0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5]
  ]
}