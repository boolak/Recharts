/*弹框action*/
export const FULLSCREEN = 'FULLSCREEN';
function fullScreen(name){
    return {
        type:FULLSCREEN,
        name:name
    }
}
export function setFullScreen(name){
    return (dispatch)=>{
        return dispatch(fullScreen(name));
    }
}