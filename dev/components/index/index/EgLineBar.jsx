import React from 'react';
import LineBar from '../../bbdcharts/LineBar';

//折线柱状
class EgLineBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgLineBar';
        this.state = {
            parmData:{
                xAxis: [
                   "2016-05", "2016-06", "2016-07", "2016-08", "2016-09", "2016-10", "2016-11", "2016-12"
                ],
                yAxis: [
                   "增加值(亿元)","同比增长率(%)"
                ],
                legend: [
                   "A增加值","A同比增长率","B增加值","B同比增长率"
                ],
                series: [
                   [
                       313.89, 384.95, 447.2, 511.34, 578.3, 638.03, 715.14, 780.82
                   ],
                   [
                       9.7, 9.6, 9.8, 10, 9.9, 9.9, 9.9, 9.9
                   ],
                   [
                       213.89, 284.95, 347.2, 411.34, 478.3, 538.03, 615.14, 680.82
                   ],
                   [
                       8.7, 8.6, 8.8, 9, 8.9, 8.9, 8.9, 8.9
                   ]
               ]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('linebar');
    }
    render() {
        let propsData = {
            style:{width:'100%',height:'300px'},
            parms:this.state.parmData,
            //title:'标题',//默认不写
            barWidth:12,
            grid:{top:80,bottom:40, left:20, right:20},//不写使用默认
            axisLabel:{// 默认不写，此属性可以配合grid.bottom调节显示坐标刻度名称横放显示不完
              interval:0,
              rotate:42
            },
            //labelBarShow: true,// 是否显示柱状label,默认不显示
            labelLineShow: true,// 是否显示线条label,默认不显示
            labelFormatter:(p)=>{// 缺省使用默认
                return `${p.value}%`;
            },
            tooltipFormatter:(p)=>{// 缺省使用默认
              var html = `${p[0].name}<br/>`;
              p.forEach(function(val,i){
                  var dw = i%2==1?'%':'';
                  var style = 'width:10px;height:10px;display:inline-block;margin-right:4px;background:'+val.color;
                  html +='<span style="'+style+'"></span>'+val.seriesName+'：'+val.value+dw+'<br/>';
              });
              return html;
            },
            color:['#37649A','#37649A','#37AA8D','#37AA8D'],
            type:['bar','line','bar','line']//代表柱状，线条;先后顺序与series、color相对应
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <LineBar {...propsData}/>
        </div>;
    }
}

export default EgLineBar;
