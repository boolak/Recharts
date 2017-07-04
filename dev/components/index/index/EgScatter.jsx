import React from 'react';
import Scatter from '../../bbdcharts/Scatter';


class EgScatter extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgScatter';
        this.state = {
            parmData:{
                legend:['进口','出口'],
                date:[
                    '2014-1','2014-2','2014-3','2014-4','2014-5','2014-6','2014-7','2014-8','2014-9','2014-10','2014-11','2014-12',
                    '2015-1','2015-2'
                ],
                series:[
                    [
                        [3735.4,749.2], [3986.3,656.2], [3942.2,751.3], [3882.4,832.9], [3748.2,800.6], [3751.9,781], [3766.3,812.7],
                        [3814.7,827.4], [5160,1372.1], [4682.4,1148.2], [3812.2,910.1], [4390.5,1162.2], [4056.3,698.4], [4992.1,688.2]
                    ],
                    [
                        [2239.6,1237.5], [3241.8,882.6], [3316.5,1068.7], [2783.7,1177.3], [2734.1,1221.4], [2718.1,1178.2], [2715.3,1258.8], 
                        [2777.4,1288.3], [3921.2,1744.5], [3357.8,1521.1], [3420.6,1554.6], [4019.6,1861.6], [2489.5,1056.4], [3345.7,1054.7]
                    ]
                ]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('Scatter');
    }
    render() {
        let propsData = {
            style:{'width':'100%','height':'300px'},
            parms:this.state.parmData,
            color:['#1A8BEB','#61E2E7'],
            lineIndex:0,//markLine的索引
            name:{xAxis:'HHI指数',yAxis:'进/出口总额(亿元)'},
            symbolSize:40,
            grid:{
                left: '4%',
                right: '14%',
                bottom: '6%',
                top:'14%',
                containLabel: true
            }//不写使用默认
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Scatter {...propsData}/>
        </div>;
    }
}

export default EgScatter;
