import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

// 饼状图谱
const Pie = React.createClass({
    propTypes: {
    },
    getOption: function(){
        const {title, color, legend, parms, roseType, radius, center, labelFormatter, tooltipFormatter} = this.props;
        const option = {
            title: {
                text: title || '',
                textStyle: Config.title.textStyle,
                padding: Config.title.padding
                /* subtext:'1000',
                x:'center',
                y:'45%',
                subtextStyle: {
                   color: '#1a1a1a',
                   fontSize: 18
                }*/
            },
            color: color || ['#C0B54C', '#8956A1', '#B4D465', '#C490C0', '#01479D', '#1D89E4', '#F9B552', '#9B89EF', '#00D5C3'],
            tooltip: {
                trigger: 'item',
                // formatter: "{b} : {c}%"
                formatter: (p)=>{
                    let html = '';
                    if(tooltipFormatter){
                        html = tooltipFormatter(p);
                    }else{
                        var style = 'color:' + p.color + ';font-size:16px;font-weight:bold';
                        html = '<div>' + p.name + '：<span style="' + style + '">' + p.percent + '%</span></div>';
                    }
                    return html;
                }
            },
            legend: {
                show: legend,
                orient: 'horizontal',
                left: 'center',
                top: '10%',
                textStyle: Config.legend.textStyle,
                data: parms.legend
            },
            grid: {
                // 
            },
            series: [
                {
                    name: title || '',
                    type: 'pie',
                    roseType: roseType,
                    radius: radius || ['30', '60'],
                    center: center || ['50%', '50%'],
                    data: parms.series,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#ccc'
                            },
                            formatter: labelFormatter ? (p)=>{
                                let html = '';
                                html = labelFormatter(p);
                                return html;
                            } : '{b} : {c}'
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
                        className="chart-pie" />
                </div>
            </div>
        );
    }
});

module.exports = Pie;