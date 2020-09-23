/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Menu, Icon } from 'antd';
import { siderMenusByRoot } from '../../config/HashRouterByRoot';

const { SubMenu } = Menu;

@observer
class SiderNav extends Component {

  getMenuNodes = menuConfig => {    
    return menuConfig?.map((item, index) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  render() {

    return (
      <Menu
        mode="inline"
        inlineIndent={15}
        className="root-sider-nav"
        defaultSelectedKeys="/statistics"
        style={{ borderColor: "transparent"}} >
        {this.getMenuNodes(siderMenusByRoot)}
      </Menu>
    );
  }
}

export default withRouter(SiderNav)
