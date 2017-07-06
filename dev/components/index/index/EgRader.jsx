import React from 'react';
import Rader from '../../bbdcharts/Rader';


class EgRader extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgRader';
        this.state = {
            parmData:{
                "legend":["成都", "贵阳"],
                "radar":[
                    {
                        "indicator":[
                            {"name":"大数据","max":100},
                            {"name":"大健康","max":100},
                            {"name":"大旅游","max":100},
                            {"name":"大产业","max":100}
                        ]
                    }
                ],
                "series":[
                    [
                        {
                            "name":"成都",
                            "value":[85.8,65.8,77.8,80.8]
                            
                        },{
                            "name":"贵阳",
                            "value":[56.8,54.8,70.8,43.8]
                        }
                    ]
                ]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('Rader');
    }
    render() {
        let propsData = {
            style:{'width':'100%','height':'300px'},
            parms:this.state.parmData,
            //title:'',//默认空
            radius:'60%',//默认'70%'
            labelShow: true,//默认不显示
            labelFormatter:(p)=>{// 缺省使用默认
                return `${p.value}万`;
            },
            toolTipFormatter:(p)=>{// 缺省使用默认
                let html = `${p.name}<br/>`;
                this.state.parmData.radar[0].indicator.forEach((v, k)=>{
                    html += `${v.name}：${p.value[k]}，占比：--%<br/>`;
                });
                return html;
            },
            //center:[],//默认居中
            areaStyleColor:'#b9b',
            color:['#c2f','#da3']
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Rader {...propsData}/>
        </div>;
    }
}

export default EgRader;
