import React from 'react';
import BarGroup from '../../bbdcharts/BarGroup';
import DetBtn from '../../common/DetBtn';

class EgBarGroup extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgBarGroup';
        this.state = {
            barGroupData:{
                legend:['北京','上海','深圳','香港'],
                series:[
                    [65, 98, 25],
                    [40, 35, 25],
                    [100, 35, 25],
                    [40, 35, 25]
                ],
                xAxis:['2014','2015','2016'],
                max:100
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('BarGroup');
    }
    render() {
        let barGroupData = {
            style:{'width':'100%','height':'300px'},
            parms:this.state.barGroupData,
            barWidth:'36%'
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <BarGroup {...barGroupData}/>
        </div>;
    }
}

export default EgBarGroup;
