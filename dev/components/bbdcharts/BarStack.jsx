import React from 'react';
import ReactEcharts from './src/echarts-for-react';

//柱状堆叠
const BarStack = React.createClass({
    propTypes: {
    },
    getSeries:function(){
    	var series = [];
    	this.props.parms.legend.forEach(function(val,i){
    		var base = {
    			name: val,
    			type: 'bar',
    			stack: '总量',
    			label: {
    			    normal: {
    			        show: true,
    			        position: 'right'
    			    }
    			},
    			data: this.props.parms.series[i]
    		}
    		series.push(base);
    	}.bind(this));
    	return series;
    },
    getOption:function(){
    	const option = {
    		tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    color:this.props.parms.color,
		    legend: {
		        data: this.props.parms.legend
		    },
		    grid: {
		        /*right: '4%',
		        left: '3%',
		        bottom: '3%',
		        containLabel: true*/
		    },
		    xAxis: {
		        type: !this.props.parms.yCategory?'category':'value',
		    	name: '贵阳-贵州GDP占比',
		    	data: !this.props.parms.yCategory?this.props.parms.yAxis:[]
		    },
		    yAxis: {
		        name: '季度',
		        type: this.props.parms.yCategory?'category':'value',
		        data: this.props.parms.yCategory?this.props.parms.yAxis:[]
		    },
		    series: this.getSeries()
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
                        className='chart-barstack' />
                </div>
            </div>
        );
    }
});

module.exports = BarStack;