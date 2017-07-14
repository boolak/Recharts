import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

// 折柱混合图
const LineBar = React.createClass({
    propTypes: {
    },
    getSeries: function(){
        const {parms, type, barWidth, color, labelBarShow, labelLineShow, labelFormatter} = this.props;
        var series = [];
        parms.legend.forEach(function(val, i){
            var base = {
                name: parms.legend[i],
                label: {
                    normal: {
                        show: type[i] === 'line' ? labelLineShow : labelBarShow,
                        position: 'top',
                        formatter: (p)=>{
                            let html = '';
                            if(labelFormatter){
                                html = labelFormatter(p);
                            }else{
                                html = `${p.value}`;
                            }
                            return html;
                        }
                    }
                },
                // type:type[i%2],
                type: type[i],
                barWidth: barWidth || 36,
                data: parms.series[i],
                itemStyle: {
                    normal: {
                        // color:color[parms.legend.length==2?i:Math.floor(i/2)]
                        color: color[i]
                    }
                }
            };
            if(type[i] === 'line'){
                base.yAxisIndex = 1;
            }
            series.push(base);
        }.bind(this));
        return series;
    },
    getyAxis: function(){
        var yAxis = [];
        this.props.parms.yAxis.forEach(function(val, i){
            var base = {
                type: 'value',
                name: val,
                axisLine: Config.yAxis.axisLine,
                axisLabel: Config.yAxis.axisLabel,
                axisTick: Config.yAxis.axisTick,
                splitLine: Config.yAxis.splitLine,
                nameTextStyle: Config.yAxis.nameTextStyle
                /* min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }*/
            };
            yAxis.push(base);
        }.bind(this));
        return yAxis;
    },
    getOption: function(){
        const {title, grid, parms, axisLabel, tooltipFormatter} = this.props;
        const option = {
            title: {
                text: title || '',
                textStyle: Config.title.textStyle,
                padding: Config.title.padding
            },
            grid: grid ? Object.assign({}, grid, {containLabel: true}) : {
                top: 65, bottom: 10,
                left: 20, right: 20,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        opacity: 0
                    }
                },
                formatter: function(p){
                    if(tooltipFormatter){
                        return tooltipFormatter(p);
                    }
                    var html = `${p[0].name}<br/>`;
                    p.forEach(function(val, i){
                        var style = 'width:10px;height:10px;display:inline-block;margin-right:4px;background:' + val.color;
                        html += '<span style="' + style + '"></span>' + val.seriesName + '：' + val.value + '<br/>';
                    });
                    return html;
                    
                }
            },
            legend: {
                data: parms.legend,
                textStyle: Config.legend.textStyle
            },
            xAxis: [
                {
                    type: 'category',
                    data: parms.xAxis,
                    axisLine: Config.xAxis.axisLine,
                    axisLabel: Object.assign({}, Config.xAxis.axisLabel, axisLabel),
                    axisTick: Config.xAxis.axisTick,
                    splitLine: Config.xAxis.splitLine
                }
            ],
            yAxis: this.getyAxis(),
            series: this.getSeries()
        };
        return option;
    },
    getInstance: function(){
        return this.refs.chart.getEchartsInstance();
    },
    render() {
        return (
            <div className="chart-gy">
                <div className="parent">
                    <ReactEcharts ref="chart"
                        option={this.getOption()} 
                        style={this.props.style} 
                        className="chart-linebar" />
                </div>
            </div>
        );
    }
});

module.exports = LineBar;