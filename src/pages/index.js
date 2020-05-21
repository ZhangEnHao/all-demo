import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Icon } from 'antd';
import ScrollToTop from '../components/ScrollToTop';
import SiderNav from '../components/SiderNav';
import "../assets/less/pages.less";
// 所有的页面
import Statistics from '../pages/Statistics';
import Floor from '../pages/Floor';

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

  render() {
    return (
      <Layout className="root-layout">
        <Sider 
          theme="light"
          trigger={null} collapsible collapsed={this.state.collapsed} 
          width={280} className="root-sider" >
          <SiderNav />
          <div 
            onClick={this.toggle}
            className="root-collapsible">
            <Icon type={this.state.collapsed ? 'double-right' : 'double-left'} />
          </div>
        </Sider>
        <Content id="content">
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Statistics} />
              <Route path="/floor" exact component={Floor}/>
              <Redirect to={`/`} />
            </Switch>
          </ScrollToTop>
        </Content>
      </Layout>
    )
  }
}

export default withRouter(Pages);
