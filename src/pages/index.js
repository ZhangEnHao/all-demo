import React, { Component } from 'react';
import { Switch, Route, } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Icon, Row, Col, Dropdown, Menu, Avatar } from 'antd';
import SiderNav from '../components/SiderNav';
import "../assets/less/pages.less";
// 所有的页面
import Statistics from '../pages/Statistics';
import Floor from '../pages/Floor';

const { Header, Sider, Content } = Layout;

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
        <Header className="root-header">
          <Row type="flex" justify="end">
            <Col span={1}>
              <Dropdown overlay={this.initMenu}>
                <Avatar icon="user" />
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider
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
          </Sider>
          <Content id="content">
            {/* <ScrollToTop> */}
            <Switch>
              <Route path="/" exact component={Statistics} />
              <Route path="/floor" exact component={Floor} />
              {/* <Redirect to={`/`} /> */}
            </Switch>
            {/* </ScrollToTop> */}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Pages);
