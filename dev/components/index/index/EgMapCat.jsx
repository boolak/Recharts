import React,{PropTypes} from 'react'
import { browserHistory } from 'react-router'
import MapCat from '../../bbdcharts/MapCat'

/*散点地图*/
class EgMapCat extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'EgMapCat';
        this.state = {
            parmData:{
                data:[
                    {"name": "中国电信股份有限公司贵阳分公司","value": "381"},
                    {"name": "中国移动通信集团贵州有限公司贵阳分公司","value": "349"},
                    {"name": "中国联合网络通信有限公司贵阳市分公司","value": "578"},
                    {"name": "贵州省广播电视信息网络股份有限公司贵阳市分公司","value": "648"},
                    {"name": "京东商城","value": "581"},
                    {"name": "家有购物","value": "780"},
                    {"name": "贵阳供电局","value": "543"},
                    {"name": "贵州艾普宽带科技有限公司","value": "643"},
                    {"name": "苏宁电器","value": "737"},
                    {"name": "贵阳长城宽带网络服务有限公司","value": "833"},
                    {"name": "贵阳市供水总公司","value": "426"}
                ],
                geo:{
                    "中国电信股份有限公司贵阳分公司":[106.75,26.63],
                    "中国移动通信集团贵州有限公司贵阳分公司":[106.75,26.82],
                    "中国联合网络通信有限公司贵阳市分公司":[106.86,27.13],
                    "贵州省广播电视信息网络股份有限公司贵阳市分公司":[106.24,26.63],
                    "京东商城":[106.71,26.43],
                    "家有购物":[106.55,26.93],
                    "贵阳供电局":[106.75,27.1],
                    "贵州艾普宽带科技有限公司":[106.95,26.81],
                    "苏宁电器":[106.72,26.57],
                    "贵阳长城宽带网络服务有限公司":[106.48,26.83],
                    "贵阳市供水总公司":[106.35,26.63]
                }
            }
        }
    }
    detPop(){
            let {setFullScreen} = this.props;
            setFullScreen('MapCat');
        }
    render(){
        let propsData = {
            style:{height: '300px', width: '100%'},
            data:this.state.parmData.data,
            geo:this.state.parmData.geo,
            title:'散点分布地图',//不行默认为空,
            itemColor: '#21586D', // 地图颜色
            scatterColor: '#7ECDF4' // 散点颜色
        }
        return (
            <div>
                <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>
                <MapCat ref='MapCat' {...propsData}/>
            </div>
        )
    }
}

export default EgMapCat;