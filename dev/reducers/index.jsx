import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
	routing: routerReducer //整合路由 
})
export default rootReducer