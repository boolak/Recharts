import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import 'echarts-liquidfill';
// import Config from './config.jsx';

const LiquidFill = React.createClass({
    propTypes: {
    },
    getOption: function() {
        const {color, radius, parms, tooltipFormatter} = this.props;
        const option = {
            grid: {
                top: 0,
                left: 0
            },
            tooltip: {
                formatter: tooltipFormatter ? (p)=>{
                    return tooltipFormatter(p);
                } : null
            },
            series: [{
                type: 'liquidFill',
                color: color,
                radius: radius,
                data: parms.data,
                outline: {
                    borderDistance: 0,
                    itemStyle: {
                        borderWidth: 4,
                        borderColor: '#a0a7ff'
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 18,
                            color: '#a0a7ff'
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