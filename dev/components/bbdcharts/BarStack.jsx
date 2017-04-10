import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

//柱状堆叠
const BarStack = React.createClass({
    propTypes: {
    },
    getSeries:function(){
        var series = [];
        this.props.parms.series.forEach(function(val,i){
            var base = {
                name: val.name,
                type: 'bar',
                stack: val.stack,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter:i==3||i==7?this.props.parms.series[i].stack:'',
                        textStyle:{
                            color:'#5C709A',
                            fontSize:12
                        }
                    }
                },
                barWidth:this.props.barWidth||12,
                data: val.data
            }
            series.push(base);
        }.bind(this));
        return series;
    },
    getOption:function(){
        const option = {
            tooltip : {
                /*trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }*/
            },
            color:this.props.color,
            legend: {
                data: this.props.parms.legend,
                textStyle:Config.legend.textStyle,
                itemWidth:16,
                itemHeight:10
            },
            grid: {
                right: 12,
                left: '0%',
                bottom: '0%',
                top:12,
                containLabel: true
            },
            xAxis: {
                name: '',
                type: this.props.vertical==false?'value':'category',
                data: this.props.vertical==false?[]:this.props.parms.yAxis,
                nameTextStyle:{
                    color:Config.yAxis.nameTextStyle.color
                },
                axisLine:Config.xAxis.axisLine,
                axisLabel:Config.xAxis.axisLabel,
                axisTick:Config.xAxis.axisTick,
                splitLine:Config.xAxis.splitLine
            },
            yAxis: {
                name: '',
                type: this.props.vertical==false?'category':'value',
                data: this.props.vertical==false?this.props.parms.yAxis:[],
                nameTextStyle:{
                    color:Config.yAxis.nameTextStyle.color
                },
                axisLine:Config.yAxis.axisLine,
                axisLabel:Config.yAxis.axisLabel,
                axisTick:Config.yAxis.axisTick,
                splitLine:Config.yAxis.splitLine
            },
            series: this.getSeries()
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
                        className='chart-barstack' />
                </div>
            </div>
        );
    }
});

module.exports = BarStack;