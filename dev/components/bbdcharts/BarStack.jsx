import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

//柱状堆叠
const BarStack = React.createClass({
    propTypes: {
    },
    getSeries:function(){
        const {parms, vertical, barWidth} = this.props;
        var series = [];
        parms.series.forEach(function(val,i){
            var base = {
                name: val.name,
                type: 'bar',
                stack: val.stack,
                label: {
                    normal: {
                        show: true,
                        position: vertical === false ? 'right' : 'top',
                        formatter:i==parms.legend.length-1||i==parms.legend.length*2 -1?parms.series[i].stack:'',
                        textStyle:{
                            color:'#5C709A',
                            fontSize:12
                        }
                    }
                },
                barWidth:barWidth||12,
                data: val.data
            }
            series.push(base);
        }.bind(this));
        return series;
    },
    getOption:function(){
        const {color, parms, vertical, grid} = this.props;
        const option = {
            tooltip : {
                /*trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }*/
            },
            color:color,
            legend: {
                data: parms.legend,
                textStyle:Config.legend.textStyle,
                itemWidth:16,
                itemHeight:10
            },
            grid:grid ? Object.assign({}, grid, {containLabel: true}) : {
                left: '1%',
                right: '4%',
                bottom: '1%',
                top:'9%',
                containLabel: true
            },
            xAxis: {
                name: '',
                type: vertical==false?'value':'category',
                data: vertical==false?[]:parms.xAxis,
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
                type: vertical==false?'category':'value',
                data: vertical==false?parms.xAxis:[],
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