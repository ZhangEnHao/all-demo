import React from 'react';
import { Collapse } from 'antd';
import { ItemPanel, Item } from 'gg-editor';
import styles from './index.module.css';

const { Panel } = Collapse;


const defaultPanels = [
  {
    header: "开始事件",
    key: "start",
    itsmList: [
      { size: "48*48", shape: "start-event", model: { color: "#FA8C16", icon: require("../../Common/flow/start.svg"), }, src: require("../../Common/flow/start.svg"), text: '开始节点', },
      { size: "48*48", shape: "timer-event", model: { color: "#FA8C16", icon: require("../../Common/flow/timer-start.svg"),}, src: require("../../Common/flow/timer-start.svg"), text: '定时节点',  },
      { size: "48*48", shape: "message-event", model: { color: "#FA8C16", icon: require("../../Common/flow/message-start.svg"),}, src: require("../../Common/flow/message-start.svg"), text: '消息节点',  },
      { size: "48*48", shape: "signal-event", model: { color: "#FA8C16", icon: require("../../Common/flow/signal-start.svg"), }, src: require("../../Common/flow/signal-start.svg"), text: '信号节点', },
    ]
  },
  {
    header: "活动",
    key: "task",
    itsmList: [
      { size: "80*48", shape: "user-task", model: { color: '#1890FF', icon: require("../../Common/icons/icon_user.svg"), label: '审批节点', }, src: require("../../Common/flow/user-task.svg"), text: '审批节点', },
      { size: "80*48", shape: "script-task", model: { color: '#FA8C16', icon: require("../../Common/icons/icon_script.svg"), label: '脚本节点', }, src: require("../../Common/flow/script-task.svg"), text: '脚本节点', },
      { size: "80*48", shape: "mail-task", model: { color: '#73D13D', icon: require("../../Common/icons/icon_mail.svg"), label: '邮件节点', }, src: require("../../Common/flow/mail-task.svg"), text: '邮件节点', },
      { size: "80*48", shape: "receive-task", model: { color: '#FF85C0', icon: require("../../Common/icons/icon_receive.svg"), label: '接收节点', }, src: require("../../Common/flow/receive-task.svg"), text: '接收节点', },
    ]
  },
  {
    header: "网关",
    key: "gateway",
    itsmList: [
      { size: "48*48", shape: "exclusive-gateway", model: { color: '#13C2C2', icon: require("../../Common/flow/exclusive-gateway.svg"),}, src: require("../../Common/flow/exclusive-gateway.svg"), text: '排他网关', },
      { size: "48*48", shape: "parallel-gateway", model: { color: '#13C2C2', icon: require("../../Common/flow/parallel-gateway.svg"), }, src: require("../../Common/flow/parallel-gateway.svg"), text: '并行网关', },
      { size: "48*48", shape: "inclusive-gateway", model: { color: '#13C2C2', icon: require("../../Common/flow/inclusive-gateway.svg"), }, src: require("../../Common/flow/inclusive-gateway.svg"), text: '包容网关', },
    ]
  },
  {
    header: "捕获事件",
    key: "catch",
    itsmList: [
      { size: "48*48", shape: "timer-catch", model: { color: '#13C2C2', icon: require("../../Common/flow/timer-catch.svg") }, src: require("../../Common/flow/timer-catch.svg"),  text: '定时节点', },
      { size: "48*48", shape: "message-catch", model: { color: '#13C2C2', icon: require("../../Common/flow/message-catch.svg") }, src: require("../../Common/flow/message-catch.svg"), text: '消息节点', },
      { size: "48*48", shape: "signal-catch", model: { color: '#13C2C2', icon: require("../../Common/flow/signal-catch.svg") }, src: require("../../Common/flow/signal-catch.svg"), text: '信号节点', },
    ]
  },
  {
    header: "结束事件",
    key: "end",
    itsmList: [
      { size: "48*48", shape: "end-event", model: { color: "#FA8C16", icon: require("../../Common/flow/end.svg"), }, src: require("../../Common/flow/end.svg"), text: '结束节点', },
    ]
  },
];



export const FlowItemPanel = (data) => {
  const { defaultPanel={}, customizePanele } = data;

  defaultPanels.forEach(panel => {
    panel.itsmList.forEach(item => {
      if(defaultPanel.hasOwnProperty(item.shape)) {
        item.model.formView = defaultPanel[item.shape]
      }
    })
  })

  return (
    <ItemPanel className={styles.itemPanel}>
      <Collapse>
        {
          defaultPanels.map((panelItem) => (
            <Panel header={panelItem.header} key={panelItem.key}>
              {panelItem.itsmList.map((item, index) => {
                const {size, shape, model, src, text} = item;
                
                return (<div key={index} >
                  <Item type="node" size={size} shape={shape} model={model} src={src} />
                  <div>{text}</div>
                </div>)
              })}
            </Panel>
          ))
        }
        {
          customizePanele && customizePanele.length ? (
            <Panel header="定制节点" key="customize">
              {customizePanele.map((item, index) => {
                const {size="80*48", shape="customize-item", model, src=require("../../Common/flow/java-task.svg")} = item;
                let newModel = Object.assign({
                  color: "#FF4D4F",
                  icon: require("../../Common/icons/icon_java.svg"),
                  label: "自定义节点",
                }, model);

                return (<div key={index}>
                  <Item type="node" size={size} shape={shape} model={newModel} src={src} />
                  <div>{newModel.label}</div>
                </div>)
              })}
            </Panel>
          ) : null
        }

      </Collapse>
    </ItemPanel>
  );
};

