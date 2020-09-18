/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Layout, Icon, Divider, Tooltip } from '../FlowChartOld/antd';
import GGEditor, { Flow, Command, ContextMenu, constants, Item, ItemPanel } from '../FlowChartOld/gg-editor';
import './index.less';

const { Header, Sider, Content } = Layout;

const { EditorCommand } = constants;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1518433_oa5sw7ezue.js',
});

const FLOW_COMMAND_LIST = [
  EditorCommand.Undo,
  EditorCommand.Redo,
  '|',
  EditorCommand.Copy,
  EditorCommand.Paste,
  EditorCommand.Remove,
  '|',
  EditorCommand.ZoomIn,
  EditorCommand.ZoomOut,
];


class Designer extends Component {


  render() {
    const { data, height } = this.props;
    return (
      <div className="designer-root">
        <GGEditor>
          <Layout>
            <Header className="designer-header-toolbar">
              {FLOW_COMMAND_LIST.map((name, index) => {
                if (name === '|') {
                  return <Divider key={index} type="vertical" />;
                }
                return (
                  <Command key={name} name={name} className="command" disabledClassName="commandDisabled">
                    <Tooltip title={name}>
                      <IconFont type={`icon-${name}`} />
                    </Tooltip>
                  </Command>
                );
              })}
            </Header>
            <Layout>
              <Sider theme="light" width="109">
                <ItemPanel className="itemPanel">
                  <Item className="item" model={{ type: 'circle', size: 50, label: 'circle', }} >
                    <img src="https://gw.alicdn.com/tfs/TB1IRuSnRr0gK0jSZFnXXbRRXXa-110-112.png" width="55" height="56" draggable={false} />
                  </Item>
                  <Item
                    className="item"
                    model={{ type: 'rect', size: [80, 24], label: 'rect', }} >
                    <img src="https://gw.alicdn.com/tfs/TB1reKOnUT1gK0jSZFrXXcNCXXa-178-76.png" width="89" height="38" draggable={false} />
                  </Item>
                  <Item className="item" model={{ type: 'ellipse', size: [100, 50], label: 'ellipse', }} >
                    <img src="https://gw.alicdn.com/tfs/TB1AvmVnUH1gK0jSZSyXXXtlpXa-216-126.png" width="108" height="63" draggable={false} />
                  </Item>
                  <Item className="item" model={{ type: 'diamond', size: [80, 80], label: 'diamond', }} >
                    <img src="https://gw.alicdn.com/tfs/TB1EB9VnNz1gK0jSZSgXXavwpXa-178-184.png" width="89" height="92" draggable={false} />
                  </Item>
                  <Item className="item" model={{ type: 'triangle', size: [30, 30], label: 'triangle', }} >
                    <img src="https://gw.alicdn.com/tfs/TB12sC2nKH2gK0jSZJnXXaT1FXa-126-156.png" width="63" height="78" draggable={false} />
                  </Item>
                </ItemPanel>
              </Sider>
              <Content className="designer-content">
                <Flow data={data} style={{ height: height }} />
              </Content>
            </Layout>
          </Layout>
          <ContextMenu
            renderContent={(item, position, hide) => {
              const { x: left, y: top } = position;
              return (
                <div className="contextMenu" style={{ position: 'absolute', top, left }}>
                  {[EditorCommand.Undo, EditorCommand.Redo, EditorCommand.PasteHere].map(name => {
                    return (
                      <Command key={name} name={name} className="command" disabledClassName="commandDisabled">
                        <div onClick={hide}>
                          <IconFont type={`icon-${name}`} />
                          <span>{name}</span>
                        </div>
                      </Command>
                    );
                  })}
                </div>
              );
            }}
          />

        </GGEditor>
      </div>
    )
  }
}

export default Designer