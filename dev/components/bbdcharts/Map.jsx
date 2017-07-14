import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

// require("echarts/map/js/china.js");
var gy = require('./gy.js');

/* 地图*/
const Map = React.createClass({
    propTypes: {
    },
    randomData: function() {
        return Math.round(Math.random() * 10);
    },
    getOption: function(opt) {
        const option = {
            title: {
                text: opt.titleText || ' ',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal',
                    fontSize: 14
                },
                padding: [18, 15],
                // subtext: '纯属虚构',
                left: 'left'
            },
            tooltip: {
                trigger: 'item',
                // padding: 15,
                // backgroundColor: '#2a313b',
                formatter: opt.tooltipFormatter ? (p)=>{
                    return opt.tooltipFormatter(p);
                } : (p)=>{
                    return `${p.name}：${p.value}`;
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                show: false,
                data: ['iphone4']
            },
            visualMap: {
                min: opt.min || 0,
                max: opt.max || 100,
                textStyle: {
                    color: '#cccaca'
                },
                left: opt.left,
                bottom: opt.bottom,
                itemWidth: opt.itemWidth || 10,
                itemHeight: opt.itemHeight || 100,
                color: opt.color || ['#0a804c', '#9cdabf'],
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: opt.calculable || false
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: 'iphone4',
                    type: 'map',
                    mapType: '贵阳',
                    zoom: opt.zoom || 1,
                    left: 'center',
                    aspectScale: opt.aspectScale || 0.75,
                    showLegendSymbol: false,
                    label: {
                        normal: {
                            show: opt.labelShow === false ? false : true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            areaColor: opt.itemEmphasisColor || '#9cdabf'
                        }
                    },
                    data: this.props.parms
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
                        option={this.getOption(this.props.option)} 
                        style={this.props.style}
                        onEvents={this.props.onEvents}
                        className="chart-bar" />
                </div>
            </div>
        );
    }
});

module.exports = Map;