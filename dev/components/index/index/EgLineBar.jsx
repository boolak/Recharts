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
                   "A增加值","A同比增长率(%)","B增加值","B同比增长率(%)"
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
            style:{'width':'100%','height':'300px'},
            parms:this.state.parmData,
            //title:'TITLE',//可以不写
            barWidth:12,
            grid:{top:80,bottom:30},
            color:['#37649A','#37649A','#37AA8D','#37AA8D'],
            type:['bar','line','bar','line']//代表柱状，线条;先后顺序与series相对应
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <LineBar {...propsData}/>
        </div>;
    }
}

export default EgLineBar;
