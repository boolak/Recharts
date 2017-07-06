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
        const {parms, labelShow, smooth, labelFormatter} = this.props;
        var seriesData = [];
        parms.legend.forEach(function(val,i){
            var baseData = {
                name:val,
                type:'line',
                label: {
                    normal: {
                        show: labelShow == undefined ? true : false,
                        position: 'top',
                        formatter:(p)=>{
                            if(labelFormatter){
                                let html = labelFormatter(p);
                                return html;
                            }else{
                                return `${p.value}`;
                            }
                        }
                    }
                },
                symbol:'circle',
                symbolSize:6,
                smooth: smooth == undefined ? false : true,
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
                data:parms.series[i]
            };
            seriesData.push(baseData);
        }.bind(this));
        return seriesData;
    },
    getOption:function(){
        const {title, color, legendShow, parms, dataZoom, yMin, grid, axisLabel, tooltipFormatter} = this.props;
        const option = {
            title:{
                text: title || '',
                textStyle:Config.title.textStyle,
                padding:Config.title.padding
            },
            color: color||['#00D5C3', '#9B89EF', '#1D86E2', '#BCB34E', '#22AD38',
                    '#1AA4E2', '#0B4AA9', '#8956A1', '#42D058', '#68D1FF',
                    '#5F93E7', '#ac77c7', '#b5f4bf', '#13d2e4', '#a4c7ff',
                    '#c490c0', '#facd89', '#0ebdce', '#cfe0fc', '#f29c9f'],
            tooltip:{
                trigger: 'axis',
                axisPointer:{
                    lineStyle:{
                        opacity:0
                    }
                },
                formatter:(p)=>{
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
            legend:{
                show: legendShow==undefined?true:false,
                data: parms.legend,
                textStyle:Config.legend.textStyle
            },
            grid: grid ? Object.assign({}, grid, {containLabel: true}) : {
                top:40,
                left:20,
                right:20,
                bottom:50,
                containLabel: true
            },
            dataZoom: [
                {
                    show:dataZoom.show==undefined?true:false,
                    type: 'slider',
                    startValue: dataZoom.start ? parms.xAxis.length-dataZoom.start : null, 
                    realtime: true,
                    bottom:dataZoom.bottom||0,
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
                data:parms.xAxis,
                axisLine:Config.xAxis.axisLine,
                axisLabel:Object.assign({}, Config.xAxis.axisLabel, axisLabel),
                axisTick:Config.xAxis.axisTick,
                splitLine:Config.xAxis.splitLine
            },
            yAxis: {
                type: 'value',
                nameTextStyle:{
                    color:Config.yAxis.nameTextStyle.color
                },
                min:yMin || 0,
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

