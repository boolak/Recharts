import React from 'react';
import LiquidFill from '../../bbdcharts/LiquidFill'
//import DetBtn from '../../common/DetBtn';

class EgLiquidFill extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgLiquidFill';
        this.state = {
            parmData:{
                data: [{// 可以为[0.65, 0.45],这样不会有tooltip
                    name:'first',
                    value:0.65
                },{
                    name:'second',
                    value:0.45
                }]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('liquidFill');
    }
    render() {
        let liquidData = {
            style: {width:'100%',height:'300px'},
            parms: this.state.parmData,
            opt:{
                color: ['#9198e5', '#777cb8'],
                radius: '66%',// 缺省为'50%'
                //borderDistance: 4,// 缺省为0
                borderColor: '#a0a7ff',
                //borderWidth: 4,// 缺省为6
                labelColor: '#a0a7ff'
            },
            tooltipFormatter: (p)=>{//缺省使用默认
                return `企业：<span style='color:#9198e5; font-weight:bold;'>2133 户</span><br/>数据项：<span style='color:#9198e5; font-weight:bold;'>343543 项</span>`;
            }
        };
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
             <LiquidFill {...liquidData}/>
        </div>;
    }
}

export default EgLiquidFill;
