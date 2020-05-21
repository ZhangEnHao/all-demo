import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import BasicInfo from "../../components/BasicInfo";
import { BasicInfoList } from "./BasicInfoConfig";
import state from '../../Store';
import Line from '../../components/Charts/Line';
import imgByone from '../../assets/images/1.jpg';

@observer
class Statistics extends Component {

  componentDidMount() {
    state.reqLatestDataByController();
    state.reqTodayDataByControllerNo();
    state.reqYesterdayDataByControllerNo();
  }

  render() {
    return (
      <div style={{paddingTop: 20}}>
        <BasicInfo infos={BasicInfoList} dataSource={state.latestData} />
        <Row style={{height: 350, width: "100%", backgroundColor: "#d1d1d1"}}>
          <Col span={18}>
            {/* <img src={imgByone} width="100%" height="100%"/> */}
          </Col>
          <Col span={6}>

          </Col>
        </Row>
        <Row style={{height: 200,}}>
          <Col span={24} style={{height: 200,}}>
          <Line dataSource={state.todayData}/>
          </Col>
        </Row>
      </div>
    )
  }
}


export default Statistics