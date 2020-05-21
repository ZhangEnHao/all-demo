import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class BaseRing extends Component {

  getOption = options => {
    let { totalsTit, dataSource, color, themes } = options;
    let totals = 0;
    let legendData = [];
    for (var i = 0; i < dataSource.length; i++) {
      totals += dataSource[i].value;
      legendData.push(`${dataSource[i].name}`);
    }
    return {
      title: {
        text: totals,
        subtext: totalsTit,
        color: '#555',
        textStyle: {
          fontSize: 40,
          align: 'center',
          lineHeight: 20,
          color: themes ? "#FFFFFF" : "#333333"
        },
        subtextStyle: {
          fontSize: 18,
          align: 'center',
          color: themes ? "#a4a4a4" : "#aaaaaa"
        },
        x: 'center',
        y: '35%',
      },
      legend: {
        bottom: "0",
        textStyle: {
          color: themes ? "#FFFFFF" : "#666666"
        },
        // itemGap: 20,
        data: legendData
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [{
        name: totalsTit,
        type: 'pie',
        radius: ['60%', '70%'],
        center: ['50%', '45%'],
        hoverAnimation: false,
        color: color,
        label: {
          normal: {
            show: true,
            // fontSize: 20,
            formatter: function (params) {
              let percent = ((params.value / totals) * 100).toFixed(0);
              if(params.value) {
                return `${percent}%`
              }else {
                return
              }
            }
          },
        },
        labelLine: {
          normal: {
            show: false,
            length:7,
            length2:0,
          }
        },
        data: dataSource
      }]
    }
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption(this.props.options)}
        style={{ height: '100%' }}
      />
    )
  }
}