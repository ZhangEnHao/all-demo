import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import { deepClone } from '../utils';


import store from '../Store';

@observer
class RenderView extends Component {

  initControls = () => {
    let controlsConfig = JSON.parse(localStorage.getItem("controlsConfig"));

    return controlsConfig.map((control, index) => {
      let { name, controlType, controlledProps, privateProps } = control;
      const Component = require(`../Controls/${controlType}/index.js`).default;

      for (let key in controlledProps) {
        controlledProps[key] = deepClone(toJS(store.dataSource[controlledProps[key]]));
      }
      let controlByOpen = deepClone({ ...control, ...controlledProps, ...privateProps });
      delete controlByOpen.controlledProps;
      delete controlByOpen.privateProps;

      return (
        <Card title={`${name}`} key={index} headStyle={{paddingLeft: 0, paddingRight: 0}} bodyStyle={{padding: 0}} bordered={false} style={{marginBottom: 20}}>
          <Component {...controlByOpen} />
        </Card>
      )
    })
  }

  componentDidMount() {

  }

  render() {
    return (<Card bodyStyle={{padding: "0 20px"}}>
      { this.initControls()}
    </Card>)
  }
}

export default RenderView
