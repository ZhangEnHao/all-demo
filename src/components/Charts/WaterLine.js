import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

export default class WaterLink extends Component {

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
    let { time, return_temp, output_temp } = dataSource;
    return {
      // title: {
      //   // text: 'chu',
      //   textStyle: {
      //     color: '#FFF',
      //     align: 'center',
      //   }
      // },
      backgroundColor: '#0a182b',
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
              result += item.marker + " " + item.seriesName + " : " + item.value + "</br>";
            } else {
              result += item.marker + " " + item.seriesName + " :  - </br>";
            }
          });
          return result;
        }
      },
      grid: {
        left: '3%',
        right: '5%',
        top: '15%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        show: true,
        x: 'center',
        top: '0',
        icon: 'stack',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#1bb4f6'
        },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#30eee9'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#397cbc'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#195384'
            }
          },
          data: time
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '°C',
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#2ad1d2'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#27b4c2'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#11366e'
            }
          },
          scale: true
        },
      ],
      series: [{ name: "回水温度", data: return_temp, color: '#00d4c7' }, { name: "出水温度", data: output_temp, color: '#0092f6' }].map(item => {
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