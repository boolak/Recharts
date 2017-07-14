import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

// 柱状图谱
/*
{
    vertical:false,//排列方式，默认为true，代表纵向排列
    legend:['xxx'],
    xAxis:['1aa','1bb','1cc'],
    series:[[12,22,11]],
    color:['#3ed']
}
*/
const Bar = React.createClass({
    propTypes: {
    },
    getSeries: function(series){
        const {parms, labelShow, labelPosition, barWidth, labelFormatter, vertical} = this.props;
        var seriesData = [];
        parms.legend.forEach(function(val, i){
            var baseData = {
                name: val,
                type: 'bar',
                label: {
                    normal: {
                        show: labelShow == undefined ? true : false,
                        position: vertical == undefined ? 'top' : 'right',
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
                barWidth: barWidth || 6,
                data: parms.series[i]
            };
            seriesData.push(baseData);
        }.bind(this));
        return seriesData;
    },
    getxAxis: function(){
        const {vertical, parms, axisLabel} = this.props;
        if(vertical || vertical == undefined){
            return {
                type: 'category',
                data: parms.xAxis,
                axisLine: Config.xAxis.axisLine,
                axisLabel: Object.assign({}, Config.xAxis.axisLabel, axisLabel),
                axisTick: Config.xAxis.axisTick,
                splitLine: Config.xAxis.splitLine
            };
        }
        return {
            type: 'value',
            axisLine: Config.xAxis.axisLine,
            axisLabel: Config.xAxis.axisLabel,
            axisTick: Config.xAxis.axisTick,
            splitLine: Config.xAxis.splitLine
        };
        
    },
    getyAxis: function(){
        const {vertical, parms, axisLabel} = this.props;
        if(vertical || vertical == undefined){
            return {
                type: 'value',
                axisLine: Config.yAxis.axisLine,
                axisLabel: Config.yAxis.axisLabel,
                axisTick: Config.yAxis.axisTick,
                splitLine: Config.yAxis.splitLine
            };
        }
        return {
            type: 'category',
            data: parms.xAxis,
            axisLine: Config.yAxis.axisLine,
            axisLabel: Object.assign({}, Config.xAxis.axisLabel, axisLabel),
            axisTick: Config.yAxis.axisTick,
            splitLine: Config.yAxis.splitLine
        };
        
    },
    getOption: function(){
        const {style, parms, title, legendShow, dataZoom, barWidth, color, grid, tooltipFormatter} = this.props;
        const option = {
            title: {
                text: title || ' ',
                textStyle: Config.title.textStyle,
                padding: Config.title.padding
            },
            color: color,
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',       // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        color: 'transparent'
                    }
                },
                formatter: (p)=>{
                    let html = '';
                    if(tooltipFormatter){
                        html = tooltipFormatter(p);
                    }else{
                        html = `${p[0].name}<br/>`;
                        p.forEach((v, k)=>{
                            html += `<span style="display:inline-block;border-radius:100%;width:10px;height:10px;background:${v.color}"></span> ${v.seriesName}：${v.value}<br/>`;
                        });
                    }
                    return html;
                }
            },
            dataZoom: [{
                show: dataZoom.show === undefined ? false : true,
                type: 'slider',
                startValue: dataZoom.start ? parms.xAxis.length - dataZoom.start : null,
                realtime: true,
                bottom: 0,
                borderColor: dataZoom.borderColor,
                fillerColor: dataZoom.fillerColor,
                backgroundColor: dataZoom.backgroundColor,
                handleStyle: {
                    color: dataZoom.handleColor
                },
                textStyle: {
                    color: '#fff'
                },
                dataBackground: {
                    areaStyle: {
                        color: '#3D625C'
                    }
                }
            }],
            legend: {
                show: legendShow == undefined ? true : false,
                data: parms.legend,
                textStyle: Config.legend.textStyle
            },
            grid: grid ? Object.assign({}, grid, {containLabel: true}) : {
                left: '1%',
                right: '4%',
                bottom: '1%',
                top: '9%',
                containLabel: true
            },
            xAxis: this.getxAxis(),
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
                        className="chart-bar" />
                </div>
            </div>
        );
    }
});

module.exports = Bar;