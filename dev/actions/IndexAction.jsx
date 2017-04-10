/*首页 测试用*/

export const ADD = 'ADD';
export const RED = 'RED';

function add(result){
    return {
        type:ADD,
        result:result
    }
}
function red(result){
    return {
        type:RED,
        result:result
    }
}


export function jsFun(data){
    if(data.type == 'add'){
        return (dispatch)=>{
            return dispatch(add(data.value))
        }
    }else{
        return (dispatch)=>{
            return dispatch(add(data.value))
        }
    }
    
}