import React from 'react';
import Bar from '../../bbdcharts/Bar';

/*柱状*/
class EgBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgBar';
        this.state = {
            parmData:{
                legend:['leve1','leve2'],
                xAxis:['A','B','C','D'],
                series:[[-12,-22,-11,-33],[-21,-12,12,21]]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('bar');
    }
    render() {
        let propsData = {
            style:{'width':'100%','height':'300px'},
            parms:this.state.parmData,
            title:'',
            dataZoom:{
                'show':'hide',//不显示
                'borderColor':'#5ACE9B',
                'handleColor':'#5ACE9B',
                'backgroundColor':'#3C444E',
                'fillerColor':'rgba(83,181,141,.2)'//选取区域
            },
            barWidth:18,
            vertical:false,//排列方式，不写默认为true，代表纵向排列
            color:['#37649a','#3764cc']
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Bar {...propsData}/>
        </div>;
    }
}

export default EgBar;
