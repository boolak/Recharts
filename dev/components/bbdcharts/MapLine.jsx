import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

let china = require('./china.js');

/* 地图迁徙（待...）*/
function formtGCData(geoData, data, srcNam, opt) {
    var tGeoDt = [];
    if (opt.isOut) {
        for (var i = 0, len = data.length; i < len; i++) {
            if (srcNam != data[i].name) {
                tGeoDt.push({
                    coords: [geoData[srcNam], geoData[data[i].name]],
                    lineStyle: {
                        normal: {
                            color: opt.lineColor
                            // color:data[i].value>100?'#FEA6A1':(data[i].value>50&&data[i].value<100)?'#A677ED':(data[i].value>10&&data[i].value<50)?'#54E14D':'#EFE964'
                            // data[i].value>10?'#53E04C':'#EFEA62'
                        }
                    }
                });
            }
        }
    } else {
        for (var i = 0, len = data.length; i < len; i++) {
            if (srcNam != data[i].name) {
                tGeoDt.push({
                    coords: [geoData[data[i].name], geoData[srcNam]],
                    lineStyle: {
                        normal: {
                            color: opt.lineColor
                            // color:data[i].value>100?'#FEA6A1':(data[i].value>50&&data[i].value<100)?'#A677ED':(data[i].value>10&&data[i].value<50)?'#54E14D':'#EFE964'
                        }
                    }
                });
            }
        }
    }
    data = null;
    geoData = null;
    return tGeoDt;
}

function formtVData(geoData, data, _this) {
    var tGeoDt = [];
    for (var i = 0, len = data.length; i < len; i++) {
        var tNam = data[i].name;
        if (_this.props.source != tNam) {
            tGeoDt.push({
                name: tNam,
                value: geoData[tNam],
                symbolSize: data[i].value < 100 ? 8:data[i].value / 20,
                // symbol:data[i].value>10?'image://images/06.png':'image://images/i3.png',
                label: {
                    normal: {
                        show: true,
                        formatter: (parms)=>{
                            // console.log(parms);
                            return parms.name;
                        },
                        position: 'top',
                        textStyle: {
                            color: _this.props.lableColor || '#fff',
                            fontSize: 12
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        // color:data[i].value>100?'#FEA6A1':(data[i].value>50&&data[i].value<100)?'#A677ED':(data[i].value>10&&data[i].value<50)?'#54E14D':'#EFE964'
                        color: _this.props.lineColor
                    }
                }
            });
        }
    }
    tGeoDt.push({
        name: _this.props.source,
        value: geoData[_this.props.source],
        symbolSize: 6,
        itemStyle: {
            normal: {
                color: '#59D49E', // 源
                borderColor: '#fff'
            }
        }
    });
    return tGeoDt;
}

var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
// var planePath = 'arrow';
const MapLine = React.createClass({
    propTypes: {
    },
    getOption: function() {
        const {title, zoom, parms, mapColor, lineColor, source} = this.props;
        const option = {
            title: {
                text: title || '',
                textStyle: Config.title.textStyle,
                padding: Config.title.padding
            },
            tooltip: {
                trigger: 'item',
                formatter: (parm)=>{
                    // console.log(parm);
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: true
                    }
                },
                roam: false,
                zoom: zoom || 1,
                silent: true,
                itemStyle: {
                    normal: {
                        areaColor: mapColor || '#2B323C',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: '#de3'
                    }
                }
                /*regions:[{
                    name: 'China',
                    itemStyle: {
                        normal: {
                            areaColor: '#4CAAF8',
                            borderColor: '#7BE7F8',
                            borderWidth:2
                        }
                    }
                }]*/
            },
            series: [
                {
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 8,
                        trailLength: 0.1,
                        color: lineColor || '#db9982',
                        symbol: planePath,
                        symbolSize: 10
                    },
                    lineStyle: {
                        normal: {
                            color: '#a6c84c',
                            width: 1,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    },
                    data: formtGCData(parms.geo, parms.data, source, this.props)
                },
                /* {
                    //in
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.1,
                        color: '#edd',
                        symbol: planePath,
                        symbolSize: 8
                    },
                    lineStyle: {
                        normal: {
                            color: '#a6c84c',
                            width: 2,
                            opacity: 0.4,
                            curveness: 0.2
                        }
                    },
                    data: formtGCData(parms.geo, parms.data, '深圳', false)
                }, */
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        period: 4,
                        scale: 2.5,
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: 'yellow',
                            borderColor: '#fff'
                        }
                    },
                    data: formtVData(parms.geo, parms.data, this)
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
                        className="chart-bar" />
                </div>
            </div>
        );
    }
});

module.exports = MapLine;