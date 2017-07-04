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
            style:{'width':'100%','height':'300px'},
            parms:this.state.parmData,
            color:['#37649A','#37AA8D'],
            yMin:10,
            title:'标题',
            //legendShow:'hide'//不写即为默认显示
            dataZoom:{
                //show:'hide',//不写即为默认显示
                start: 3,// 显示最新（后）的3个，不写默认从开始显示
                bottom: 10
            },
            grid:{
                top:55,
                left:20,
                right:20,
                bottom:50
            }
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Line {...propsData}/>
        </div>;
    }
}

export default EgLine;
