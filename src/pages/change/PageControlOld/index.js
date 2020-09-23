import React, { Component } from 'react';
import { Row, Col, Card, } from 'antd';
import TreeControl from './controls/TreeControl';
import TableBySearch from './controls/TableBySearch';

import { testData } from './testData';


class PageControl extends Component {
  
  initControl = dataSource => {
    return dataSource.map((controlItem, controlIndex) => {
      const {name, code, colSpan=24 } = controlItem;
      return <Col span={colSpan} key={controlIndex}>
        <Card title={name} code={code} bodyStyle={{padding: 0}}>
          { this.initComponent(controlItem) }
        </Card>
      </Col>
    });
  }

  initComponent = controlItem => {
    const {type, relyControls, ...other } = controlItem;
    let component = null;
    switch(type){
      case "Tree":
        component = <TreeControl />
        break;
      case "TableBySearch":
        component = <TableBySearch relyControls={relyControls} {...other} />
        break;  
      default:
        component = null  ;
    }
    return component;
  }

  render() {
    return (
      <>
        <Row>
          { this.initControl(testData) }
        </Row>
      </>
    )
  }
}

export default PageControl
