import React from 'react';
import Rader from '../../bbdcharts/Rader';


class EgRader extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgRader';
        this.state = {
            parmData:{
                "legend":["重点产业","test"],
                "radar":[
                    {
                        "indicator":[
                            {"name":"大数据","max":100},
                            {"name":"大健康","max":100},
                            {"name":"大旅游","max":100},
                            {"name":"大数据","max":100}
                        ]
                    }
                ],
                "series":[
                    [
                        {
                            "value":[85.8,87.8,89.8,82.8],
                            "name":"重点"
                        },{
                            "value":[56.8,54.8,70.8,43.8],
                            "name":"test"
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
            //radius:[],//默认'70%'
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
