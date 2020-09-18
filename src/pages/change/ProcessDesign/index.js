import React, { Component } from 'react';
import FlowChart from "../../../components/FlowChart/FlowPage";


let defaultPanel = {
  "end-event": (Antd, form, handleSubmit) => {
    const inlineFormItemLayout = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 18 }
      }
    };

    return (
      <Antd.Form.Item label="Age" {...inlineFormItemLayout}>
        {form.getFieldDecorator("age", {
          initialValue: 12
        })(<Antd.Input onBlur={handleSubmit} />)}
      </Antd.Form.Item>
    )
  }
}

let customizePanele = [
  {
    model: {
      label: 'customize', 
      dataSource: {
        text: null,
      },
      formView: (Antd, form, handleSubmit) => {
        const inlineFormItemLayout = {
          labelCol: {
            sm: { span: 6 }
          },
          wrapperCol: {
            sm: { span: 18 }
          }
        };
        return (
          <Antd.Form.Item label="Age" {...inlineFormItemLayout}>
            {form.getFieldDecorator("age", {
              initialValue: 12
            })(<Antd.Input onBlur={handleSubmit} />)}
          </Antd.Form.Item>
        )
      }
    }
  },
  { model: { label: 'other' } },
  {},
];

const data = {
  nodes: [
    { type: "node", size: "70*70", shape: "flow-circle", color: "#FA8C16", label: "Drone", x: 55, y: 55, id: "drone", index: 0 },
    { type: "node", size: "70*70", shape: "custom-node", color: "#FA8C16", label: "Military", labelOffsetY: 20, icon: "//img.alicdn.com/tfs/TB1OzAmyyLaK1RjSZFxXXamPFXa-200-200.svg", x: 55, y: 255, id: "military", index: 2 }
  ],
  edges: [
    { source: "drone", sourceAnchor: 2, target: "military", targetAnchor: 0, id: "drone-military", index: 1 }
  ],
};

class ProcessDesign extends Component {


  render() {

    return (
      <>
        <FlowChart
          defaultPanel={defaultPanel}
          customizePanele={customizePanele}
          data={data} />
      </>
    )
  }
}

export default ProcessDesign
