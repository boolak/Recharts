/**
* 气泡提示的插件
* @author : 陈胜云
* @date : 2016-04-01
*/
import './csy.css'
import React from 'react'

//Tips 插件
const Tips = React.createClass({
  callBack : function(index,name){

  },
  getInitialState: function(){
  	 return {
        }
  },
  getDefaultProps() {
      return {
         data: {
                  theTarget:"test",
                  color:"red",
                  width:"80px",
                  arrow:"top",
                  background:"rgba(12, 12, 12, 0.8)"
                  
                },
         defaultsCallBack:function(){
            console.log("这是默认的回调函数")
         }  
      };
  },
  handleClick: function(e){
  },
  tipsHover : function(){
  },
  somehow : function(){
  },
  componentDidMount() {
      $(this.refs.bubble).css({
        "width":this.props.data.width,
        "background":this.props.data.background,
        "color":this.props.data.color
      });
      $(this.refs.bubble).find(".tips_arrow").css({
        // "border-color":this.props.data.background+"transparent transparent rgba(12, 12, 12, 0.8)"
        //DOTO
      })
      var tipsTarget = "#"+this.props.data.theTarget,
          // 触发容器
          boss = $(tipsTarget),
          bossTop = boss.position().top,
          bossLeft = boss.position().left,
          bossWidth = boss.width(),
          bossHeight = boss.height(),
          // 泡泡
          bubble = $(this.refs.bubble),
          bubbleHeight = bubble.outerHeight(),
          bubbleWidth = bubble.outerWidth(),
          //上下左右的各种定位
          topA = bossTop-bubbleHeight-10, //上
          leftA = bossLeft+(bossWidth-bubbleWidth)/2,
          topB = bossTop+(bossHeight-bubbleHeight)/2, //右
          leftB = bossLeft+bossWidth+12,
          topC = bossTop+bubbleHeight+5, // 下
          leftC = bossLeft+(bossWidth-bubbleWidth)/2,
          topD = bossTop+(bossHeight-bubbleHeight)/2, // 左
          leftD = bossLeft-bubbleWidth-12

       function setPosition(t,l){
          bubble.css({
            top:t,
            left:l
         })
       };

       switch(this.props.data.arrow) {
        case "top" : setPosition(topA,leftA);break;
        case "right" : setPosition(topB,leftB);break;
        case "bottom" : setPosition(topC,leftC);break;
        case "left" : setPosition(topD,leftD);break;
       }


       var _this = this;

       //核心逻辑
       boss.hover(
        function(){
          bubble.show();
          _this.props.callback();
          _this.props.defaultsCallBack();
        },
        function(){
          bubble.hide()
        }
       );
  },
  render: function() {
    return (
    	<div className={"tips_bubble "+this.props.data.arrow} ref="bubble">
        <div className="tips_arrow"></div>
        <span className="tips_content">
          提示
        </span>
      </div>
    );
  }
});

//配置信息
export default Tips;



// var obj = {
//   data:{
//     theTarget:"#button",
//     color:"red",
//     width:"80px",
//     arrow:"top"
//     },
//   callBack:null
// }