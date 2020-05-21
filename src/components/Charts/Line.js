import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';


export default class Link extends Component {

  
  getOption = props => {
    let { dataSource } = props;
    let { time, data } = dataSource;
    return {
      xAxis: {
          type: 'category',
          data: time
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: data,
          type: 'line'
      }]
  }
  }

  render() {


    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        style={{ height: '100%' }}
      />
    )
  }
}