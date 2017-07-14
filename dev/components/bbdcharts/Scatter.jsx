import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

// 散点图
class Scatter extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Scatter';
    }
    getSeries(){
        let series = [];
        const {parms, lineIndex, name, symbolSize} = this.props;
        parms.series.forEach((val, i)=>{
            let base = {
                name: parms.legend[i],
                type: 'scatter',
                data: val,
                markLine: {
                    data: [
                        {
                            xAxis: val[lineIndex][0],
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: Config.fontSize
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        fontSize: Config.fontSize
                                    }
                                }
                            }
                        },
                        {
                            yAxis: val[lineIndex][1],
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: Config.fontSize
                                    }
                                },
                                emphasis: {
                                    textStyle: {
                                        fontSize: Config.fontSize
                                    }
                                }
                            }
                        }
                    ],
                    label: {
                        normal: {
                            formatter: (params)=>{
                                var data = params.data;
                                var keys = Object.keys(data);
                                if(keys.indexOf('yAxis') != -1){
                                    return parms.date[lineIndex] + '\n' + params.seriesName + '：\n' + params.value;
                                }
                                return parms.date[lineIndex] + '\n' + name.xAxis + '：' + params.value;
                                
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.16
                    },
                    emphasis: {
                        opacity: 1
                    }
                },
                symbolSize: symbolSize || 30
            };
            series.push(base);
        });
        return series;
    }
    getOption(){
        const {color, grid, parms, name} = this.props;
        const option = {
            color: color || ['#00D5C3', '#9B89EF', '#1D86E2', '#f29c9f'],
            grid: grid || {
                left: '6%',
                right: '6%',
                bottom: '6%',
                top: '6%',
                containLabel: true
            },
            tooltip: {
                showDelay: 0,
                show: false,
                formatter: function (params) {
                    if (params.value.length > 1) {
                        return  params.seriesName + '：' + params.value[1]
                            + '<br/>HHI：' + params.value[0];
                    }
                    
                }
            },
            legend: {
                show: false,
                data: parms.legend,
                left: 'right'
            },
            xAxis: [
                {
                    min: 0,
                    // max:10000,
                    name: name.xAxis,
                    type: 'value',
                    scale: true,
                    nameTextStyle: Config.xAxis.nameTextStyle,
                    axisLine: Config.xAxis.axisLine,
                    axisLabel: Config.xAxis.axisLabel,
                    axisTick: Config.xAxis.axisTick,
                    splitLine: Config.xAxis.splitLine
                }
            ],
            yAxis: [
                {
                    name: name.yAxis,
                    type: 'value',
                    scale: true,
                    nameTextStyle: Config.yAxis.nameTextStyle,
                    axisLine: Config.yAxis.axisLine,
                    axisLabel: Config.yAxis.axisLabel,
                    axisTick: Config.yAxis.axisTick,
                    splitLine: Config.yAxis.splitLine
                }
            ],
            series: this.getSeries()
        };
        return option;
    }
    getInstance(){
        return this.refs.chart.getEchartsInstance();
    }
    render() {
        return (
            <div className="chart-gy">
                <div className="parent">
                    <ReactEcharts ref="chart"
                        option={this.getOption()} 
                        style={this.props.style} 
                        className="chart-line" />
                </div>
            </div>
        );
    }
}

export default Scatter;
