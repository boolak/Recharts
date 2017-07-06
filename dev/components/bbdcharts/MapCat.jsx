import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

//require("echarts/map/js/china.js");
let gy = require("./gy.js");


/*地图*/
const Map = React.createClass({
    propTypes: {
    },
    convertData: function (data) {
        /*let geoCoordMap = {
            '乌当区': [106.75,26.63],
            '白云区': [106.65,26.68],
            '开阳县': [106.97,27.07],
            '花溪区': [106.27,26.11],
            '清镇市': [106.47,26.55],
            '息烽县': [106.73,27.1],
            '修文县': [106.58,26.83],
            '南明区': [106.72,26.57],
            '云岩区': [106.72,26.62],
            '观山湖区': [106.33,26.33]
        };*/
        var geoCoordMap = this.props.geo;
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    },
    getOption: function() {
        const {title, itemColor, scatterColor, tooltipFormatter, visualMap, data} = this.props;
        const option = {
            title: {
                text: title,
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal',
                    fontSize: 14
                },
                padding: [18,15],
                //subtext: '纯属虚构',
                left: 'left'
            },
            tooltip: tooltipFormatter ? {
                trigger: 'item',
                padding: [6,10],
                backgroundColor: 'rgba(0,0,0,.5)',
                formatter: function(p) {
                    return tooltipFormatter(p);
                }
            } : null,
            legend: {
                orient: 'vertical',
                left: 'left',
                show: false,
                data:['']
            },
            visualMap:visualMap ? {
                min: 0,
                max: visualMap.max,
                textStyle: {
                    color: visualMap.textColor
                },
                //show:false,
                left: visualMap.left,
                top: visualMap.top,
                itemWidth: 10,
                itemHeight: 100,
                color: visualMap.color,
                text: visualMap.text,
                calculable: visualMap.calculable == undefined || !visualMap.calculable ? false : true
            }:null,
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
            geo:{
                map: '贵阳',
                zoom:1.2,
                aspectScale:1.01,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                itemStyle:{
                    normal:{
                        color: itemColor || '#437769',
                        borderColor:'#fff'
                    },
                    emphasis: {
                        color: '#2A303A'
                    }
                }
            },
            series: [
                {
                    name: '',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbolSize:(val)=>{
                        //console.log(val);
                        return Math.max(val[2] / 100, 4);
                    },
                    itemStyle:{
                        normal:{
                            color: scatterColor || '#FFAD75',
                            shadowBlur: 10,
                            shadowColor: '#fff'
                        }
                    },
                    data: this.convertData(data)
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
                        className='chart-bar' />
                </div>
            </div>
        );
    }
});

module.exports = Map;