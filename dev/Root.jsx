import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import DevTools from './tools/DevTools';




//App入口
import App from './containers/App';

//首页
import Index from './components/index/Index';

//import Report from './components/report/index';

//路由
const Root = React.createClass({
	render(){
		const { store, history } = this.props
		return(
		  <Provider store={store}>
	        <div>
			  <Router history={history}>
			    <Route path="/" component={App}>
			      <IndexRoute component={Index} />
				  <Route path="index" component={Index}/>
				  {/*<Route path="report" component={Report}/>*/}
			    </Route>
			  </Router>
			  <DevTools />
		   </div>
	  	</Provider>
	  	)
	}
})

module.exports = Root;