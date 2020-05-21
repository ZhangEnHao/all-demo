import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Ring extends Component {

  arrayObj = (array,key) => {
    var resObj = {};
    for(var i=0;i<array.length;i++){
      resObj[array[i][key]] = array[i];
    }
    return resObj;
  }

  getOption = options => {    
    let { totalsTit, dataSource, color, themes } = options;    
    let objData = this.arrayObj(dataSource, "name");
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
          fontSize: 35,
          align: 'center',
          lineHeight: 20,
          color: themes ? "#FFFFFF" : "#333333"
        },
        subtextStyle: {
          fontSize: 15,
          align: 'center',
          color: themes ? "#a4a4a4" : "#aaaaaa"
        },
        x: '17.5%',
        y: '40%',
      },
      legend: {
        orient: 'vertical',
        x: '50%',
        y: 'center',
        textStyle: {
          color: themes ? "#FFFFFF" : "#666666"
        },
        formatter: function(name) {
          // let blank = 10 - name.length;
          return `${name}   ${objData[name].value}   ${((objData[name].value/totals) * 100).toFixed(0)}%`
        },
        data: legendData
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [{
        name: '资源总数',
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['25%', '50%'],
        hoverAnimation: false,
        color: color,
        label: {
          normal: {
            show: false,
          },
        },
        labelLine: {
          normal: {
            show: false
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