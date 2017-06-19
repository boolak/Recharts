import React from 'react'

const setHeight = {
    getInitialState : function(){ 
        return { 
            style : {
                minHeight : '1080px'
            }
        }
    },
    componentDidMount: function() {
       if(this.isMounted()){
            this.setState({
                style:{
                    minHeight : '1080px'
                }
            });
        }
    }
}

export default setHeight;