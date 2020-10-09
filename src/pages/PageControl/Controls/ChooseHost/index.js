import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import store from '../../Store';


class ChooseHost extends Component {

  setThisData = () => {
    store.setDataSourceByCode(this.props, [
      {ip: "123", deviceName: "123", duName: "ABC"},
      {ip: "321", deviceName: "321", duName: "ABC"},
      {ip: "213", deviceName: "213", duName: "ABC"},
    ]);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Card title={""}>
        <Row>
          <Col span={3}>
            部署单元树
          </Col>
          <Col span={7}>
            主机查询列表
          </Col>
          <Col span={7}>
            主机添加列表
          </Col>
          <Col span={7}>
            主机分组列表
          </Col>
          <Col span={24}>
            <Button onClick={this.setThisData} type="primary">推送数据</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default ChooseHost