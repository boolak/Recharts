import React from 'react';
import Line from '../../bbdcharts/Line'
//import DetBtn from '../../common/DetBtn';

class EgLine extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgLine';
        this.state = {
            lineData:{
                "xAxis": ["2010","2011","2012","2013","2014"],
                "legend": ["收入","支出"],
                "series": [
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
        let lineData = {
            style:{'width':'100%','height':'300px'},
            parms:this.state.lineData,
            color:['#37649A','#37AA8D'],
            min:10,
            //legend:'hide',//不写即为默认显示
            //dataZoom:'hide'//不写即为默认显示
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <Line {...lineData}/>
        </div>;
    }
}

export default EgLine;
