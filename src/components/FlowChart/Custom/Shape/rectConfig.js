export default {
  draw(item) {
    const keyShape = this.drawKeyShape(item);

    const group = item.getGraphicGroup();
    const model = item.getModel();

    group.addShape("image", {
      attrs: {
        x: -37,
        y: -22,
        width: 15,
        height: 15,
        img: model.icon
      }
    });

    this.drawLabel(item);

    return keyShape;
  },
  // 设置锚点
  anchor: [[0.5, 0], [0.5, 1],[0, 0.5],[1, 0.5] 
  ]
}