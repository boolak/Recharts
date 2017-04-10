import {ADD, RED} from '../actions/IndexAction';

export default function js(state={
    result:'default'
},action){
    switch(action.type) {
        case ADD:
            return Object.assign({}, state, {
                result:action.result
            })
            break;
        case RED:
            return Object.assign({}, state, {
                result:action.result
            })
            break;
        default:
            return state
    }
}