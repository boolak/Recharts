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
                xAxis:['分类A','分类B','分类C','分类D'],
                series:[[12,22,11,33],[21,12,12,21]]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('bar');
    }
    render() {
        let propsData = {
            style:{width:'100%',height:'300px'},
            parms:this.state.parmData,// 图表渲染所需数据
            title:'标题',
            //legendShow:false,//默认显示
            dataZoom:{
                //show:true,// 默认不显示
                //start: 2,// 显示最新（后）的2个(横轴为值范围)，不写默认从开始显示
                borderColor:'#5ACE9B',
                handleColor:'#5ACE9B',
                backgroundColor:'#3C444E',
                fillerColor:'rgba(83,181,141,.2)'// 选取区域
            },
            barWidth:18,
            //labelShow:false,//默认显示
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
            vertical:false,// 排列方式，默认纵向排列
            color:['#11649a','#3764cc'],
            grid:{//
                left: '1%',
                right: '2%',
                bottom: '6%',
                top:'12%'
            },
            axisLabel:{// 可以不写，此属性可以配合grid.bottom调节显示坐标刻度名称横放显示不完
              interval:0,
              rotate:32
            }
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Bar {...propsData}/>
        </div>;
    }
}

export default EgBar;
