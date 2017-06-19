import React from 'react'

const publicFun = {
	loadScript : function(url, callback){ 
		var script = document.createElement("script") 
		script.type = "text/javascript"; 
		if (script.readyState){ //IE 
		script.onreadystatechange = function(){ 
		  if (script.readyState == "loaded" || script.readyState == "complete"){
		    script.onreadystatechange = null; 
		    callback(); 
		  } 
		};
		} else { //Others: Firefox, Safari, Chrome, and Opera 
		script.onload = function(){ 
		  callback(); 
		}; 
		} 
		script.src = url; 
		document.head.appendChild(script); 
	},
	isEmptyObj:function(e) {  
	    if(JSON.stringify(e)==='{}'){
	    	return true;
	    }else{
	    	return false;
	    }
	},
	doAjax:function(parms){
		var env = 'dev';//'dev','line'
		$.ajax({
			url: env=='dev'?parms.devUrl:parms.lineUrl,
			type: parms.type,
			dataType: parms.dataType,
			data: parms.data,
			success:function(res){
				parms.success(res)
			},
			error:function(res){
				parms.error(res)
			}
		});
	},
	getQueryString:function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]); return null;
	}
}

export default publicFun;