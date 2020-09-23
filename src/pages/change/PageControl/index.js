import React, { Component } from 'react';
import { Row, Col, Card, } from 'antd';
import { observer } from 'mobx-react';
import TreeControl from './controls/TreeControl';
import TableBySearch from './controls/TableBySearch';
import TableByAdd from './controls/TableByAdd';
import store from '../../../Store';

import { testData } from './testData';

@observer
class PageControl extends Component {

  initControl = dataSource => {

    return dataSource.map((controlItem, controlIndex) => {

      const { colSpan, name, code, } = controlItem;

      return (
        <Col span={colSpan} key={controlIndex}>
          <Card title={name} code={code} bodyStyle={{ padding: 0 }}>
            {this.initComponent(controlItem)}
          </Card>
        </Col>
      )
    });
  }

  initComponent = (controlItem) => {

    let property = {};
    for(let key in controlItem.property) {
      property[key] = store.dataSource[controlItem.property[key]]
    }
    let component = null;
    switch (controlItem.type) {
      case "Tree":
        component = <TreeControl {...controlItem}  />
        break;
      case "TableBySearch":
        component = <TableBySearch {...controlItem} {...property}  />
        break;
      case "TableByAdd":
        component = <TableByAdd {...controlItem} {...property}  />
        break;    
      default:
        component = null;
    }
    return component;
  }



  render() {
    return (
      <>
        <Row>
          {this.initControl(testData)}
        </Row>
      </>
    )
  }
}

export default PageControl
