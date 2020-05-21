import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {

	arrayObj = (array,key) => {
    var resObj = {};
    for(var i=0;i<array.length;i++){
      resObj[array[i][key]] = array[i];
    }
    return resObj;
  }
	getOption = options => {
		let { title, dataSource, color, themes } = options;		
		let objData = {};
		let totals = 0;
		let legendData = [];
		if(dataSource.length) {
			objData = this.arrayObj(dataSource, "name");
			for (var i = 0; i < dataSource.length; i++) {
				totals += dataSource[i].value;
				legendData.push(`${dataSource[i].name}`);
			}
		}

		return {
			title: {
        text: title,
        color: '#555',
        textStyle: {
					align: 'center',
          color: themes ? "#FFFFFF" : "#333333"
        },
        subtextStyle: {
          fontSize: 20,
					align: 'center',
          color: themes ? "#a4a4a4" : "#aaaaaa"
        },
        x: 'center',
        y: '0',
      },
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				bottom: "0",
				textStyle: {
          color: themes ? "#FFFFFF" : "#666666"
        },
				formatter: function(name) {					
					if(JSON.stringify(objData) !== "{}" && objData[name].value) {
          // let blank = 10 - name.length;
						return `
					
${name}

${objData[name].value}`					
					}else {
						return
					}

				},
				data: options.legendData,
				itemHeight: options.legendData ? 32.3 : 14
			},
			series: [
				{
					name: title,
					type: 'pie',
					center: ['50%', '50%'],
					radius: "70%",
					avoidLabelOverlap: false,
					hoverAnimation: false,
					color: color,
					label: {
						normal: {
							show: true,
							position: "inside",
							formatter: function (params) {
								if(totals) {
									let percent = ((params.value / totals) * 100).toFixed(0);
									return `${percent}%`
								}else {
									return
								}				

							}
						},
						emphasis: {
							show: false
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: dataSource
				}
			]
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