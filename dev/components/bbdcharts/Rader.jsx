import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

/* 雷达图*/
/*
{
    legend:['实际开销','预算开销','选择行为'],
    radar:[
        {
            indicator: [
                { name: '销售',max:100},
                { name: '管理',max:100},
                { name: '信息技术',max:100},
                { name: '客服',max:100}
            ],
            center: ['25%','50%'],
            radius: '50%'  
        },
        {
            indicator: [
                {text: '外观', max: 100},
                {text: '拍照', max: 100},
                {text: '系统', max: 100},
                {text: '性能', max: 100},
                {text: '屏幕', max: 100}
            ],
            radius: '50%',
            center: ['75%','50%'],
        }
    ],
    series:[
        [
            {
                value:[70,80,90,100],
                name:'实际开销'
            },
            {
                value:[100,100,100,100],
                name:'预算开销'
            }
        ],
        [
            {
                value:[70,80,90,100,90],
                name:'选择行为'
            }
        ]
    ]
}
*/
const Rader = React.createClass({
    propTypes: {
    },
    getSeries: function(){
        const {parms, areaStyleColor, labelShow, labelFormatter} = this.props;
        var seriesData = [];
        parms.series.forEach((val, i)=>{
            var baseData = {
                type: 'radar',
                data: val,
                radarIndex: i,
                areaStyle: {
                    normal: {
                        color: areaStyleColor || '#5bd29e'
                    }
                },
                label: {
                    normal: {
                        show: labelShow == undefined ? false : true,
                        formatter: (p)=>{// '{c}(-0.2)'
                            let html = '';
                            if(labelFormatter){
                                html = labelFormatter(p);
                            }else{
                                html = `${p.value}`;
                            }
                            return html;
                        }
                    }
                }
            };
            seriesData.push(baseData);
        });
        return seriesData;
    },
    getRadar: function(center, radius, parms){
        var baseData = {
            center: center || ['50%', '50%'],
            radius: radius || '70%'
            /*'name':{
                formatter:(parms,indicator)=>{
                    
                }
            }*/
        };
        var radar = Object.assign(parms.radar[0], baseData);
        return radar;
    },
    getOption: function(){
        const {color, title, parms, center, radius, toolTipFormatter} = this.props;
        const option = {
            color: color,
            title: {
                text: title || '',
                textStyle: Config.title.textStyle,
                padding: Config.title.padding
            },
            tooltip: {
                formatter: toolTipFormatter ? (p)=>{
                    return toolTipFormatter(p);
                } : (p)=>{
                    let html = `${p.name}<br/>`;
                    parms.radar[0].indicator.forEach((v, k)=>{
                        html += `${v.name}：${p.value[k]}<br/>`;
                    });
                    return html;
                }
            },
            legend: {
                show: true,
                data: parms.legend,
                textStyle: Config.legend.textStyle
            },
            radar: this.getRadar(center, radius, parms),
            series: this.getSeries()
            
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

module.exports = Rader;