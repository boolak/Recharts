import React from 'react';
import ReactEcharts from './src/echarts-for-react';
import Config from './config.jsx';

// 嵌套环形
class PieNest extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'PieNest';
    }
    getOption(){
        const option = {
            title: {
                text: this.props.title || '',
                textStyle: Config.title.textStyle,
                padding: Config.title.padding
            },
            color: this.props.color,
            tooltip: {
                show: this.props.tooltip ? false:true,
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                // orient: 'vertical',
                show: this.props.legend ? false:true,
                x: 'center',
                data: this.props.parms.legend,
                textStyle: Config.legend.textStyle
            },
            series: [
                {
                    name: this.props.name || '',
                    type: 'pie',
                    selectedOffset: this.props.selectedOffset || 10,
                    selectedMode: 'single',
                    radius: this.props.radius[0] || [0, '30%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.props.parms.inner
                },
                {
                    name: this.props.name || '',
                    type: 'pie',
                    radius: this.props.radius[1] || ['40%', '55%'],
                    data: this.props.parms.outer
                }
            ]
        };
        return option;
    }
    getInstance(){
        return this.refs.chart.getEchartsInstance();
    }
    render() {
        return (
            <div className="chart-gy">
                <div className="parent">
                    <ReactEcharts ref="chart"
                        option={this.getOption()} 
                        style={this.props.style} 
                        className="chart-line" />
                </div>
            </div>
        );
    }
}

export default PieNest;
