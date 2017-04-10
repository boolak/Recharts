import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

//import jsRed from './jsRed.jsx';
import fullReduce from './fullReduce.jsx';
const rootReducer = combineReducers({
    //jsRed,
    fullReduce,
    routing: routerReducer //整合路由 
})
export default rootReducer