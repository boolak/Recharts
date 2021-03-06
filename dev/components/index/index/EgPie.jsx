import React from 'react';
import Pie from '../../bbdcharts/Pie';


class EgPie extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgPie';
        this.state = {
            parmData:{
                legend:['第一产业','第二产业','第三产业'],
                series:[
                    {
                        name:'第一产业',
                        value:18
                    },
                    {
                        name:'第二产业',
                        value:22
                    },
                    {
                        name:'第三产业',
                        value:32
                    }
                ]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('Pie');
    }
    render() {
        let propsData = {
            style:{width:'100%',height:'300px'},
            parms:this.state.parmData,
            color:['#dfa','#fa3','#aec'],
            radius:[40,80],//不写默认为[30,60]
            roseType:true,//代表玫瑰图，默认环状
            legend:false,//是否显示分类
            labelFormatter:(p)=>{// label自定义格式化，缺省为默认'{b} : {c}'
                return `${p.name}：${p.value}（万元）`;
            },
            tooltipFormatter:(p)=>{// tooltip自定义格式化，缺省为占比显示
                var style = `color:${p.color};font-size:16px;font-weight:bold`;
                var html = `<div>${p.name}占比：<span style="${style}">${p.percent}%</span></div>`;
                return html;
            },
            //title:'标题',//不写默认为空
            //center:['50%','55%'],// 不写默认居中
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Pie ref={(ref)=>{this.chart = ref}} {...propsData}/>
        </div>;
    }
}

export default EgPie;
