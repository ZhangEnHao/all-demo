import React, { Component } from 'react';
import { Row, Col, Button, InputNumber } from 'antd';
import { observer } from 'mobx-react';
import state from '../../Store';
import Line from '../../components/Charts/Line';
import WaterLine from '../../components/Charts/WaterLine';
import ImgBox from '../../components/ImgBox';
import "./statistics.less";

// import imgByone from '../../assets/images/1.png';

@observer
class Statistics extends Component {

  componentDidMount() {
    state.reqLatestDataByController();
    state.reqTodayDataByControllerNo();
    state.reqWaterTempDataByMachine();
  }

  render() {
    return (
      <div className="statistics">
        <Row className="statistics-row" style={{ height: "65%" }}>
          <Col span={8} className="statistics-row-line">
            <Row className="statistics-row" style={{ height: "50%" }}>
              <Col span={24} className="statistics-row-line">
                <div style={{ position: "relative", height: "100%", width: "220%", zIndex: 9 }}>
                  <WaterLine dataSource={state.wterTempData} />
                </div>
              </Col>
            </Row>
            <Row className="statistics-row" style={{ height: "50%", background: "#0a182b" }}>
              <Col span={24} className="statistics-row-line">
                <Row className="statistics-row-open" style={{ paddingTop: 30 }}>
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >一层客厅</Button>
                    <InputNumber defaultValue={30} size="small" />
                  </Col>
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >一层过道</Button>
                    <InputNumber defaultValue={31} size="small" />
                  </Col>
                </Row>
                <Row className="statistics-row-open" >
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >二层主卧</Button>
                    <InputNumber defaultValue={22} size="small"/>
                  </Col>
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >二层次卧</Button>
                    <InputNumber defaultValue={22} size="small"  />
                  </Col>
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >二层书房</Button>
                    <InputNumber defaultValue={22} size="small"  />
                  </Col>
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >二层玄厅</Button>
                    <InputNumber defaultValue={22} size="small"  />
                  </Col>
                </Row>
                <Row className="statistics-row-open" >
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >三层卧室</Button>
                    <InputNumber defaultValue={22} size="small"  />
                  </Col>
                  <Col span={12} className="statistics-row-open-col" >
                    <Button size="small" type="primary" style={{ marginRight: 10 }} >三层书房</Button>
                    <InputNumber defaultValue={22} size="small"/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={16} className="statistics-row-line">
            <ImgBox dataSource={state.latestData} />
          </Col>
        </Row>
        <Row className="statistics-row" style={{ height: "35%" }}>
          <Col span={24} className="statistics-row-line">
            <Line dataSource={state.todayData} />
          </Col>
        </Row>
      </div>
    )
  }
}


export default Statistics