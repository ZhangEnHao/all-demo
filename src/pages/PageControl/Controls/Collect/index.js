import React, { Component } from 'react';
import { Card, Row, Col, Button, Table,  } from 'antd';
import store from '../../Store';


class Collect extends Component {

  logProps = () => {
    console.log("子控件接收", this.props);
  }

  setThisData = () => {
    store.setDataSourceByCode(this.props, [
      { deviceName: "123", size: 1 },
      { deviceName: "321", size: 2 },
      { deviceName: "213", size: 3 },
    ]);
  }

  componentDidMount() {
    console.log(this.props);
  }


  render() {
    const tableProps = {
      rowKey: "id",
      pagination: false,
      bordered: true,
      size: "middle",
      scroll: { y: "calc(85vh - 100px)" },
    }

    return (
      <Card bodyStyle={{padding: 0}} bordered={false}>
        <Table 
          {...tableProps} />
        <Row>
          <Col span={24}>
            { JSON.stringify(this.props) }
          </Col>
          <Col span={24}>
            Collect
          </Col>
          <Col span={24}>
            <Button onClick={this.logProps} type="primary">获取props</Button>
          </Col>
          <Col span={24}>
            {
              JSON.stringify(this.props)
            }
          </Col>
          <Col span={24}>
            <Button onClick={this.setThisData} type="primary">推送数据</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Collect
