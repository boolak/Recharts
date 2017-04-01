/**
* 整个项目的入口
*/
import React from 'react'
import { Link } from 'react-router' 
import setHeight from '../mixins/setHeight'
import Header from '../components/common/Header'
const App = React.createClass({
  mixins: [setHeight],
  render() {
  	 //获取rul地址
  	 const routerPath = this.props.location.pathname;
  		return (
	    	<div className="app" style={this.state.style}>
	    		{this.props.children}
	    	</div>
    	);
  }
});
//APP入口
module.exports = App;