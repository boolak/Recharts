import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import 'echarts-liquidfill';
// import Config from './config.jsx';

const LiquidFill = React.createClass({
    propTypes: {
    },
    getOption: function() {
        const {opt, parms, tooltipFormatter} = this.props;
        const option = {
            grid: {
                top: 0,
                left: 0
            },
            tooltip: {
                formatter: tooltipFormatter ? (p)=>{
                    return tooltipFormatter(p);
                } : (p)=>{
                    let html = p.name ?  `${p.name}：${p.value}` : null;
                    return html;
                }
            },
            series: [{
                type: 'liquidFill',
                color: opt.color,
                radius: opt.radius || '50%',
                data: parms.data,
                outline: {
                    borderDistance: opt.borderDistance || 0,
                    itemStyle: {
                        borderWidth: opt.borderWidth || 6,
                        borderColor: opt.borderColor
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 18,
                            color: opt.labelColor
                        }
                    }
                }
            }]
        };
        return option;
    },
    getInstance: function(){
        return this.chart.getEchartsInstance();
    },
    render() {
        return (
            <div className="chart-gy">
                <div className="parent">
                    <ReactEcharts ref={(ref)=>{this.chart = ref;}}
                        option={this.getOption(this.props.option)} 
                        style={this.props.style}
                        className="chart-liquidfill" />
                </div>
            </div>
        );
    }
});

module.exports = LiquidFill;