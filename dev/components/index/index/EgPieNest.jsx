import React from 'react';
import PieNest from '../../bbdcharts/PieNest';

//嵌套环形
class EgPieNest extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgPieNest';
        this.state = {
            parmData:{
                legend:['自然人股东','法人股东','自然人股东','法人股东'],
                inner:[
                    {value:50000, name:'省外股东'},
                    {value:90000, name:'省内股东'}
                ],
                outer:[
                    {value:30000, name:'自然人股东'},
                    {value:20000, name:'法人股东'},
                    {value:50000, name:'自然人股东'},
                    {value:40000, name:'法人股东'}
                ]
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('PieNest');
    }
    render() {
        this.state.parmData.inner[0].selected = true;
        let propsData = {
            style:{'width':'100%','height':'300px'},
            parms:this.state.parmData,
            color:['#22C2FE','#06BBC6','#5CD29E','#FFF5A5'],
            selectedOffset:4,
            title:'贵阳市股东来源分布',
            //tooltip:'hide',//默认显示
            legend:'hide',//默认显示
            name:'股东来源分布',
            radius:[[0,'40%'],['50%','70%']]
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <PieNest {...propsData}/>
        </div>;
    }
}

export default EgPieNest;
