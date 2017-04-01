import React from 'react';
import ReactEcharts from './src/echarts-for-react';


//折柱饼混合图
const LineBarPie = React.createClass({
	propTypes: {
	},
	getSeries:function(){
		var series = [];
		this.props.parms.legend.forEach(function(val,i){
			var base = {
				name:this.props.parms.legend[i],
                type:this.props.parms.type[i%2],
                data:this.props.parms.series[i],
                itemStyle:{
                	normal:{
                		color:this.props.parms.color[Math.floor(i/2)]
                	}
                }
			}
			if(this.props.parms.type[i]=='line'){
				base.yAxisIndex = 1;
			}
			series.push(base);
		}.bind(this));

		if(this.props.parms.complate){
			this.props.parms.complate.forEach(function(val,i){
				var base = {
		            type: 'pie',
		            radius : 40,
		            center: [40+80*i,80],
		            animation:false,
		            label:{
		              normal:{
		                  position:'inside',
		                  formatter: "{b}:\n{d}%"
		              }  
		            },
		            data:[
		                {
		                    value:val.value,
		                    name:val.name,
		                    label:{
		                        normal:{
		                            position:'center',
		                            textStyle:{
		                                color:'#222'
		                            }
		                        }
		                    },
		                    itemStyle:{
		                        normal:{
		                            color:'#ea3'
		                        }
		                    }
		                },
		                {
		                    value:100-val.value,
		                    name:'',
		                    label:{
		                        normal:{
		                            textStyle:{
		                                color:'transparent'
		                            }
		                        }
		                    },
		                    itemStyle:{
		                        normal:{
		                            color:'transparent'
		                        }
		                    }
		                }
		            ]
		        }
		        series.push(base);
			}.bind(this))
		}

		return series;
	},
	getyAxis:function(){
		var yAxis = [];
		this.props.parms.yAxis.forEach(function(val,i){
			var base = {
				type: 'value',
				name: val,
				/*min: 0,
				max: 250,
				interval: 50,
				axisLabel: {
				    formatter: '{value} ml'
				}*/
			}
			yAxis.push(base);
		}.bind(this));
		return yAxis;
	},
	getOption:function(){
		const option = {
			//color:this.props.parms.color,
			tooltip: {
		        trigger: 'axis'
		    },
			legend:{
				data:this.props.parms.legend
			},
			xAxis: [
				{
					type: 'category',
					data: this.props.parms.xAxis
				}
		    ],
		    yAxis: this.getyAxis(),
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
                        className='chart-linebar' />
                </div>
            </div>
        );
    }
});

module.exports = LineBarPie;