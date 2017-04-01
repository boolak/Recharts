import {LOGIN_REQUEST_SUCCESS,LOGIN_REQUEST_FAIL} from '../actions/LoginAction'

export default function login(state={
	request:true,
	result:{}
},action){
	switch(action.type){
		case LOGIN_REQUEST_SUCCESS://请求成功！
		   return Object.assign({}, state, {
		   	request:true,
        	result: action.result
      	})
		case LOGIN_REQUEST_FAIL://请求失败！
			return Object.assign({},state,{
				request: true,
				result: action.result
			})
	    default:
	      return state
		}
}


