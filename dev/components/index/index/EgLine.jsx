import React from 'react';
import Line from '../../bbdcharts/Line'
//import DetBtn from '../../common/DetBtn';

class EgLine extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgLine';
        this.state = {
            parmData:{
                legend: ["收入","支出"],
                xAxis: ["2010","2011","2012","2013","2014"],
                series: [
                    [17,19,33,39,43],[23,34,54,60,65]
                ]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('line');
    }
    render() {
        let propsData = {
            style:{width:'100%',height:'300px'},
            parms:this.state.parmData,
            color:['#37649A','#37AA8D'],
            yMin:10,
            title:'标题',
            //legendShow:false,//默认显示
            dataZoom:{
                //show:false,//默认显示
                start: 4,// 显示最新（后）的3个，不写默认从开始显示
                bottom: 10
            },
            //smooth:true,// 默认不是平滑
            //labelShow: false,//默认显示
            labelFormatter:(p)=>{// 缺省使用默认
                return `${p.value}￥`;
            },
            tooltipFormatter:(p)=>{// 缺省使用默认
                let html = `${p[0].name}<br/>`;
                p.forEach((v, k)=>{
                    html += `<span style="display:inline-block;border-radius:100%;width:10px;height:10px;background:${v.color}"></span> ${v.seriesName}：${v.value}（万元）<br/>`;
                });
                return html;
            },
            grid:{
                top:55,
                left:20,
                right:20,
                bottom:50
            },
            /*axisLabel:{// 可以不写，此属性可以配合grid.bottom调节显示坐标刻度名称横放显示不完
              interval:0,
              rotate:42
            }*/
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Line {...propsData}/>
        </div>;
    }
}

export default EgLine;
