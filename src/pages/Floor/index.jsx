import React, { Component } from 'react';
// import { Row, Col } from 'antd';
import state from '../../Store';
// import Line from '../../components/Charts/Line';

export default class Floor extends Component {

  componentDidMount() {
    state.reqLatestDataByController();
  }

  render() {
    return (
      <div style={{paddingTop: 20}}>
        
      </div>
    )
  }
}
