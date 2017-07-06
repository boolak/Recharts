import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

//分组的柱状
/* 目前暂时未4个为一组，若有需要再扩展 */
const dataHere = {
    bbd:[65, 98, 25,20,36, 28 ],
    tour:[40, 35, 25,20,36, 28 ],
    biologicalMedicine:[100, 35, 25,20,36, 28 ],
    financeAndConsulting:[40, 35, 25,20,36, 28 ],
};

const BarGroup = React.createClass({
    getSeries:function(){
        const {barWidth, parms} = this.props;
        var seriesData = [
            {
                type:'bar',
                barWidth: barWidth||30,
                xAxisIndex: 0,
                yAxisIndex: 0,
                data:[0]
            }
        ];
        parms.legend.forEach(function(val,i){
            var base = {
                name:val,
                type:'bar',
                barWidth: barWidth||30,
                xAxisIndex: i+1,
                yAxisIndex: i+1,
                label:{
                    normal:{
                        show:true,
                        position: 'top'
                    }
                },
                data:parms.series[i]
            }
            seriesData.push(base);
        }.bind(this));
        return seriesData;
    },
    getOption:function(){
        const {parms} = this.props;
        const option = {
            color: ["#000",'#00D5C3','#998AEC',"#1D86E2","#BEB54C"],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle:{
                        color:'transparent'
                    }
                }
            },
            legend:{
                data:parms.legend,
                y:'top',
                textStyle:Config.legend.textStyle
            },
            grid: [
                {
                    left: '5%',
                    right: '5%',
                    bottom: '7%',
                    width:0,
                    height:"80%",
                    //containLabel: true
                },
                {width: '22%',height: '80%',x: '5%',bottom: '7%'},
                {width: '22%',height: '80%',x: '29%',bottom: '7%'},
                {width: '22%',height: '80%',x: '53%',bottom: '7%'},
                {width: '22%',height: '80%',x: '77%',bottom: '7%'}
            ],
            xAxis : [
                {type : 'category',data : parms.xAxis,gridIndex:0,axisLine:{show:false},axisTick:{show:false},axisLabel:{show:false} },
                {type : 'category',data : parms.xAxis,gridIndex:1,axisTick:{show:false},axisLine:Config.xAxis.axisLine,axisLabel:{interval:0,textStyle:{color:'#8FB1D6'}}},
                {type : 'category',data : parms.xAxis,gridIndex:2,axisTick:{show:false},axisLine:Config.xAxis.axisLine,axisLabel:{interval:0,textStyle:{color:'#8FB1D6'}}},
                {type : 'category',data : parms.xAxis,gridIndex:3,axisTick:{show:false},axisLine:Config.xAxis.axisLine,axisLabel:{interval:0,textStyle:{color:'#8FB1D6'}}},
                {type : 'category',data : parms.xAxis,gridIndex:4,axisTick:{show:false},axisLine:Config.xAxis.axisLine,axisLabel:{interval:0,textStyle:{color:'#8FB1D6'}}},
                
            ],
            yAxis : [
                {
                    name:"%",
                    type : 'value',
                    gridIndex:0,
                    splitLine:{show:false},
                    max:parms.max,
                    axisLabel:Config.xAxis.axisLabel,
                    axisLine:Config.yAxis.axisLine,
                    nameTextStyle:{ color:'#86a8ce' }
                },
                { type : 'value',gridIndex:1,splitLine:{show:false},axisLine:{show:false},axisTick:{show:false},axisLabel:{show:false},max:parms.max},
                { type : 'value',gridIndex:2,splitLine:{show:false},axisLine:{show:false},axisTick:{show:false},axisLabel:{show:false},max:parms.max},
                { type : 'value',gridIndex:3,splitLine:{show:false},axisLine:{show:false},axisTick:{show:false},axisLabel:{show:false},max:parms.max},
                { type : 'value',gridIndex:4,splitLine:{show:false},axisLine:{show:false},axisTick:{show:false},axisLabel:{show:false},max:parms.max},
                
            ],
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
                        className='chart-bargroup' />
                </div>
            </div>
        );
    }
});

module.exports = BarGroup;