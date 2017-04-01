import React from 'react'

const setHeight = {
	getInitialState : function(){ 
	    return { 
	      style : {
		      	height : '1080px'
		      }
	    }
	},
	componentDidMount: function() {
       if(this.isMounted()){
    		this.setState({
	            style:{
            		height : '1080px'
            	}
	        });
        }
    }
}

export default setHeight;