import React from 'react'

const setMinHeight = {
	getInitialState : function(){ 
	    return { 
	      style : {
		      	minHeight : ($(window).height() - 60)+"px"
		      }
	    }
	},
	componentDidMount: function() {
        $(window).resize(function(event) {
        	if(this.isMounted()){
        		this.setState({
		            style:{
	            		minHeight : ($(window).height() - 60)+"px"
	            	}
		        });
        	}
        }.bind(this));
    }
}

export default setMinHeight;