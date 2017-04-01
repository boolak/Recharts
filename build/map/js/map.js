(function(){
    /*绘制地图与雷达图的方法
	 *@param {object}  mapData   绘制地图的对象数据 初始为GeoJson 后边再扩展
	 */
	function MapRadar(mapRadarObj){
		this.id=mapRadarObj.id;
		var id=mapRadarObj.id;
		var width=$('#'+id).width();
		var height=$('#'+id).height();
		this.param={
	          width:width,//画布的宽度
	          height:height,//画布的高度
			  lineLen:width/2-2,//圆弧的线段长度
			  center:[width/2,height/2]//绘制的圆弧的中心点
		   };
		
		this.geoJson=mapRadarObj.geoJson;
		this.markData=mapRadarObj.markData;
		this.pointerDeg=null;
		this.deg=0;
		this.timer=null;//定时器
		this.pointerDegStore="";//暂时储存旋转的角度值  用于和下一次比较
		this.init();
    }
    MapRadar.prototype={
    	init:function(){
    		this.svg=this.drawSvg();//绘制画布
		    var geoJson=this.geoJson;
		    var markData=this.markData;
		    this.drawMap(geoJson);//绘制地图
		    this.drawMark(markData);//画标注的点
		    this.drawRadar();//绘制雷达图
    	},
    	/*
		 *绘制画布
		 */
    	drawSvg:function(){//绘制画布

	        var width=this.param.width;
	        var height=this.param.height;
	        var id=this.id;
		    var svg=d3.select('#'+id).append('svg')
		          .attr('width',width)
		          .attr('height',height)
	        return svg;
    	},
    	/*
		 *定义投影函数
		 */
		defineProjection:function(){
			var width=this.param.width;
            var height=this.param.height;
            var scale=38.86*width;
			//定义投影函数
    		var projection = d3.geo.mercator()
						    .center([106.6848120000,26.5883330000])
						    .scale(scale)
						    .translate([width/2, (height+130)/2]);
		    return projection
		},
    	/*
		 *绘制地图
		 */
    	drawMap:function(geoJson){

    		var svg=this.svg; 
            var geoJson=geoJson;
           
    		var projection =this.defineProjection();//调用定义的投影函数
            
            //使用投影函数定义地理路径生成器
	        var path = d3.geo.path()
    				 .projection(projection);

    	    var color = ['#264465','#223c5a'];

    		   
		    svg.selectAll("path")
		        .data(geoJson.features)
		        .enter()
		        .append("path")
		        .attr("stroke","#1c3958")
		        .attr("stroke-width",1)
		        .attr("fill", function(d,i){
		            return color[0];
		        })
		        .attr("d", path )   //使用地理路径生成器
		        .on("mouseover",function(d,i){//鼠标经过的颜色
		        	    d3.select(this).attr('cursor','pointer')
		                d3.select(this).attr("fill",color[1]);
		        })
		        .on("mouseout",function(d,i){//鼠标离开的颜色
		                d3.select(this).attr("fill",color[0]);
		        })
    	},
    	/*根据经纬度绘制标注点
		 *@param { object } mark  标注点的信息
		 */
		drawMark:function(mark){
			var svg=this.svg; 
			var id=this.id;
			var location=mark.location;
		    var projection =this.defineProjection();//调用定义的投影函数

		    //绘制文字 
			var text=svg.selectAll('g')
						 .data(location)
		    			 .enter()
		    			 .append('g')
		    			 .attr('class','gText')
		    			 .attr('name',function(d){
		    			  	return d.name;
		    			 })
		    			 .attr('transform',function(d,i){
		    			 	var x=projection([d.longitude,d.latitude])[0]-30;
		    			 	var y=projection([d.longitude,d.latitude])[1]-10;
		    			 	return 'translate('+x+', '+y+')'
		    			 })
		    			.append("text")
						.attr('font-size','12px')
						.attr('text-anchor','middle')
						.attr('class','textNum')
						.attr("x",0)
						.attr("y",0)
						.attr('dx',function(d,i){
							var name=d.name;
							if(name=="综保区"){
								return 0;
							}else if(name=="白云区"){
								return -20;
							}else if(name=="乌当区"){
								return 20;
							}else if(name=="花溪区"){
								return 0;
							}else if(name=="航空港"){
								return 40;
							}else if(name=="经开区"){
								return 0;
							}else if(name=="南明区"){
								return 0;
							}else if(name=="云岩区"){
								return 20;
							}else if(name=="观山湖区"){
								return 0;
							}else{
								return 0;
							}
						})
						.attr('dy',function(d,i){
							var name=d.name;
							if(name=="综保区"){
								return -20;
							}else if(name=="白云区"){
								return 0;
							}else if(name=="乌当区"){
								return -20;
							}else if(name=="花溪区"){
								return 20;
							}else if(name=="航空港"){
								return 0;
							}else if(name=="经开区"){
								return 20;
							}else if(name=="南明区"){
								return 20;
							}else if(name=="云岩区"){
								return 0;
							}else if(name=="观山湖区"){
								return 20;
							}else{
								return 0;
							}
						})
						.text(function(d,i){
							return d.name;
						})
						.attr("fill",'#6294f8')

		    //绘制地图上的圆点
		    var color=['red','blue','green'];//点的颜色
				 
		    var img=60;//图片的宽高
		    var points=svg.selectAll('.image')
		    			  .data(location)
		    			  .enter()
		    			  .append('image')
		    			  .attr('class','point')
		    			  .attr('id',function(d){
		    			  	   return d.id;
		    			  })
		    			  .attr('name',function(d){
		    			  	   return d.name;
		    			  })
		    			  .attr('x',function(d){
		    			  		return projection([d.longitude,d.latitude])[0]-img/2;
		    			  })
		    			  .attr('y',function(d){
		    			  		return projection([d.longitude,d.latitude])[1]-img/2;
		    			  })
		    			  //.attr('r',10)
		    			  .attr('width',60)
		    			  .attr('height',60)
		    			  .attr('xlink:href',function(d){
		    			  	 var pointColor=d.pointColor;
		    			  	    if(pointColor=='red'){
		    			  	    	return '/map/images/red.png';
		    			  	    }else if(pointColor=='blue'){
		    			  	    	return '/map/images/blue.png';
		    			  	    }else{
		    			  	    	return '/map/images/green.png';
		    			  	    }

		    			  })
		    			  .style({'fill-opacity':1,'cursor':'pointer','display':'none'})
		    			  .on("mouseover",function(d,i){//鼠标经过的颜色
		    			  	    $('.mapRadarBomb').remove();//移除现有的弹框元素
		    			  	    console.log(d3.select(this));
		    			  	    var $this=d3.select(this);
                                var cx=Number($this.attr('x'))+img-10;
                                var cy=Number($this.attr('y'))+img/2-10;
		                    	$this.style({'fill-opacity':1})
		                    	var name=d.name;
		                    	var divergence=d.divergence;
		                    	var bombArr=[];
		                    	 bombArr.push('<div class="mapRadarBomb" style=" display:none;position:absolute;left:'+cx+'px;top:'+cy+'px"><h3>'+d.name+'</h3><table><thead><tr><td width="70%" class="l">偏离指标</td><td width="30%" class="r">偏离程度</td></tr></thead><tbody>');
		                    	 for(key in divergence){
		                    	 	 bombArr.push('<tr><td class="l">'+key+'</td><td class="r">'+divergence[key]+'</td></tr>');
		                    	 }
		                    	 bombArr.push('</tbody><i class="iconfont"></i></table>');
		                    	 var bombHtml=bombArr.join('');
		                    	 var html=$('#'+id).append(bombHtml);
		                    	 $('.mapRadarBomb').fadeIn(1000);
		                    	
					      })
					      .on("mouseout",function(d,i){//鼠标离开的颜色
					      	    d3.select(this).style({'fill-opacity':0.5})
					      	    $('.mapRadarBomb').fadeOut(2000).remove();
					      })
					      .on('click',function(d,i){
					        	window.location.href='/countyEco';
					       });	

			//绘制完点后调用 计算点坐标的方法
			this.countPointerAngle(mark);

		},
		/*绘制雷达图
		 *
		 */
		drawRadar:function(){

			var svg=this.svg; 
			
			//定义一个中心点  [a,b]
			var a=this.param.center[0],b=this.param.center[1];
			var x=this.param.lineLen;//x为线段长度
			var center=[a,b];//绘制的圆弧的中心点
			var origin=[a-x+10,b-x+10]//围绕转动的顶点
			//计算四个顶点的值
		    var top=[a,b-x];
		    var bottom=[a,b+x];
		    var left=[a-x,b];
		    var right=[a+x,b];

		    //绘制雷达图的线
		    svg.append('line')
		       .attr('x1',top[0])
		       .attr('y1',top[1])
		       .attr('x2',bottom[0])
		       .attr('y2',bottom[1])
		       .attr('stroke','#3d6086')
		       .attr('stroke-width','1px')

		     svg.append('line')
		        .attr('x1',left[0])
		        .attr('y1',left[1])
		        .attr('x2',right[0])
		        .attr('y2',right[1])
		        .attr('stroke','#3d6086')
		        .attr('stroke-width','1px')

                 var lineLen=this.param.lineLen;//获取圆弧的线段长度 最大r
                 var eachInter=40;//每个圆之间的间隔为40
 				//循环调用方法绘制圆
 				var circleNum=Math.ceil(lineLen/eachInter);//为40时绘制多少个圆

 				var reEachInter=lineLen/circleNum;

		       for(var i=0;i<circleNum+1;i++){
		       	   this.drawRadarArc(reEachInter,center,i);
		       }

		       //绘制转动的指针
		       this.drawMovePointer();

		    
		},
		/*绘制雷达图的圆
		 *@param { array } center  中心位置的点的坐标
		 *@param { number } i  第几个狐
		 */
		drawRadarArc:function(eachInter,center,i){
			var svg=this.svg;
			 //定义绘制狐的起始点
		    var dataSet={startAngle:0,endAngle:Math.PI*2}

		    //创建一个狐生成器
		    var arcPath=d3.svg.arc()
		    			  .innerRadius(eachInter*i)
		    			  .outerRadius(eachInter*i+1);
		    //添加路径
		    svg.append('path')
		       .attr('d',arcPath(dataSet))
		       .attr('transform','translate('+center[0]+','+center[1]+')')
		       .attr('stroke','#3d6086')
		       .attr('stroke-width','1px')
		       .attr('fill','#3d6086')
		},
		/*绘制转动的指针
		 *@param { array } center  中心位置的点的坐标
		 *@param { number } i  第几个狐
		 */
		drawMovePointer:function(){
		    this.timer=setInterval(this.movePointer.bind(this),12);
        },
        //移动的阴影
		movePointer:function(){
			//定义一个中心点  [a,b]
			var a=this.param.center[0],b=this.param.center[1];
			var center=[a,b];//绘制的圆弧的中心点
			var svg=this.svg;
			var deg=this.deg;
		    $('.movePointer').remove();
		    $('.defs').remove();

		    var cr=this.calCoor(deg)//调用方法计算坐标
	
		    var xOne=cr.cx1,yOne=cr.cy1,xTwo=cr.cx2,yTwo=cr.cy2;


            //定义一个线性渐变  
			var defs = svg.append("defs")
						  .attr('class','defs')  
			  
			var linearGradient = defs.append("linearGradient")  
			                        .attr("id","linearColor")  
			                        .attr("x1",xOne)  
			                        .attr("y1",yOne)
			                        .attr("x2",xTwo)  
			                        .attr("y2",yTwo)
			                        .attr("gradientUnits","userSpaceOnUse")


		    this.linear(linearGradient);//调用方法生成渐变
			  
			
		    //定义绘制狐的起始点
		     
		    var dataSet={startAngle:Math.PI*deg,endAngle:Math.PI*(deg+0.5)}

		    //创建一个狐生成器
		  	var lineLen=this.param.lineLen;
		    var arcPath=d3.svg.arc()
		    			  .innerRadius(0)
		    			  .outerRadius(lineLen);
		    //添加路径
		    svg.append('path')
		       .attr('d',arcPath(dataSet))
		       .attr('class','movePointer')
		       .attr('transform','translate('+center[0]+','+center[1]+')')
		       .attr('stroke','#3d6086')
		       .attr('stroke-width','0')
		       .attr('fill','#3d6086')
		       .style("fill","url(#" + linearGradient.attr("id") + ")")

		        if(deg<2){
		    		deg=deg+0.001;
			    }else{
			    	deg=0;
			    }
			    var rotateDeg=parseInt(deg*Math.PI*180/Math.PI);//计算当前旋转的角度 弧度表示
			    this.deg=deg;
			    var pointerDeg=this.pointerDeg;
			    
			    if(rotateDeg!=this.pointerDegStore){
			    	if(pointerDeg[rotateDeg]){
				    	var id=pointerDeg[rotateDeg].toString();

				    	var idArr=id.split(',');
				    	var idArrLen=idArr.length;

				    	for(var i=0;i<idArrLen;i++){
				    		$('#'+idArr[i]).fadeIn();
				    		$('#'+idArr[i]).fadeOut(22000);
				    	}
			    	}	  
			    }

			   this.pointerDegStore=rotateDeg;
				    
		},
		//定义计算转动时渐变的起始点坐标
		calCoor:function(deg){
		 	var x1=180,y1=-20,x2=6,y2=-200;
       		var pi=Math.PI;

       		//从第一象限开始计算
       		var angle1=Math.atan(Math.abs(x1/y1));  //计算第一个点的起始角度
       		var angle2=Math.atan(Math.abs(x2/y2));  //计算第二个点的起始角度

       		var r1=Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2));//计算第一个点到圆心的距离
       		var r2=Math.sqrt(Math.pow(x2,2)+Math.pow(y2,2));//计算第二个点到圆心的距离
      
       		var cx1,cy1,cx2,cy2;

       		var arcDeg=deg*Math.PI;//旋转的角度

       		if(arcDeg<(pi*0.5-angle1)){//第一个点在第一象限
       			cx1=Math.sin(angle1+arcDeg)*r1;
       			cy1=-Math.cos(angle1+arcDeg)*r1;
       		}else if(arcDeg>(pi*0.5-angle1)&&arcDeg<(pi-angle1)){//第一个点在第四象限
       			cx1=Math.cos(arcDeg+angle1-pi*0.5)*r1;
       			cy1=Math.sin(arcDeg+angle1-pi*0.5)*r1;
       		}else if(arcDeg>(pi-angle1)&&arcDeg<(pi*1.5-angle1)){//第一个点在第三象限
       			cx1=-Math.sin(arcDeg+angle1-pi)*r1;
       			cy1=Math.cos(arcDeg+angle1-pi)*r1;
       		}else{//第一个点在第二象限
       			cx1=-Math.cos(arcDeg+angle1-pi*1.5)*r1;
       			cy1=-Math.sin(arcDeg+angle1-pi*1.5)*r1;
       		}

       		if(arcDeg<(pi*0.5-angle2)){//第一个点在第一象限
       			cx2=Math.sin(angle2+arcDeg)*r2;
       			cy2=-Math.cos(angle2+arcDeg)*r2;
       		}else if(arcDeg>(pi*0.5-angle2)&&arcDeg<(pi-angle2)){//第一个点在第四象限
       			cx2=Math.cos(arcDeg+angle2-pi*0.5)*r2;
       			cy2=Math.sin(arcDeg+angle2-pi*0.5)*r2;
       		}else if(arcDeg>(pi-angle2)&&arcDeg<(pi*1.5-angle2)){//第一个点在第三象限
       			cx2=-Math.sin(arcDeg+angle2-pi)*r2;
       			cy2=Math.cos(arcDeg+angle2-pi)*r2;
       		}else{//第一个点在第二象限
       			cx2=-Math.cos(arcDeg+angle2-pi*1.5)*r2;
       			cy2=-Math.sin(arcDeg+angle2-pi*1.5)*r2;
       		}

       		return {cx1:cx1,cy1:cy1,cx2:cx2,cy2:cy2}
        },
        //绘制渐变的方法
        linear:function(linearGradient){

           	var linear=[
						{'offset':0,'stopColor':'#535183','stopOpacity':'0.2'},
						{'offset':0,'stopColor':'#535183','stopOpacity':'0.2'},
						{'offset':0.07,'stopColor':'#5b538d','stopOpacity':'0.38'},
						{'offset':0.13,'stopColor':'#625495','stopOpacity':'0.52'},
						{'offset':0.2,'stopColor':'#66559b','stopOpacity':'0.62'},
						{'offset':0.28,'stopColor':'#69569e','stopOpacity':'0.68'},
						{'offset':0.38,'stopColor':'#6a569f','stopOpacity':'0.7'},
						{'offset':0.43,'stopColor':'#65569e','stopOpacity':'0.57'},
						{'offset':0.53,'stopColor':'#5c569d','stopOpacity':'0.36'},
						{'offset':0.63,'stopColor':'#55569b','stopOpacity':'0.2'},
						{'offset':0.73,'stopColor':'#51569b','stopOpacity':'0.09'},
						{'offset':0.84,'stopColor':'#4e569a','stopOpacity':'0.02'},
						{'offset':0.96,'stopColor':'#4d569a','stopOpacity':'0'}
				]

			var linearLen=linear.length;

			for(var i=0;i<linearLen;i++){

				linearGradient.append("stop")  
				                .attr("offset",linear[i].offset)  
				                .style("stop-color",linear[i].stopColor)
				                .style('stop-opacity',linear[i].stopOpacity)

			}                          
        },
        /*计算点的坐标进而求得对应的角度
		 *@param { array } mark  对应的点的信息
		 */
		countPointerAngle:function(mark){

			var x=this.param.center[0],y=this.param.center[1];

			 var projection =this.defineProjection();//调用定义的投影函数
			 var location=mark.location;
			 var pointer=[];
			 var locationLen=location.length;
			 var degArr=[];//定义装弧度的变量
			 var degObj={};

			 for(var i=0;i<locationLen;i++){//循环计算点的坐标
			 	var x1=projection([location[i].longitude,location[i].latitude])[0];//调用投影函数获得坐标 x
			 	var y1=projection([location[i].longitude,location[i].latitude])[1];//调用投影函数获得坐标 y
			 	pointer.push([x1,y1]);

			 	//计算弧度  参考点为x轴的正方向（向右）
			 	var judgeX=x1-x;
			 	var judgeY=y1-y;
			 	var deg;
			 	if(judgeX>0&&judgeY<0){//第一象限
			 		deg=Math.atan(Math.abs(judgeX/judgeY))+Math.PI*1.5
			 	}else if(judgeX<0&&judgeY<0){//第二象限
			 		deg=Math.atan(Math.abs(judgeY/judgeX))+Math.PI
			 	}else if(judgeX<0&&judgeY>0){//第三象限
			 		deg=Math.atan(Math.abs(judgeX/judgeY))+Math.PI*0.5
			 	}else if(judgeX>0&&judgeY>0){//第四象限
			 		deg=Math.atan(Math.abs(judgeY/judgeX))
			 	}

			 	var id=location[i].id;
			 	var deg=parseInt(deg*180/Math.PI)
			 	if(degObj[deg]){
			 		degObj[deg]=degObj[deg]+','+id;
			 	}else{
			 		degObj[deg]=id;
			 	}
			 }
			 //console.log(degObj,'看看')
			 this.pointerDeg=degObj;
		},
		clearTimer:function(){
			var $this=this;
			clearInterval($this.timer);
		},
		removeSvg:function(){
			this.clearTimer();
			this.svg.remove();
		}
   }
    window.mapRadar=function(mapRadarObj){
    	return new MapRadar(mapRadarObj);
    }  
})()


