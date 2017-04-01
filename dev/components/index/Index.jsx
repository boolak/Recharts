import '../common/style.css'
import './style.css'
import React,{PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { Input } from '../../MTUI/index'
import Header from '../common/Header'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as IndexActionCreaters from '../../actions/IndexAction'


/*首页*/
const Index = React.createClass({

  componentDidMount:function(){

  },
	render: function() {
  	return (
  		<div className="index">
         <Header/>
         <div className="top">
            <div className="top-box">
               <div className="left" ref="left">
                  
               </div>
               <div className="middle">
                  
               </div>
               <div className="right">
                  
               </div>
             </div>
         </div>
         <div className="bottom">
              <div className="bottom-box">
                <div className="left">
                    
                 </div>
                 <div className="middle">
                    
                 </div>
                 <div className="right">
                    
                 </div>
               </div>
         </div>
      </div>
    );
  }
});

//module.exports = Index;

//将state.result state.request绑定到props的result request
function mapStateToProps(state) {
  return {
    // gysGdpResult: state.gysGdp.result,
    // gysGdpRequest:state.gysGdp.request,
  }
}

//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(IndexActionCreaters, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps,mapDispatchToProps)(Index)
