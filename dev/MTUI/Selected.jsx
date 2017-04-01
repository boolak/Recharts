/**
* 一个简单的日历插件
* @author : Mantou
* @date : 2016-03-01
*/
import React from 'react'

//自定义的select 
const Selected = React.createClass({
	getInitialState: function(){
		var title = (this.props.placeholder==undefined?<span className="placeholder">请选择...</span>:<span className="placeholder">{this.props.placeholder}</span>);
		var value = this.props.value; 
		//设置初始值
		if(this.props.value != undefined){
			this.props.data.map(function(index, elem) {
				if(index.value == value){
					title = index.label;
				}
			})
		}
  		return {
  			value : value,
  			title : title,
  			onChange: function() {}
  		}
  	},
	handleClickTitle : function(e){
		var speed = 200;
		var $box = $(e.currentTarget).find(".mt-select-box");
		var val = $(e.target).attr("data-val");
		if($box.is(':hidden')){
			$box.slideDown(speed);
		}else{
			$box.slideUp(speed);
		}
		//点击后隐藏
		$(document).one("click.Selected", function(){
        	$box.slideUp(speed);
    	});
		e.stopPropagation();
	},
	handleClickOption : function(e){
		//e.stopPropagation();
		var $this = $(e.currentTarget);
		var val = $this.data("val");
		var title = $this.html();
		this.setState({
			value : val,
			title : title
		},function(){
			this.props.onChange(val,title);
		});
	},
	componentWillReceiveProps(nextProps) {
		//console.log("~~~~~~~~~~~~~~~~~~~~~")
		//console.log(nextProps.value,this.props.value);
	    if(nextProps.value != this.props.value){
	    	var title = (this.props.placeholder==undefined?<span className="placeholder">请选择...</span>:<span className="placeholder">{this.props.placeholder}</span>);
	    	if(nextProps.value != undefined){
				nextProps.data.map(function(index, elem) {
					if(index.value == nextProps.value){
						title = index.label;
					}
				})
			}
	    	this.setState({
	    		value: nextProps.value,
	    		title:title
	    	})
	    }  
	},
	iniSelectData : function(){
		var arr = [];
		this.props.data.length&&this.props.data.map(function(index, elem) {
			var act = index.value==this.state.value?'active':'';
			var className = 'option '+act;
			arr.push(<li onClick={this.handleClickOption} key={elem} className={className} data-val={index.value}>{index.label}</li>);
		}.bind(this));
		return arr;
	},
    render: function() {
        return (
            <div style={{width:this.props.width}} className={"mt-select"+(this.props.className==undefined ? "" : " "+this.props.className)} data-val={this.state.value} id={this.props.id} onClick={this.handleClickTitle}> 
              <div className="mt-select-title">{this.state.title}</div>
              <input type="hidden" name={this.props.name} defaultValue={this.state.value}/>
              <i className="iconfont icon-arrowdown"></i>
              <ul className="mt-select-box">
                {this.iniSelectData()}
              </ul>
            </div>
        );
    }
});

//配置信息
module.exports = Selected;