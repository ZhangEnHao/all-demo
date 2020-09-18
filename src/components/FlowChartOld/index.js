import React, { Component } from 'react';
import { Layout } from '../../pages/change/DragModel/antd';
import GGEditor, { Flow, Command, Item, ItemPanel } from 'gg-editor';
import ToolbarPanel from './ToolbarPanel';
import ItemPanels from './ItemPanels';
import './index.less';


const { Header, Sider, Content } = Layout;


class FlowChart extends Component {




  render() {
    const { itemList, data, height } = this.props;
    return (
      <GGEditor>
        <Layout className="flow-chart">
          <Header>
            {/* <ToolbarPanel options={{Command, constants}} /> */}
          </Header>
          <Layout>
            <Sider theme="light" width="110">
              <ItemPanels itemList={itemList} options={{Item, ItemPanel}} />
            </Sider>
            <Content>
              <Flow data={data} style={{ height: height }}  />
            </Content>
          </Layout>
        </Layout>
      </GGEditor>
    )
  }
}

export default FlowChart