import React from 'react';
import BarStack from '../../bbdcharts/BarStack';

//堆叠柱状
class EgBarStack extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgBarStack';
        this.state = {
            parmData:{
                legend:['A','B','C','D'],
                series:[
                        {
                            name:'D',
                            data:[594,560,538],
                            stack:'活跃'
                        },
                        {
                            name:'C',
                            data:[690,669,653],
                            stack:'活跃'
                        },
                        {
                            name:'B',
                            data:[162,162,157],
                            stack:'活跃'
                        },
                        {
                            name:'A',
                            data:[218,206,210],
                            stack:'活跃'
                        },

                        {
                            name:'D',
                            data:[2170,2319,2491],
                            stack:'非活跃'
                        },
                        {
                            name:'C',
                            data:[2521,2771,3023],
                            stack:'非活跃'
                        },
                        {
                            name:'B',
                            data:[592,671,727],
                            stack:'非活跃'
                        },
                        {
                            name:'A',
                            data:[796,853,972],
                            stack:'非活跃'
                        }
                    
                ],
                xAxis:['2014','2015','2016']
            }
        }
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('BarStack');
    }
    render() {
        let propsData = {
            style:{width:'100%',height:'300px'},
            parms:this.state.parmData,
            color:['#1A8AEA','#02CBCC','#A373EC','#BA9FE3'],
            barWidth:28,
            grid:{
                left: '4%',
                right: '4%',
                bottom: '4%',
                top:'9%'
            },
            //vertical:false//不写，代表默认纵向
        }
        return <div>
            <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
            <BarStack {...propsData}/>
        </div>;
    }
}

export default EgBarStack;
