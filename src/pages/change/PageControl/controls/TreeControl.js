import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { observer } from 'mobx-react';
import store from '../../../../Store';
import ajax from '../../../../api/ajax';

const { SubMenu } = Menu;

@observer
class TreeControl extends Component {

  handleClick = async () => {
    let result = await ajax("http://jsonplaceholder.typicode.com/users");
    store.setDataSourceByCode(this.props.code, result);
  }
  
  getMenuNodes = menuConfig => {
    return menuConfig.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            {item.icon ? <Icon type={item.icon} /> : null}
            <span>{item.title}</span>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key}
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
    let leftTreeByAll = [
      {
        "key": "code1",
        "title": "code1",
        "icon": "pie-chart",
        "children": [
          {
            "key": "code10",
            "title": "code10",
            "icon": "align-center",
            "children": [
              {
                "key": "code100",
                "title": "code100",
                "icon": "border-right"
              }
            ]
          }
        ]
      }
    ];
    

    return (
      <Menu
        mode="inline"
        inlineIndent={24}
        onClick={ this.handleClick }
        >
        {this.getMenuNodes(leftTreeByAll)}
      </Menu>
    );
  }
}

export default TreeControl
