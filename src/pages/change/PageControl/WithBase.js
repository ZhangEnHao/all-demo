import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Col, Card, } from 'antd';
import store from '../../../Store';



const WithBase = (WrappedComponent) => {

  @observer 
  class Base extends Component {

    set = (type, data) => {
      store.setDataSourceByCode(type, data);
    }

    componentDidMount() {
      store.initDataSource(this.props);
    }

    render() {
      const { colSpan, name, code, } = this.props;

      return (
        <Col span={colSpan}>
        <Card title={name} code={code} bodyStyle={{padding: 0}}>
          <WrappedComponent
            set={this.set}
            {...this.props} dataSource={store.dataSource} />
        </Card>
      </Col>
      )
    }
  }

  return Base
}


export default WithBase
