import '../common/style.css'
import './style.scss'
import React,{PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { Input } from '../../MTUI/index'
import Header from '../common/Header'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PopActionCreaters from '../../actions/PopAction'

//import Js from './index/Js';

import DetPop from '../common/DetPop';
//图表实例
import EgBar from './index/EgBar';
import EgLine from './index/EgLine';
import EgLineBar from './index/EgLineBar';
import EgBarStack from './index/EgBarStack';
import EgBarGroup from './index/EgBarGroup';
import EgPie from './index/EgPie';
import EgRader from './index/EgRader';
import EgScatter from './index/EgScatter';
import EgMapCat from './index/EgMapCat';
import EgMapHot from './index/EgMapHot';
import EgMapLine from './index/EgMapLine';
import EgPieNest from './index/EgPieNest';


/*首页*/
const Index = React.createClass({

    componentDidMount:function(){

    },
    render: function() {
        return (
            <div className="index">
                <DetPop {...this.props}/>
                <Header/>
                <pre className='tips'>
                    提示：<br/>
                    状态 parmData，该state代表渲染图表所需要的数据（其实后端返回来的数据格式就可以这样定义）。<br/>
                    属性 propsData，该props定义该图表所需配置的各种参数（可以看到其中的选项parms的值就是取的状态parmData的值）。<br/>
                    最后在render中渲染该图表组件。
                </pre>
                <ul className='charts'>
                    <li><EgBar {...this.props}/></li>
                    <li><EgLine {...this.props}/></li>
                    <li><EgLineBar {...this.props}/></li>
                    <li><EgBarStack {...this.props}/></li>
                    <li><EgBarGroup {...this.props}/></li>
                    <li><EgPie {...this.props}/></li>
                    <li><EgRader {...this.props}/></li>
                    <li><EgScatter {...this.props}/></li>
                    <li><EgMapCat {...this.props}/></li>
                    <li><EgMapHot {...this.props}/></li>
                    <li><EgMapLine {...this.props}/></li>
                    <li><EgPieNest {...this.props}/></li>
                </ul>
            </div>
        );
    }
});
//module.exports = Index;


//将state.result state.request绑定到props的result request
function mapStateToProps(state) {
    return {
        modName: state.fullReduce
        //jg:state.jsRed
        // gysGdpResult: state.gysGdp.result,
        // gysGdpRequest:state.gysGdp.request,
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(PopActionCreaters, dispatch)
}
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(Index)
