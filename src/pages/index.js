import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Icon, Menu, } from 'antd';
import SiderNav from '../components/SiderNav';
import "../assets/less/pages.less";
// 所有的页面
import ProcessDesign from './change/ProcessDesign';
import DragModel from "./change/DragModel";
import pageControl from "./change/PageControl";

import ControlView from "./PageControl/ConfigView";
import RenderView from "./PageControl/RenderView";

const { Sider, Content } = Layout;

@observer
class Pages extends Component {
  state = {
    collapsed: false,
  };
  // 导航收缩切换
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  initMenu = () => {
    return <Menu>
      <Menu.Item>
        <span onClick={() => this.props.history.push('/login')}>退出登录</span>
      </Menu.Item>
    </Menu>
  };

  render() {
    return (
      <Layout className="root-layout">
        <Layout>
          {/* <Sider
            theme="light"
            trigger={null} collapsible collapsed={this.state.collapsed}
            width="130"
            className="root-sider" >
            <SiderNav />
            <div
              onClick={this.toggle}
              className="root-collapsible">
              <Icon type={this.state.collapsed ? 'double-right' : 'double-left'} />
            </div>
          </Sider> */}
          <Content id="content">
            <Switch>
              <Route path="/processDesign" exact component={ProcessDesign} />
              <Route path="/dragModal" exact component={DragModel} />
              <Route path="/pageControl" exact component={pageControl} />
              <Route path="/pageControl/configView" exact component={ControlView} />
              <Route path="/pageControl/renderView" exact component={RenderView} />



              <Redirect to={`/`} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Pages);
