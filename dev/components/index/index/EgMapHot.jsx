import React from 'react';
import Map from '../../bbdcharts/Map';

//热力分布地图
class EgMapHot extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgMapHot';
        this.state = {
            parmData:[
                {name: '云岩区',value: '54.3' },
                {name: '南明区',value: '65.5' },
                {name: '花溪区',value: '87.9' },
                {name: '乌当区',value: '74.5' },
                {name: '白云区',value: '89.5' },
                {name: '观山湖区',value: '80.7' },
                {name: '开阳县',value: '79.8' },
                {name: '息烽县',value: '51.4' },
                {name: '修文县',value: '61.5' },
                {name: '清镇市',value: '76.8' }
            ]
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('MapHot');
    }
    render() {
        let propsData = {
            style:{'width':'100%','height':'300px'},
            parms:this.state.parmData,
            option:{
                titleText:'热力分布地图',
                titleShow:true,
                zoom:1.2,
                /*min:'',
                max:'',
                itemWidth:'',
                itemHeight:'',
                color:[],//是否显示拖拽用的手柄
                left:'',*/
                aspectScale:1,//长宽比
                labelShow:true,
                itemEmphasisColor:'#fab'//高亮颜色
            }
        };
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Map {...propsData}/>
        </div>;
    }
}

export default EgMapHot;
