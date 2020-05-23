import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

export default class Link extends Component {

  hexToRgba = (hex, opacity) => {
    let rgbaColor = "";
    let reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
      rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
        "0x" + hex.slice(3, 5)
      )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
  }
  getOption = props => {
    let { dataSource } = props;
    let { time, today, yesterday } = dataSource;
    return {
      backgroundColor: '#fff',
      title: {
        text: '冷却回水温度',
        textStyle: {
          // color: '#FFF',
          align: 'right',
        },
        right: "center"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: "shadow",
          textStyle: {
            color: "#fff"
          }
        },
        formatter: function (params) {
          let result = params[0].name + "<br>";
          params.forEach(function (item) {
            if (item.value !== '-') {
              result += item.marker + " " + item.seriesName + " : " + item.value + "°C</br>";
            } else {
              result += item.marker + " " + item.seriesName + " :  - </br>";
            }
          });
          return result;
        }
      },
      legend: {
        show: true,
        x: 'right',
        top: '0',
        icon: 'stack',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#000000'
        },
      },
      grid: {
        top: 30,
        bottom: 70,
        left: 40,
        right: 40,
        textStyle: {
          color: "#fff"
        }
      },
      calculable: true,
      xAxis: [{
        type: "category",
        axisLabel: {
          formatter: function (value) { return value; }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: time,
      }],

      yAxis: [{
        type: "value",
        name: '°C',
        splitNumber: 3,
        scale: true
      }],
      dataZoom: [{
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 10,
      }, {
        type: "inside",
        show: true,
        height: 15,
      }],
      series: [{ name: "今天", data: today, color: '#675bba' }, { name: "昨天", data: yesterday, color: '#d14a61' }].map(item => {
        return ({
          name: item.name,
          type: "line",
          smooth: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          symbolSize: "none",
          symbol: 'circle',
          itemStyle: {
            color: item.color,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                [{
                  offset: 0,
                  color: this.hexToRgba(item.color, 0.3)
                },
                {
                  offset: 1,
                  color: this.hexToRgba(item.color, 0.1)
                }
                ],
                false
              ),
              shadowColor: this.hexToRgba(item.color, 0.1),
              shadowBlur: 10
            }
          },
          data: item.data
        })
      })
    }
  }

  render() {


    return (
      <ReactEcharts
        option={this.getOption(this.props)}
        style={{ height: '100%', }}
      />
    )
  }
}