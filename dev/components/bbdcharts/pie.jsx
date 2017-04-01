import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

//饼状图谱
const Pie = React.createClass({
    propTypes: {
    },
    getOption:function(){
        const option = {
            title: {
                text:this.props.title,
                textStyle:Config.title.textStyle,
                padding:Config.title.padding
                /*subtext:'1000',
                x:'center',
                y:'45%',
                subtextStyle: {
                   color: '#1a1a1a',
                   fontSize: 18
                }*/
            },
            color: this.props.color||['#C0B54C','#8956A1','#B4D465','#C490C0','#01479D','#1D89E4','#F9B552','#9B89EF','#00D5C3'],
            tooltip : {
                trigger: 'item',
                //formatter: "{b} : {c}%"
                formatter:(parms)=>{
                    //console.log(parms);
                    var style = 'color:'+parms.color+';font-size:16px;font-weight:bold';
                    var html = '<div>'+parms.name+'：<span style="'+style+'">'+parms.value+'%</span></div>';
                    return html;
                }
            },
            legend:{
                show:false,
                orient: 'horizontal',
                left: 'center',
                top:'10%',
                textStyle:Config.legend.textStyle,
                data:this.props.parms.legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            series : [
                {
                    name: this.props.title,
                    type: 'pie',
                    roseType: this.props.roseType,
                    radius : this.props.radius||['26','66'],
                    center: this.props.center||['50%', '50%'],
                    data:this.props.parms.series,
                    label:{
                        normal:{
                            textStyle:{
                                color:'#ccc'
                            },
                            formatter:'{b} : {c}%'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
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
                        className='chart-pie' />
                </div>
            </div>
        );
    }
});

module.exports = Pie;