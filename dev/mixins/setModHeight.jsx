import React from 'react'

const setModHeight = {
	getInitialState : function(){
		var $modTitle=$(this.refs.modTitle);//获取title对象
       	var boxHeight=$modTitle.parent().height();//获取title的父级对象高度
        var modTitleHeight=$modTitle.height();//获取title高度
       	var modConHeight=boxHeight-modTitleHeight;//获取主体内容高度
	    return { 
	      style:{
            		height : modConHeight+"px"
            	}
	    }
	},
	componentDidMount: function() {
       if(this.isMounted()){
       	var $modTitle=$(this.refs.modTitle);//获取title对象
       	var boxHeight=$modTitle.parent().height();//获取title的父级对象高度
        var modTitleHeight=$modTitle.height();//获取title高度
       	var modConHeight=boxHeight-modTitleHeight;//获取主体内容高度
       	console.log(boxHeight,modTitleHeight,modConHeight,'主体内容高度');
    		this.setState({
	            style:{
            		height : modConHeight+"px"
            	}
	        });
        }
    }
}

export default setModHeight;