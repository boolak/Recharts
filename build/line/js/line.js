(function(){
    /*折线图
	 *@param {object}  lineObj   绘制折线图的对象数据
	 */
	function Line(lineObj){
		var id=lineObj.id;
		var width=$('#'+id).width();
		var height=$('#'+id).height();

		this.param={
	          width:width,//画布的默认宽度
	          height:height,//画布的默认高度
	          seekbarW:width-140,//底部拖动条的宽度
	          padding:{'top':20,'right':40,'bottom':120,'left':40},
	          color:['#1f97ff','#9b89ef']//[实线，虚线]
		   };
		this.data=lineObj.data;//获取数据
		this.id=lineObj.id;//获取id
		this.sliceNum=[];//显示的数据的起始位置
		this.lineWidth=0;//折线图的宽度
		this.lineHeight=170;//折线图的高度
		this.lineTop=0;//折线图距离顶部的距离
		this.eachLineH=20;//每条斜线的间隔
		this.eachBarW=0;//拖动条每个间隔的宽度  依据总得数据data来计算的
		this.lineMove=0;//拖动滚动条时的移动距离
		this.xAxisNum=0;//间隔数量
		this.lineBox='';//装这些图的g元素 包括了折线 x轴 y轴
		this.path='';//用于储存path
		this.shadowG='';//阴影背景的g元素
		this.shadowLineArr=[];//阴影背景的斜线
		this.circle='';//储存小圆点
		this.text='';//存储定点的数字
		this.svg=this.drawSvg();//绘制画布
		this.init();//调用初始化方法
    }
    Line.prototype={
    	/*
    	*初始化方法
    	*/
        init:function(){
        	var data=this.data;
        	var valLen=data[1].value.length;//获取x轴的数组的总长度
        	this.sliceNum=[valLen-6,valLen];

        	var width=this.param.width;
	    	var padding=this.param.padding;
	    	this.lineWidth=width-padding.left-padding.right;
	    	this.lineTop=padding.top+55;//折线图距离顶部的距离 30为图例的高度20加上图例到折线图的距离 10

	 
      	    this.xAxisNum=this.sliceNum[1]-this.sliceNum[0]-1;//计算x轴的间隔数量

	    	var valLen=data[1].value.length;//获取数据总长度
			var seekbarW=this.param.seekbarW;//底部拖动条的宽度
			this.eachBarW=seekbarW/valLen;//拖动条每个间隔的宽度  依据总得数据data来计算的


        	
    		this.drawLine();//数据加载出来后调用绘制折线的方法
    		this.drawShadowBg();//绘制背景
	    	this.xAxis();//绘制x轴
	    	this.yAxis();//绘制y轴
	    	this.drawSeekBar();//绘制拖动条
	    	this.drawCircle();//绘制折线上的小圆点
	    	this.drawLegend();//绘制图例
	    	this.mouseMoveEvent();//调用鼠标移动事件方法
	    	this.legendClickEvent();//图例点击事件

        },
         /*
		 *每次拖动重绘制 一部分图表
		 */
        drawRepeat:function(){
        	this.drawLineRepeat();//数据加载出来后调用绘制折线的方法
	    	this.xAxis();//绘制x轴
	    	this.yAxis();//绘制y轴
        },
        /*
		 *绘制画布
		 */
    	drawSvg:function(){//绘制画布
    		var id=this.id;
	        var width=this.param.width;
	        var height=this.param.height;
	        var color = ['#2d4f74'];
		    var svg=d3.select('#'+id).append('svg')
		          .attr('id','lineSvg')
		          .attr('width',width)
		          .attr('height',height)
		          .style("background-color", function(d,i){
			            return color[0];
			        })
	        return svg;
    	},
    	/*
		 *计算折线图y轴最大值
		 */
    	countMax:function(){
    		var data=this.data;
    		var length=data.length;//长度为折线的条数
    		var max=0;
    		for(var i=0;i<length;i++){
    			var curMax=d3.max(data[i].value,function(d){
    				return d[1];
    			})
    			if(curMax>max){
    				max=curMax;
    			}
    		}
    		return max;
    	},
    	/*
		 *计算折线图x轴比例
		 */
    	xScale:function(){
    		var data=this.dataHandle();//调用数据处理方法
    		console.log(data,'1111111111111')

    		var dataLen=data[1].value.length;

    		var min=data[1].value[0][0];//获取x轴坐标的起点

    		var max=data[1].value[dataLen-1][0];//获取x轴坐标的终点

    		var valLen=data[1].value.length;
    		var xVal=[];
    		
    		for(var i=0;i<valLen;i++){
    			xVal.push(data[1].value[i][0])
    		}


    		var width=this.lineWidth;
    		var xScale=d3.scale.ordinal()
    					 .domain(xVal)
    					 .rangePoints([0,width])
    		return xScale;
    	},
    	/*
		 *计算折线图y轴比例
		 */
    	yScale:function(){
    		var max=this.countMax();
    		var height=this.lineHeight;
    		var yScale=d3.scale.linear()
    					 .domain([0,max*1.1])
    					 .range([height,0])
    		return yScale;
    	},
    	/*
		 *创建一个直线生成器
		 */
    	linePath:function(){
    		var xScale=this.xScale();
    		var yScale=this.yScale();
    		var linePath=d3.svg.line()
    		  .x(function(d){ return xScale(d[0]) })
    		  .y(function(d){ return yScale(d[1]) })
    		  return linePath;
    	},
    	/*
		 *数据处理
		 */
		dataHandle:function(){
		 	var sliceNum=this.sliceNum;//获取截取
		 	console.log(sliceNum,'sliceNum')

		 	var dataArr=[];
		 	var data=this.data;
		 	var valLen=data[1].value.length;
		 	var dataLen=data.length;
		 	if(valLen<6){
		 		dataArr=data;
		 	}else{
		 		for(var i=0;i<dataLen;i++){
		 			var dataObj={};
		 			dataObj['type']=data[i].type;
		 			dataObj['name']=data[i].name; 
		 			dataObj['value']=data[i].value.slice(sliceNum[0],sliceNum[1]);

		 			dataArr.push(dataObj);
		 		}
		 	}
		 	console.log(dataArr,'dataArr')
		 	return dataArr;
		},
		drawShadowBg:function(){//绘制阴影背景
			var lineBox=this.lineBox;

			var lineWidth=this.lineWidth;//获取折线图部分的宽度
			var lineHeight=this.lineHeight;//获取
			var xAxisNum=this.xAxisNum;//取得间隔数
			var eachInterval=lineWidth/xAxisNum;//每个间隔的距离

			var height=this.param.height;

			var padding=this.param.padding;
			var sliceNum=this.sliceNum;
			var intervalNum=sliceNum[1]-sliceNum[0];

			//绘制g元素 用于装阴影
			var shadowG=lineBox.append('g')
			         .attr('id','shadowBg')
			         .attr('class','shadowBg')
			         .attr('width',eachInterval)
			         .attr('transform','translate('+((xAxisNum-1)*eachInterval)+',0)')
			       

            var lineArr=[
	            			{
	            				'p1':[0,0],
	            				'p2':[0,lineHeight]
	            			},
	            			{
	            				'p1':[eachInterval,0],
	            				'p2':[eachInterval,lineHeight]
	            			}
                  		]
            var  lineH=lineHeight;//计算线段的长度

           var eachLineH=this.eachLineH;//每条斜线的间隔

           var slope=(3*eachLineH)/eachInterval;//当j=3时求经过（0,0）点的斜率 slope=(y2-0)/(x2-0)


            for(var j=0;j<12;j++){
            	var p1y=(j-3)*eachLineH;
            	var p2y=j*eachLineH;
            	var p1=[],p2=[];
            	if(p1y<0){
            		var x1=eachInterval-(j*eachLineH)/slope; // x1=x2-y2/slope  
            		p1=[x1,0]
            	}else{
            		p1=[0,(j-3)*eachLineH]
            	}

            	if(p2y>lineH){
            		var x2=(lineH-(j-3)*eachLineH)/slope;  //x2=(y2-y1)/slope
            		p2=[x2,lineH]
            	}else{
            		p2=[eachInterval,j*eachLineH]
            	}

            	lineArr.push({'p1':p1,'p2':p2})

            }

            var lineArrLen=lineArr.length;
            var shadowLineArr=[];
            for(var i=0;i<lineArrLen;i++){
	    	    var shadowLine=shadowG.append('line')
	    	       .attr('x1',lineArr[i].p1[0])
	    	       .attr('y1',lineArr[i].p1[1])
	    	       .attr('x2',lineArr[i].p2[0])
	    	       .attr('y2',lineArr[i].p2[1])
	    	       .attr('fill','none')
				   .attr('stroke-width',2)
				   .attr('stroke','#37577d')
				shadowLineArr.push(shadowLine);
		    }

		    this.shadowLineArr=shadowLineArr;
		    this.shadowG=shadowG;
		},
		drawShadowBgRepeat:function(){//拖动时再次绘制
			var data=this.data;

			var shadowG=this.shadowG;
			var shadowLineArr=this.shadowLineArr;


			var lineWidth=this.lineWidth;//获取折线图部分的宽度
			var lineHeight=this.lineHeight;//获取折线图的高度
			var xAxisNum=this.xAxisNum;//取得间隔数
			if(xAxisNum<1){
				xAxisNum=1;
			}
			
			var eachInterval=lineWidth/xAxisNum;//每个间隔的距离


			var height=this.param.height;
			var padding=this.param.padding;
			var sliceNum=this.sliceNum;
			var intervalNum=sliceNum[1]-sliceNum[0];
			

			//绘制g元素 用于装阴影
			   shadowG.transition().duration(1000)
			          .attr('width',eachInterval)
			          .attr('transform','translate('+((xAxisNum-1)*eachInterval)+',0)')

			       
           var eachLineH=this.eachLineH;
            var lineArr=[
	            			{
	            				'p1':[0,0],
	            				'p2':[0,lineHeight]
	            			},
	            			{
	            				'p1':[eachInterval,0],
	            				'p2':[eachInterval,lineHeight]
	            			}
                  		]
            var  lineH=lineHeight;//计算线段的长度

           var eachLineH=this.eachLineH;//定义每个线段的长度

           var slope=(3*eachLineH)/eachInterval;//当j=3时求经过（0,0）点的斜率 slope=(y2-0)/(x2-0)


            for(var j=0;j<12;j++){
            	var p1y=(j-3)*eachLineH;
            	var p2y=j*eachLineH;
            	var p1=[],p2=[];
            	if(p1y<0){
            		var x1=eachInterval-(j*eachLineH)/slope; // x1=x2-y2/slope  
            		p1=[x1,0]
            	}else{
            		p1=[0,(j-3)*eachLineH]
            	}

            	if(p2y>lineH){
            		var x2=(lineH-(j-3)*eachLineH)/slope;  //x2=(y2-y1)/slope
            		p2=[x2,lineH]
            	}else{
            		p2=[eachInterval,j*eachLineH]
            	}

            	lineArr.push({'p1':p1,'p2':p2})
            }

            var lineArrLen=lineArr.length;
            var data1ValLen=data[1].value.length;
            for(var i=0;i<lineArrLen;i++){
	    	    var shadowLine=shadowLineArr[i]
	    	       .transition().duration(1000)
	    	       .attr('x1',lineArr[i].p1[0])
	    	       .attr('y1',lineArr[i].p1[1])
	    	       .attr('x2',lineArr[i].p2[0])
	    	       .attr('y2',lineArr[i].p2[1])

	    	    if(sliceNum[1]!=data1ValLen){
	    	       shadowLine.attr('stroke-width',0)
	    	    }else{
	    	    	shadowLine.attr('stroke-width',2)
	    	    }
		    }
		},
    	/*
		 *初始化绘制折线图
		 */
		drawLine:function(){
			var svg=this.svg;
			var lineWidth=this.lineWidth;//获取折线图部分的宽度
			var lineTop=this.lineTop;//折线图距离顶部的距离
			var xAxisNum=this.xAxisNum;//取得间隔数
			var eachInterval=lineWidth/xAxisNum;//每个间隔的距离

			var $this=this;
			var data=this.dataHandle();//调用数据处理方法

			var padding=this.param.padding;
			var linePath=this.linePath();
			var color=this.param.color;//[实线，虚线]
			var c=['actual','forecast'];//实际值与预测值的class

			
			//绘制顶部的线
			

			var lineBox=svg.append('g')
				   .attr('id','lineBox')
				   .attr('class','lineBox')
				   .attr('transform','translate('+(padding.left)+','+lineTop+')')

			this.lineBox=lineBox;//把转这些图的g元素储存起来

			var topPoint={'p1':[0,0],'p2':[lineWidth,0]};

			var topLine=lineBox.append('line')
	    	       .attr('x1',topPoint.p1[0])
	    	       .attr('y1',topPoint.p1[1])
	    	       .attr('x2',topPoint.p2[0])
	    	       .attr('y2',topPoint.p2[1])
	    	       .attr('fill','none')
				   .attr('stroke-width',2)
				   .attr('stroke','#37577d')



			//添加折线路径
			var path=lineBox.selectAll('path')
			   .data(data)
			   .enter()
			   .append('path')
			   .attr('class',function(d,i){
			   		return 'path '+c[i];
			   })
			   .attr('transform','translate(0,0)')
			   .attr('d',function(d){
			   		return linePath(d.value);
			   })
			   .attr('fill','none')
			   .attr('stroke-width',2)
			   .attr('stroke-dasharray',function(d,i){
			   		if(d.type=="solid"){
			   			return '0,0';
			   		}else{
			   			return '5,5';
			   		}
			   })
			   .attr('stroke',function(d,i){
			   			return color[i];
			   })

			   this.path=path;
		},
		drawLineRepeat:function(){
			var data=this.dataHandle();//调用数据处理方法

			var linePath=this.linePath();
			var path=this.path;
			path.each(function(d,i){
				if(data[i].value.length){
					d3.select(this).transition().duration(1000).attr("d", linePath(data[i].value));
				}
			})
		},
		/*
		 *绘制x轴坐标以及折线上的数字的数据格式化
		 */
		xAxisDataFormat:function(){
			var data=this.dataHandle();//调用数据处理方法
			var dataLen=data.length;
			var ycValLen=data[1].value.length;//求出预测值得
			var xAxisData=[];
    		var xVal=[];

    		for(var i=0;i<dataLen;i++){
	 			var dataObj={};
	 			dataObj['type']=data[i].type;
	 			dataObj['name']=data[i].name; 
	 			dataObj['value']=[];
	 			var valLen=data[i].value.length;
	 			if(ycValLen<8){
	 				for(var j=0;j<valLen;j++){
	 					dataObj['value'].push(data[i].value[j]);
	 				}
	 			}else if(ycValLen>7&&ycValLen<16){
	 				for(var j=0;j<valLen;j=j+2){
	 					dataObj['value'].push(data[i].value[j]);
	 				}
	 			}else{
	 				for(var j=0;j<valLen;j=j+3){
	 					dataObj['value'].push(data[i].value[j]);
	 				}
	 			}
	 			xAxisData.push(dataObj);
		 	}
		 	return xAxisData;
		 	
		},
		/*
		 *绘制x轴
		 */
		xAxis:function(){
			var $this=$('#xAxis').remove();
			var lineBox=this.lineBox;
			var xScale=this.xScale();

			var lineHeight=this.lineHeight;
			var padding=this.param.padding;
			var data=this.xAxisDataFormat();//调用格式化x轴数据处理方法

			//var data=this.dataHandle();//调用数据处理方法
    		
    		var valLen=data[1].value.length;
    		var xVal=[];

    		if(valLen<8){
    			for(var i=0;i<valLen;i++){
    				xVal.push(data[1].value[i][0])
    			}
    		}else{
    			for(var j=0;j<valLen;j=j+2){
    				xVal.push(data[1].value[j][0])
    			}
    		}

			var xAxis=d3.svg.axis()
						.scale(xScale)
						.ticks(5)
						.tickValues(xVal)
						//.tickFormat(d3.format('d'))
						.orient('bottom')

		    lineBox.append('g')
		       .attr('class','axis')
		       .attr('id','xAxis')
		       .attr('transform','translate(0,'+lineHeight+')')
		       .call(xAxis)
		},
		/*
		 *绘制y轴
		 */
		yAxis:function(){
			var $this=$('#yAxis').remove();
			var lineBox=this.lineBox;
			var yScale=this.yScale();
			var padding=this.param.padding;
			var yAxis=d3.svg.axis()
						.scale(yScale)
						.ticks(5)
						.orient('left');
			
			lineBox.append('g')
		       .attr('class','axis')
		       .attr('id','yAxis')
		       .attr('transform','translate(0,0)')
		       .call(yAxis)
		},
		/*
		* 绘制图例
		*/
		drawLegend:function(){
			var color=this.param.color;//[实线，虚线]

			var svg=this.svg;
			var data=this.data;
			var dataLen=data.length;
			var padding=this.param.padding;
			var text=['实际值（亿元）','预测值（亿元）'];
			var c=['actual','forecast'];
			for(var j=0;j<dataLen;j++){

				var legendG=svg.append('g')
					   .attr('class','legend')
					   .attr('cName',c[j])
					   .attr('show',true)
					   .attr('cursor','pointer')
					   .attr('transform','translate('+(padding.left+j*140)+','+padding.top+')')

			    legendG.append('rect')
					   .attr('width',20)
					   .attr('height',20)
					   .attr('fill',color[j])

				legendG.append("text")
						.attr('font-size','14px')
						.attr('text-anchor','middle')
						.attr('class','textNum')
						.attr("x",80)
						.attr("y",15)
						.attr('dx','0')
						.attr('dy','0')
						.text(text[j])
						.attr("fill",'#86a8ce')
			}
		},
		/*
		*绘制小圆点 数字
		*/
		drawCircle:function(){
			var $this=this;
			var lineBox=this.lineBox;
			var color=this.param.color;
			lineBox.selectAll('.textNum').remove();
			//var data=this.dataHandle();//调用数据处理方法
			var data=this.xAxisDataFormat();//调用格式化x轴数据处理方法
			var dataLen=data.length;
			var xScale=this.xScale();
			var yScale=this.yScale();

			//添加系列的小圆点
			var dataVal=[];
			for(var i=0;i<dataLen;i++){//循环遍历 合并坐标 一次性添加小圆点
				var val=data[i].value;
				var type=data[i].type;
				var valLen=val.length;
				for(var j=0;j<valLen;j++){
					dataVal.push({'value':val[j],'type':type})
				}
			}
			
			// //添加小圆点
			// var circle=svg.selectAll("circle")
			// 		.data(dataVal)
			// 		circle.enter()
			// 		.append("circle")
			// 		// .transition().duration(1000)
			// 		.attr("cx", function(d,i) {
			// 			console.log(d,'dddd')
			// 		return xScale(d[0])+50;
			// 		})
			// 		.attr("cy", function(d,i) {
			// 		return yScale(d[1])+50;
			// 		})
			// 		.attr("r",5)
			// 		.attr("fill",'red')
			// 		.attr('fill-opacity',0)
			// 		.transition().duration(2500)
			// 		.attr('fill-opacity',0.5)
			var dValLen=dataVal.length;
			var textArr=[];
			var c=['actual','forecast'];
			//添加数字
			for(var i=0;i<dValLen;i++){
				var text=lineBox.append("text")
					.attr('font-size','12px')
					.attr('text-anchor','middle')
					.attr('class',function(){
						var lineType=dataVal[i].type;
						if(lineType=='solid'){
							return 'textNum '+c[0];
						}else{
							return 'textNum '+c[1];
						}
					})
					.attr("x", function() {
					return xScale(dataVal[i].value[0]);
					})
					.attr("y", function() {
					return yScale(dataVal[i].value[1]);
					})
					.attr('dx','8')
					.attr('dy','-5')
					.text(dataVal[i].value[1])
					.attr('fill-opacity',0)
					.transition().duration(2500)
					.attr('fill-opacity',1)
					.attr('fill',function(d){
						var lineType=dataVal[i].type;
						if(lineType=='solid'){
							return color[0];
						}else{
							return color[1];
						}
					})
				textArr.push(text);

			}
			this.text=textArr;
		},
		// drawCircleRepeat:function(){
		// 	var circle=this.circle;
		// 	var svg=this.svg;
		// 	var data=this.dataHandle();//调用数据处理方法
		// 	var dataLen=data.length;
		// 	var xScale=this.xScale();
		// 	var yScale=this.yScale();

		// 	//添加系列的小圆点
		// 	var dataVal=[];
		// 	for(var i=0;i<dataLen;i++){//循环遍历 合并坐标 一次性添加小圆点
		// 		var val=data[i].value;
		// 		var valLen=val.length;
		// 		for(var j=0;j<valLen;j++){
		// 			console.log(val[j],11)
		// 			dataVal.push(val[j])
		// 		}
		// 	}	
		// 	svg.selectAll("circle")
		// 			.data(dataVal)
		// 			.enter()
		// 			.append("circle")
		// 			.transition().duration(2500)
		// 			.attr("cx", function(d,i) {
		// 				console.log(d,'dddd')
		// 			return xScale(d[0])+50;
		// 			})
		// 			.attr("cy", function(d,i) {
		// 			return yScale(d[1])+50;
		// 			})
		// 			.attr("r",5)
		// 			.attr("fill",'red')

		// },
		/*
		 *绘制拖动条
		 */
		drawSeekBar:function(){
			var lineBox=this.lineBox;
			var sliceNum=this.sliceNum;//获取数据显示的范围 初始为显示后五个
			var sliceMin=sliceNum[0];
			var sliceMax=sliceNum[1];

			var eachBarW=this.eachBarW;//每个的间隔宽度

			var width=this.param.width;//获取画布的宽度
			var height=this.param.height;//获取画布的高度
			var lineHeight=this.lineHeight;
			var padding=this.param.padding;//获取画布的内边距

			var seekbarW=this.param.seekbarW;//底部拖动条的宽度
			var seekBarH=25;//底部拖动条的高度

			var barW=25;//拖动按钮的宽度

			var drag=this.dragBtn();//拖动按钮
			//var dragRect=this.dragRect();//拖动中间条  暂时没用
			//绘制g元素 用于装拖动条的背景
			var gBg=lineBox.append('g')
			         .attr('class','seekBarBg')
			         .attr('transform','translate(20,'+(lineHeight+25)+')')
			//绘制图片
			     gBg.append('image')
			      .attr('class','seekBarBgImg')
    			  .attr('id','seekBarImg')
    			  .attr('x',0)
    			  .attr('y',0)
    			  .attr('width',seekbarW)
    			  .attr('height',seekBarH)
    			  .attr('xlink:href',function(d){
    			  	    return '/line/images/seekBar.png';
    			  })
    	    //绘制g元素  用于装拖动条的bar
    	    var g=lineBox.append('g')
			         .attr('class','seekBar')
			         .attr('transform','translate(20,'+(lineHeight+25)+')')
			         
			    var seekBarRectWidth=(eachBarW*sliceMax-5)-eachBarW*sliceMin

    			g.append('rect')
    		     .attr('class','seekBarRect')
    		     .attr('id','seekBarRect')
    		     .attr('x',function(){
    			  	return eachBarW*sliceMin+2;
    			  })
    			 .attr('y',0)
    			 .attr('width',seekBarRectWidth)
    			 .attr('height',seekBarH)
    			 .attr('fill','#6788a7')
    			 .attr('fill-opacity',0.5)
    			 //.call(dragRect)


			     g.append('image')
			      .attr('class','seekBarBtn')
    			  .attr('id','seekBarLeft')
    			  .attr('der','left')
    			  .attr('x',function(){
    			  	return eachBarW*sliceMin;
    			  })
    			  .attr('y',0)
    			  .attr('width',5)
    			  .attr('height',seekBarH)
    			  .attr('xlink:href',function(d){
    			  	    return '/line/images/seekBarDrag.png';
    			  })
    			  .call(drag)

    			g.append('image')
			      .attr('class','seekBarBtn')
    			  .attr('id','seekBarRight')
    			  .attr('der','right')
    			  .attr('x',function(){
    			  	return eachBarW*sliceMax-5;
    			  })
    			  .attr('y',0)
    			  .attr('width',5)
    			  .attr('height',seekBarH)
    			  .attr('xlink:href',function(d){
    			  	    return '/line/images/seekBarDrag.png';
    			  })
    			  .call(drag)
		},
		/*
		 *拖动方法
		 */
		dragBtn:function(wh){
			var $this=this;
			var data=this.data;
			var valLen=data[1].value.length
			console.log(valLen,'valLen')
			var seekbarW=this.param.seekbarW;//底部拖动条的宽度
			var eachBarW=this.eachBarW;//拖动条每个间隔的宽度  依据总得数据data来计算的
            var lineWidth=this.lineWidth;//获取折线图的折线部分的宽度
            var originalX=0,otherBarX=0;
			var drag=d3.behavior.drag()
						  .on('dragstart',function(d){
						  	$('#lineSvg').off('mousemove');//解除鼠标经过的事件绑定
						  	$('#lineSvg').off('mouseout');//解除鼠标离开的事件绑定
						  	  originalX=d3.select(this).attr('x');//暂存鼠标按下时的值 用于拖动时判断
						  	  otherBarX=$(this).siblings('image').attr('x');
						  	  console.log(originalX,otherBarX,'bijiao')
						  })
						  .on('drag',function(d){ 
						  	var _this=$(this);
						  	console.log(_this,'_this')

						  	  var der='';
						  	  d3.select(this)
			  	                .attr('x',function(d){
				  	              	  var x=d3.event.x;//取得当前的x坐标
				  	              	  var n=parseInt(x/eachBarW);//计算得出第几个间隔
				  	              	  console.log(originalX,otherBarX,x,'坐标值是多少')
				  	              	  if(x>otherBarX){
				  	              	  	der='right';
				  	              	  }else{
				  	              	  	der='left';
				  	              	  }

			  	              	 	 if(n<0){
				  	              	  	n=0;
				  	              	  }
				  	              	 if(n>valLen-1){
				  	              	 	n=valLen;
				  	              	 }

				  	              	  var sliceMin=$this.sliceNum[0];
				  	              	  var sliceMax=$this.sliceNum[1];
				  	              	  $this.xAxisNum=sliceMax-sliceMin-1;//计算x轴的间隔数量
				  	              	  var minVal=sliceMax-sliceMin;

				  	              	  if(der=='left'){
				  	              	  	if(sliceMax==n){
				  	              	  		sliceMax=sliceMax+1;
				  	              	  	}
				  	              	  	$this.sliceNum=[n,sliceMax];
				  	              	  	console.log($this.sliceNum,'打印出来看看左侧拖动条')
				  	              	  }else{
				  	              	  	if(sliceMin==n){
				  	              	  		n=n+1;
				  	              	  	}
				  	              	  	$this.sliceNum=[sliceMin,n];
				  	              	  	 console.log($this.sliceNum,'打印出来看看右侧拖动条')
				  	              	  }
				  	              	 

				  	              	  $this.drawShadowBgRepeat();//绘制阴影
				  	              	  $this.drawRepeat();//绘制一次
				  	              	  $this.drawCircle();//绘制小圆点

				  	              	 //拖动左右按钮时 控制中间的条跟着变化
				  	              	 var isSeekBar=_this.attr('class');
				  	              	 if(isSeekBar=='seekBarBtn'){
				  	              	 	 var _otherSeekBar=_this.siblings('.seekBarBtn');//取得另一个按钮
					  	              	 var otherSeekBarX=_otherSeekBar.attr('x');//获取另一个按钮的位置
					  	              	 var dValAbs=0;
				  	              	 	 if(der=='left'){
				  	              	 	 	if(x<1){
				  	              	 	 		x=1;		
				  	              	 	 	}
				  	              	 	 	dValAbs=Math.abs(x-otherSeekBarX);
		  	              	 	 		    $('.seekBarRect').attr('x',x+2)
				  	              	 	 }else{
				  	              	 	 	if(x>seekbarW-5){
				  	              	 	 		x=seekbarW-5;
				  	              	 	 	}
				  	              	 	 	dValAbs=Math.abs(x-otherSeekBarX);     
				  	              	 	 }

				  	              	 	 $('.seekBarRect').width(dValAbs);

				  	              	 	if(x<1){
					  	              	  	x= 1;
					  	              	  }else if(x>seekbarW-5){
					  	              	  	x=seekbarW-5;
					  	              	  }
					  	              	  return x;
				  	              	 }
			  	                 })
						  })
						  .on('dragend',function(){
						  	$this.mouseMoveEvent();
						  })
			    return drag;
		},
		/*
		 *暂时没用 拖动两个按钮之间的滚动条
		 */
		// dragRect:function(){
		// 	var $this=this;
		// 	var data=this.data;
		// 	var valLen=data[1].value.length
		// 	console.log(valLen,'valLen')
		// 	var seekbarW=this.param.seekbarW;//底部拖动条的宽度
		// 	var eachBarW=this.eachBarW;//拖动条每个间隔的宽度  依据总得数据data来计算的
  //           var lineWidth=this.lineWidth;//获取折线图的折线部分的宽度
  //           var originalX=0,otherBarX=0;
		// 	var drag=d3.behavior.drag()
		// 				  .on('dragstart',function(d){
		// 				  	$('#lineSvg').off('mousemove');//解除鼠标经过的事件绑定
		// 				  	$('#lineSvg').off('mouseout');//解除鼠标离开的事件绑定
		// 				  	  originalX=d3.select(this).attr('x');//暂存鼠标按下时的值 用于拖动时判断
		// 				  	  otherBarX=$(this).siblings('image').attr('x');
		// 				  	  console.log(originalX,otherBarX,'bijiao')
		// 				  })
		// 				  .on('drag',function(d){ 
		// 				  	var _this=$(this);
		// 				  	console.log(_this,'_this')

		// 				  	  var der='';
		// 				  	  d3.select(this)
		// 	  	                .attr('x',function(d){
		// 		  	              	  var x=d3.event.x;//取得当前的x坐标
		// 		  	              	  var n=parseInt(x/eachBarW);//计算得出第几个间隔
		// 		  	              	  console.log(originalX,otherBarX,x,'坐标值是多少')
		// 		  	              	  if(x>otherBarX){
		// 		  	              	  	der='right';
		// 		  	              	  }else{
		// 		  	              	  	der='left';
		// 		  	              	  }

		// 	  	              	 	 if(n<0){
		// 		  	              	  	n=0;
		// 		  	              	  }
		// 		  	              	 if(n>valLen-1){
		// 		  	              	 	n=valLen;
		// 		  	              	 }

				  	              	
				  	              	


		// 		  	              	  var sliceMin=$this.sliceNum[0];
		// 		  	              	  var sliceMax=$this.sliceNum[1];
		// 		  	              	  $this.xAxisNum=sliceMax-sliceMin-1;//计算x轴的间隔数量
		// 		  	              	  var minVal=sliceMax-sliceMin;

		// 		  	              	  if(der=='left'){
		// 		  	              	  	if(sliceMax==n){
		// 		  	              	  		sliceMax=sliceMax+1;
		// 		  	              	  	}
		// 		  	              	  	$this.sliceNum=[n,sliceMax];
		// 		  	              	  	console.log($this.sliceNum,'打印出来看看左侧拖动条')
		// 		  	              	  }else{
		// 		  	              	  	if(sliceMin==n){
		// 		  	              	  		n=n+1;
		// 		  	              	  	}
		// 		  	              	  	$this.sliceNum=[sliceMin,n];
		// 		  	              	  	 console.log($this.sliceNum,'打印出来看看右侧拖动条')
		// 		  	              	  }
				  	              	 

		// 		  	              	  $this.drawShadowBgRepeat();//绘制阴影
		// 		  	              	  $this.drawRepeat();//绘制一次
		// 		  	              	  $this.drawCircle();//绘制小圆点

		// 		  	             //控制中间的条
				  	              	
		//   	              	 	 var seekBarRectW=_this.attr('width');//获取拖动条元素宽度
		//   	              	 	 var seekBar=_this.siblings('.seekBarBtn');
		//   	              	 	 var seekBarX1=$(seekBar[0]).attr('x');
		//   	              	 	 var seekBarX2=$(seekBar[1]).attr('x');
		//   	              	 	 if(seekBarX1<seekBarX2){
		//   	              	 	 	$(seekBar[0]).attr('x',x);
		//   	              	 	 	$(seekBar[1]).attr('x',x+seekBarRectW);
		//   	              	 	 }else{
		//   	              	 	 	$(seekBar[1]).attr('x',x);
		//   	              	 	 	$(seekBar[0]).attr('x',x+seekBarRectW);
		//   	              	 	 }
		//   	              	 	 console.log(seekBar,seekBarX1,seekBarX2,'这是啥')

		//   	              	 	 // var leftBarX=leftBar.attr('x');
		//   	              	 	 // var rightBarX=rightBar.attr('x');
		  	              	 	 

		//   	              	 	if(x<1){
		// 	  	              	  	x=1;
		// 	  	              	}else if(x>seekbarW-5-seekBarRectW){
		// 	  	              	  	x=seekbarW-5-seekBarRectW;
		// 	  	              	}
			  	              	
	 //  	              	 	 	// leftBar.attr('x',x)
	 //  	              	 	 	// rightBar.attr('x',x+seekBarRectW)
		  	              	 	

		// 	  	              	return x;
				  	          
				  	              	  
				  	              	
		// 	  	                 })
		// 				  })
		// 				  .on('dragend',function(){
		// 				  	$this.mouseMoveEvent();
		// 				  })
		// 	    return drag;
		// },
		/*
		 *鼠标在svg移动事件
		 */
		 mouseMoveEvent:function(){
		 	var svg=this.svg;
		
		 	var $this=this;
		 	var padding=this.param.padding;
		 	var lineLeft=padding.left;//取得距离左侧的距离
		 	var lineTop=this.lineTop;//取得距离顶部的距离
		 	var lineWidth=this.lineWidth;//取得折线图的宽度
		 	var lineHeight=this.lineHeight;//取得折线图的高度
		 	var data=this.data;
		 	var id=this.id;
		 	
		 	$('#lineSvg').off('mousemove').on('mousemove',function(e){
		 		$('#lineBomb').remove();
		 		
		 		var sliceNum=$this.sliceNum;
		 	    var interval=sliceNum[1]-sliceNum[0]-1;//折线图的间隔
		 	    var interDist=lineWidth/interval;

                var parent=$('.lineBox').offset();
		 		var pageX=e.pageX;
		 		var pageY=e.pageY;
		 		var offsetX=pageX-parent.left;
		 		var offsetY=pageY-parent.top;

		 		var x=offsetX-lineLeft+30;
		 		var y=offsetY;
		 		if(x<0||x>lineWidth||y<0||y>lineHeight){
		 			return false;
		 		}

		 		var lineBombX=offsetX+40;
		 		var lineBombY=offsetY+60;
		 		if(lineBombX>lineWidth-50){
		 			lineBombX=offsetX-115;
		 		}

		 		var nowInter=Math.ceil(x/interDist+0.5);//求得当前的位置是第几个间隔
		 		var dataIndex=sliceNum[0]+nowInter-1;//计算数据的数据索引

		 		var bombArr=[];
		 		    bombArr.push('<div class="lineBomb" id="lineBomb" style="display:block; position:absolute;left:'+lineBombX+'px;top:'+lineBombY+'px"><h3>'+data[1].value[dataIndex][0]+'</h3>');
		 		    if(dataIndex<data[0].value.length){ 
		 		    	bombArr.push('<span><i></i>'+data[0].name+'：'+data[0].value[dataIndex][1]+'</span>');
		 		    }
		 		    
		 		    bombArr.push('<span><i></i>'+data[1].name+'：'+data[1].value[dataIndex][1]+'</span></div>');
		 		  

		 		var bombArrHtml=bombArr.join('');
		 		    $('#'+id).append(bombArrHtml);
		 		    //$('#lineBomb').fadeIn(1000);
		 	})

		 	$('#lineSvg').off('mouseout').on('mouseout',function(e){
		 		$('#lineBomb').remove();
		 	})
		 },
		 /*
		 *图例点击事件
		 */
		 legendClickEvent:function(){

		 	$('.legend').on('click',function(e){ 
		 		var $this=d3.select(this);
		 		var cName=$this.attr('cName');//获取类名 class
		 		var show=$this.attr('show');//获取显示隐藏的标记 true为显示 false为隐藏
		 		if(show=='true'){
		 			$('.'+cName).fadeOut();
		 			$this.attr('show','false');
		 		}else{
		 			$('.'+cName).fadeIn();
		 			$this.attr('show','true');
		 		}
		 	})

		 },
		removeSvg:function(){//移除svg
			this.svg.remove();
		}
    }

    window.line=function(lineObj){
    	return new Line(lineObj);
    } 

})()
