import {FULLSCREEN} from '../actions/PopAction';

export default function full(state={
    name:''
},action){
    switch(action.type) {
        case FULLSCREEN:
            return Object.assign({}, state, {
                name:action.name
            })
            break;
        default:
          return state
    }
}