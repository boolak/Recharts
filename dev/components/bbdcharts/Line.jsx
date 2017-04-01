import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

//折线图谱
/*
{
    "xAxis": ["2010","2011","2012"],
    "legend": ["总体变化趋势",...],
    "series": [
        [17.77,19.95,18.6],...
    ]
}
*/
const Line = React.createClass({
    propTypes: {
    },
    getSeries:function(series){
        var seriesData = [];
        this.props.parms.legend.forEach(function(val,i){
            var baseData = {
                name:val,
                type:'line',
                label: {
                    normal: {
                        show: this.props.label==0?false:true,
                        position: 'top'
                    }
                },
                symbol:'circle',
                symbolSize:6,
                //smooth:true,
                //stack:'总量',
                /*areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0, color: color[i] // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }], false),
                        opacity:'0.4'
                    }
                },*/
                data:this.props.parms.series[i]
            };
            seriesData.push(baseData);
        }.bind(this));
        return seriesData;
    },
    getOption:function(parms){
        const option = {
            title:{
                text:this.props.title,
                textStyle:Config.title.textStyle,
                padding:Config.title.padding
            },
            color:this.props.color||['#00D5C3', '#9B89EF', '#1D86E2', '#BCB34E', '#22AD38',
                    '#1AA4E2', '#0B4AA9', '#8956A1', '#42D058', '#68D1FF',
                    '#5F93E7', '#ac77c7', '#b5f4bf', '#13d2e4', '#a4c7ff',
                    '#c490c0', '#facd89', '#0ebdce', '#cfe0fc', '#f29c9f'],
            tooltip:{
                trigger: 'axis',
                axisPointer:{
                    lineStyle:{
                        opacity:0
                    }
                }
            },
            legend:{
                show:this.props.legend,
                data:this.props.parms.legend,
                textStyle:Config.legend.textStyle
            },
            grid: {
                
            },
            dataZoom: [
                {
                    type: 'slider',
                    startValue:0,//this.props.parms.xAxis.length-this.props.start,
                    realtime: true,
                    bottom:0,
                    borderColor:'#213E60',
                    fillerColor:'rgba(255,255,255,0.1)',
                    backgroundColor:'#577B9D',
                    handleStyle:{
                        color:'#85A7CC'
                    },
                    textStyle:{
                        color:'#85A7CC'
                    },
                    dataBackground:{
                        areaStyle:{
                            color:'#2D4F74'
                        }
                    }
                }
            ],
            toolbox: {
                feature: {
                    //saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                nameTextStyle:{
                    color:Config.yAxis.nameTextStyle.color
                },
                boundaryGap: false,
                data: this.props.parms.xAxis,
                axisLine:Config.xAxis.axisLine,
                axisLabel:Config.xAxis.axisLabel,
                axisTick:Config.xAxis.axisTick,
                splitLine:Config.xAxis.splitLine
            },
            yAxis: {
                type: 'value',
                nameTextStyle:{
                    color:Config.yAxis.nameTextStyle.color
                },
                min:80,
                //offset:8,
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
                        className='chart-line' />
                </div>
            </div>
        );
    }
});

module.exports = Line;

