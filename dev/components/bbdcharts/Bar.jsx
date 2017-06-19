import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';


//柱状图谱
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
    getSeries:function(series){
        var seriesData = [];
        this.props.parms.legend.forEach(function(val,i){
            var baseData = {
                name:val,
                type:'bar',
                label: {
                    normal: {
                        show: this.props.labelShow,
                        position: this.props.labelPosition || 'right'
                    }
                },
                barWidth:this.props.barWidth||6,
                data:this.props.parms.series[i]
            };
            seriesData.push(baseData);
        }.bind(this));
        return seriesData;
    },
    getxAxis:function(){
        if(this.props.vertical || this.props.vertical==undefined){
            return {
                type : 'category',
                data : this.props.parms.xAxis,
                axisLine:Config.xAxis.axisLine,
                axisLabel:Config.xAxis.axisLabel,
                axisTick:Config.xAxis.axisTick,
                splitLine:Config.xAxis.splitLine
            }
        }else{
            return {
                type : 'value',
                axisLine:Config.xAxis.axisLine,
                axisLabel:Config.xAxis.axisLabel,
                axisTick:Config.xAxis.axisTick,
                splitLine:Config.xAxis.splitLine
            }
        }
    },
    getyAxis:function(){
        if(this.props.vertical || this.props.vertical==undefined){
            return {
                type : 'value',
                axisLine:Config.yAxis.axisLine,
                axisLabel:Config.yAxis.axisLabel,
                axisTick:Config.yAxis.axisTick,
                splitLine:Config.yAxis.splitLine
            }
        }else{
            return {
                type : 'category',
                data : this.props.parms.xAxis,
                axisLine:Config.yAxis.axisLine,
                axisLabel:Config.yAxis.axisLabel,
                axisTick:Config.yAxis.axisTick,
                splitLine:Config.yAxis.splitLine
            }
        }
    },
    getOption:function(){
        const option = {
            title:{
                text:this.props.title,
                textStyle:Config.title.textStyle,
                padding:Config.title.padding
            },
            color: this.props.color,
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle:{
                        color:'transparent'
                    }
                }
            },
            dataZoom:[{
                show:this.props.dataZoom.show === 'hide'?false:true,
                type: 'slider',
                startValue:0,//this.props.parms.xAxis.length-this.props.start,
                realtime: true,
                bottom:0,
                borderColor:this.props.dataZoom.borderColor,
                fillerColor:this.props.dataZoom.fillerColor,
                backgroundColor:this.props.dataZoom.backgroundColor,
                handleStyle:{
                    color:this.props.dataZoom.handleColor
                },
                textStyle:{
                    color:'#fff'
                },
                dataBackground:{
                    areaStyle:{
                        color:'#3D625C'
                    }
                }
            }],
            legend:{
                data:this.props.parms.legend,
                textStyle:Config.legend.textStyle
            },
            grid: {
                left: '1%',
                right: '4%',
                bottom: '1%',
                top:'9%',
                containLabel: true
            },
            xAxis : this.getxAxis(),
            yAxis : this.getyAxis(),
            series : this.getSeries()
        };
        return option;
    },
    getInstance:function(){
        return this.refs.chart.getEchartsInstance();
    },
    render() {
        return (
            <div className='chart-gy'>
                <div className='parent'>
                    <ReactEcharts ref='chart'
                        option={this.getOption()} 
                        style={this.props.style}
                        className='chart-bar' />
                </div>
            </div>
        );
    }
});

module.exports = Bar;