import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';


//折柱混合图
const LineBar = React.createClass({
    propTypes: {
    },
    getSeries:function(){
        var series = [];
        this.props.parms.legend.forEach(function(val,i){
            var base = {
                name:this.props.parms.legend[i],
                label: {
                    normal: {
                        show: false,
                        position: 'top'
                    }
                },
                //type:this.props.type[i%2],
                type:this.props.type[i],
                barWidth:this.props.barWidth||36,
                data:this.props.parms.series[i],
                itemStyle:{
                    normal:{
                        //color:this.props.color[this.props.parms.legend.length==2?i:Math.floor(i/2)]
                        color:this.props.color[i]
                    }
                }
            }
            if(this.props.type[i]==='line'){
                base.yAxisIndex = 1;
            }
            series.push(base);
        }.bind(this));
        return series;
    },
    getyAxis:function(){
        var yAxis = [];
        this.props.parms.yAxis.forEach(function(val,i){
            var base = {
                type: 'value',
                name: val,
                axisLine:Config.yAxis.axisLine,
                axisLabel:Config.yAxis.axisLabel,
                axisTick:Config.yAxis.axisTick,
                splitLine:Config.yAxis.splitLine,
                nameTextStyle:Config.yAxis.nameTextStyle
                /*min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }*/
            }
            yAxis.push(base);
        }.bind(this));
        return yAxis;
    },
    getOption:function(){
        const option = {
            //color:this.props.parms.color,
            title:{
                text:this.props.title||'',
                textStyle:Config.title.textStyle,
                padding:Config.title.padding
            },
            grid:this.props.grid,
            tooltip: {
                trigger: 'axis',
                axisPointer:{
                    lineStyle:{
                        opacity:0
                    }
                },
                formatter:function(parms){
                    var html = '';
                    parms.forEach(function(val,i){
                        i===0 && (html = val.name+'<br/>');
                        var dw = i%2===1?'':'';
                        var style = 'width:10px;height:10px;display:inline-block;margin-right:4px;background:'+val.color;
                        html +='<span style="'+style+'"></span>'+val.seriesName+'：'+val.value+dw+'<br/>';
                    });
                    return html;
                }
            },
            legend:{
                data:this.props.parms.legend,
                textStyle:Config.legend.textStyle
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.props.parms.xAxis,
                    axisLine:Config.xAxis.axisLine,
                    axisLabel:Config.xAxis.axisLabel,
                    axisTick:Config.xAxis.axisTick,
                    splitLine:Config.xAxis.splitLine
                }
            ],
            yAxis: this.getyAxis(),
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
                        className='chart-linebar' />
                </div>
            </div>
        );
    }
});

module.exports = LineBar;