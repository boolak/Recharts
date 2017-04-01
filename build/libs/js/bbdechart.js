/**
 * Created by ashima on 2016/7/2.
 */
var BBDechart = {
	mapHome: function(parm) {
		/*$.get('/libs/js/guiyang.json', function(chinaJson) {
			echarts.registerMap('guiyang', chinaJson);
			var mapLineChart = echarts.init(document.getElementById(parm.id));
			ECHART_ROOM.push(mapLineChart);
			var geoCoordMap = {
				'南明区': [106.719323, 26.575477],
				'云岩区': [106.730821, 26.610626],
				'花溪区': [106.676205, 26.417426],
				'乌当区': [106.757555, 26.635689],
				'白云区': [106.628774, 26.68399],
				'观山湖区': [106.624749, 26.607525],
				'开阳县': [106.970269, 27.063365],
				'息烽县': [106.746052, 27.096817],
				'修文县': [106.597563, 26.844729],
				'清镇市': [106.476708, 26.562552],
				'贵阳市': [106.63908, 26.651657]
			}
			var convertData = function(data) {
				var res = [];
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					var fromCoord = geoCoordMap[dataItem[0].name];
					var toCoord = geoCoordMap[dataItem[1].name];
					if (fromCoord && toCoord) {
						res.push({
							fromName: dataItem[0].name,
							toName: dataItem[1].name,
							coords: [fromCoord, toCoord]
						});
					}
				}
				return res;
			};
			var series = [];
			var seriesData = function(data) {
				series.push({
					name: '',
					type: 'lines',
					zlevel: 1,
					effect: {
						show: true,
						period: 6,
						trailLength: 0.7,
						color: '#fff',
						symbolSize: 3
					},
					lineStyle: {
						normal: {
							color: "#a6c84c",
							width: 0,
							curveness: 0.2
						}
					},
					data: convertData(data)
				}, {
					name: '',
					type: 'lines',
					zlevel: 2,
					effect: {
						show: true,
						period: 6,
						trailLength: 0,
						symbol: "pin",
						symbolSize: 15
					},
					lineStyle: {
						normal: {
							color: "#a6c84c",
							width: 1,
							opacity: 0.4,
							curveness: 0.2
						}
					},
					data: convertData(data)
				}, {
					name: '',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					symbolSize: function(val) {
						return val[2] / 50;
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					mapLocation: {
						y: '60'
					},
					symbol: 'circle',
					hoverAnimation: true,
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: false
						}
					},
					itemStyle: {
						normal: {
							shadowBlur: 10,
							shadowColor: 'rgba(14, 241, 242, 0.8)'
						},
						emphasis: {
							borderColor: '#fff',
							borderWidth: 1
						}
					},
					data: data.map(function(dataItem) {
						return {
							name: dataItem[1].name,
							value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
						};
					})
				}, {
					name: '',
					type: 'map',
					mapType: 'guiyang', // 自定义扩展图表类型
					top: 10,
					bottom: 10,
					label: {
						normal: {
							show: true,
							textStyle: {
								color: "#fff",
								fontSize: "12",
								fontWeight: "normal",
								fontFamily: "微软雅黑"
							}
						},
						emphasis: {
							show: true,
							textStyle: {
								color: "#fff",
								fontSize: "12",
								fontWeight: "normal",
								fontFamily: "微软雅黑"
							}
						}
					},
					itemStyle: {
						normal: {
							areaColor: 'rgba(58, 116, 156, 0.3)',
							borderColor: '#354a69'
						},
						emphasis: {
							areaColor: 'rgba(58, 116, 156, 0.9)',

						}
					},
					data: parm.data2
				})
			};
			seriesData(parm.data);
			var option = {
				tooltip: {
					trigger: 'item',
					padding: 5,
					formatter: function(params) {
						if (params.seriesType == "effectScatter") {
							return params.name + ' : ' + params.value;
						} else {
							return params.name;
						}
					}
				},
				dataRange: {
					y: "bottom",
					x: 'left',
					padding: [0, 0, 0, 40],
					min: 0,
					max: 1000,
					calculable: true,
					color: ['rgba(255, 255, 255, 1)', 'rgba(14, 241, 242, 1)', 'rgba(37, 140, 249, 1)'],
					textStyle: {
						color: '#fff'
					}
				},
				geo: {
					map: 'guiyang',
					top: 10,
					bottom: 10,
					label: {
						normal: {
							show: true,
							textStyle: {
								color: "#fff",
								fontSize: "12",
								fontWeight: "normal",
								fontFamily: "微软雅黑"
							}
						},
						emphasis: {
							show: true,
							textStyle: {
								color: "#fff",
								fontSize: "12",
								fontWeight: "normal",
								fontFamily: "微软雅黑"
							}
						}
					},
					itemStyle: {
						normal: {
							areaColor: 'rgba(58, 116, 156, 0.3)',
							borderColor: '#354a69'
						},
						emphasis: {
							areaColor: 'rgba(58, 116, 156, 0.9)',

						}
					}
				},
				series: series
			};

			//根据城市获取相关列表数据
			function homeMapCounty(parm) {
				$("#" + parm.tipsId).show();
				$.ajax({
					url: "/queryCountyEco.do", //"./data/countyEco/gzMapCity.json", //queryCountyEco.do
					dataType: "json",
					data: {
						month: parm.month,
						year: parm.year,
						county: parm.county
					},
					type: "GET",
					success: function(result) {
						if (result.code == 1) {
							$("#" + parm.tipsId + " .title").html(parm.county);
							var info = "";
							for (var i = 0; i < result.data.length; i++) {
								var _getName = result.data[i].name.split("（");
								info += '<li class="changeLi"  data-key=' + _getName[0] + ' >' + _getName[0] + ':<span class="orange">' + result.data[i].value + '</span>（' + _getName[1] + '</li>'
							}
							$("#" + parm.tipsId + " ul").html("").append(info);

						}
					}
				});
			}
			//默认加载
			var _timeTicket;
			var currentLoc = 0;
			var selectCounty = "";
			var homeMapCountyParm = {
				month: parm.month,
				year: parm.year,
				tipsId: parm.tipsId,
				county: parm.selectedCounty
			}
			homeMapCounty(homeMapCountyParm);

			//clearInterval(_timeTicket);

			//轮播
			_timeTicket = setInterval(function() {
				var locations = parm.data2;
				var _temp = [];
				for (var i = 0; i < locations.length; i++) {
					if (i == currentLoc) {
						var _items = locations[i];
						_items["selected"] = true;
						_temp.push(locations[i]);
						selectCounty = locations[i].name
					} else {
						var _items = {
							name: locations[i].name
						};
						_temp.push(_items);
					}
				}
				option.series[3].data = _temp;
				mapLineChart.setOption(option);
				currentLoc = (currentLoc + 1) % locations.length;

				homeMapCountyParm.county = selectCounty;
				homeMapCounty(homeMapCountyParm);

			}, 5000);


			mapLineChart.on("click", function(paramV) {
				clearInterval(_timeTicket); //清除轮播定时器
				var _newTemp = [];
				for (var i = 0; i < parm.data2.length; i++) {
					if (parm.data2[i].name == paramV.name) {
						var _items = {
							name: parm.data2[i].name,
							selected: true
						};
						_newTemp.push(_items);
						selectCounty = parm.data2[i].name
					} else {
						var _items = {
							name: parm.data2[i].name
						};
						_newTemp.push(_items);
					}
				}

				option.series[3].data = _newTemp;
				mapLineChart.setOption(option);
				homeMapCountyParm.county = paramV.name;
				homeMapCounty(homeMapCountyParm);



				_timeTicket = setInterval(function() {
					var locations = parm.data2;
					var _temp = [];
					for (var i = 0; i < locations.length; i++) {
						if (i == currentLoc) {
							var _items = locations[i];
							_items["selected"] = true;
							_temp.push(locations[i]);
							selectCounty = locations[i].name
						} else {
							var _items = {
								name: locations[i].name
							};
							_temp.push(_items);
						}
					}
					option.series[3].data = _temp;
					mapLineChart.setOption(option);
					currentLoc = (currentLoc + 1) % locations.length;

					homeMapCountyParm.county = selectCounty;
					homeMapCounty(homeMapCountyParm);

				}, 5000);

			});


			mapLineChart.setOption(option);

		});*/
	},
	mapLine: function(parm) {
		$.get('/libs/js/guiyang.json', function(chinaJson) {
			echarts.registerMap('guiyang', chinaJson);
			var mapLine = echarts.init(document.getElementById(parm.id));
			ECHART_ROOM.push(mapLine);
			if(parm.series.length){
				var maxData = parm.series[0].value;
				for (var i = 0; i < parm.series.length; i++) {
					if (Number(parm.series[i].value) > maxData) {
						maxData = Number(parm.series[i].value);

					}
				}

				var option = {
					tooltip: {
						trigger: 'item',
						formatter: function(v) {
							return v.name + ":" + v.value
						}
					},
					visualMap: {
						min: 0,
						max: maxData,
              			precision:2,
						padding: [0, 0, 20, 50],
						text: ['高', '低'],
						realtime: false,
						calculable: true,
						textStyle: {
							color: '#fff'
						},
						inRange: {
							color: ['rgba(255, 255, 255, 1)', 'rgba(14, 241, 242, 1)', 'rgba(37, 140, 249, 1)'],
						}
					},
					series: [{
						name: '',
						type: 'map',
						mapType: 'guiyang', // 自定义扩展图表类型
						itemStyle: {
							normal: {
								label: {
									show: true,
									textStyle: {
										color: "#fff"
									}
								}
							},
							emphasis: {
								label: {
									show: true,
									textStyle: {
										color: "#fff"
									}
								}
							}
						},
						data: parm.series,
						roam:true,
						scaleLimit:{
						  max:2,
						  min:1
						}
					}]
				}
				mapLine.on(config.EVENT.CLICK, function(paramV) {
					console.info('ttttttttttttttt',paramV)
					var params = {};
					// if (parm.from == "gzmap") {
					// 	params = {
					// 		data: {
					// 			year: parm.year,
					// 			month: parm.month,
					// 			city: paramV.name,
					// 		},
					// 		url: "./data/countyEco/gzMapCity.json", //"/countryEco/gzMapArea.do", //"./data/index/gysGdp.json" 
					// 	}
					// } else if (parm.from == "qxxdnmap") {
					// 	$("#App").attr("selectedKey", paramV.name);
					// 	params = {
					// 		data: {
					// 			year: parm.year,
					// 			month: parm.month,
					// 			city: paramV.name,
					// 		},
					// 		url: "/newEnergy/qxXdnArea.do" ///countryEco/gzMapArea.do?city=开阳县
					// 	}
					// }
					if (parm.from == "qxxdnmap") {
						params = {
							data: {
								year: parm.year,
								month: parm.month,
								city: paramV.name,
							},
							url: "/newEnergy/qxXdnArea.do" ///countryEco/gzMapArea.do?city=开阳县
						}
						$.ajax({
							url: params.url,
							dataType: "json",
							data: params.data,
							type: "GET",
							success: function(result) {
								if (result.code == 1) {
									var info = "";
									for (var i = 0; i < result.data.length; i++) {
										var _getName = result.data[i].name.split("（");
										info += '<li class="changeLi"  data-key=' + _getName[0] + ' >' + _getName[0] + ':<span class="orange">' + result.data[i].value + '</span>（' + _getName[1] + '</li>'
									}
									$("#" + parm.tipsId + " ul").html("").append(info);
									if (paramV.componentType != "series") {
										$("#" + parm.tipsId).fadeOut();
									} else {
										$("#" + parm.tipsId).find(".title").text(paramV.name)
										$("#" + parm.tipsId).fadeIn();
									}
								}
							}
						});
					}

				});
				mapLine.setOption(option);
				var currentLoc = 0;
				var locations = parm.series;
			}
			// var timeTicket = setInterval(function() {
			// 	mapLine.setOption({
			// 		series: [{
			// 			center: locations[currentLoc].coord,
			// 			zoom: 4,
			// 			data: [{
			// 				name: locations[currentLoc].name,
			// 				selected: true
			// 			}],
			// 			animationDurationUpdate: 1000,
			// 			animationEasingUpdate: 'circularInOut'
			// 		}]
			// 	});
			// 	currentLoc = (currentLoc + 1) % locations.length;
			// }, 2000);
		});
	},
	mapRound: function(parm) {
		$.get('/libs/js/guiyang.json', function(chinaJson) {
			echarts.registerMap('guiyang', chinaJson);
			var mapRound = echarts.init(document.getElementById(parm.id));
			ECHART_ROOM.push(mapRound);
			var geoCoordMap = {
				'南明区': [106.719323, 26.575477],
				'云岩区': [106.730821, 26.610626],
				'花溪区': [106.676205, 26.417426],
				'乌当区': [106.757555, 26.635689],
				'白云区': [106.628774, 26.68399],
				'观山湖区': [106.624749, 26.607525],
				'开阳县': [106.970269, 27.063365],
				'息烽县': [106.746052, 27.096817],
				'修文县': [106.597563, 26.844729],
				'清镇市': [106.476708, 26.562552],
				'贵阳市': [106.63908, 26.651657]
			}
			var convertData = function(data) {
				var res = [];
				for (var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if (geoCoord) {
						res.push({
							name: data[i].name,
							value: geoCoord.concat(data[i].value)
						});
					}
				}
				return res;
			};
			var seriesData = [];
			for (var i = 0; i < parm.series.length; i++) {
				var _baseSeries = {
					name: parm.legend[i],
					top: 10,
					bottom: 10,
					type: 'map',
					mapType: 'guiyang',
					label: {
						normal: {
							show: true,
							textStyle: {
								color: "#fff",
								fontSize: "12",
								fontWeight: "normal",
								fontFamily: "微软雅黑"
							}
						},
						emphasis: {
							show: true,
							textStyle: {
								color: "#fff",
								fontSize: "12",
								fontWeight: "normal",
								fontFamily: "微软雅黑"
							}
						}
					},
					itemStyle: {
						normal: {
							// areaColor: '#3a749c',
							borderColor: '#354a69'
						},
						emphasis: {
							areaColor: '#3c8acc',

						}
					},
					data: convertData(parm.series[i])
				}
				seriesData.push(_baseSeries);
			}

			var option = {
				color: ["rgba(195, 23, 94, 0.9)", "rgba(210, 168, 96, 0.9)", "rgba(113, 194, 234, 0.9)", "rgba(128, 194, 105, 0.9)"],
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					x: "right",
					y: "bottom",
					itemWidth: 10,
					itemHeight: 10,
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					},
					padding: [0, 20, 20, 0],
					data: parm.legend
				},
				visualMap: {
					min: 0,
					max: 1200,
					padding: [0, 0, 0, 50],
					text: ['高', '低'],
					realtime: false,
					calculable: true,
					textStyle: {
						color: '#fff'
					},
					inRange: {
						color: ['rgba(255, 255, 255, 0.5)', 'rgba(14, 241, 242, 0.5)', 'rgba(37, 140, 249, 0.5)'],
					}
				},
				series: seriesData,
			}
			mapRound.setOption(option);
		});
	},
	roundLine: function(parm) {
		var roundLineChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(roundLineChart);
		var option = {
			title: {
				text: '',
				show: false,
				x: 'center',
				textStyle: {
					color: "#fff",
					fontSize: "16",
					fontWeight: "normal",
					fontFamily: "微软雅黑"
				}
			},
			color: ["#4065fe"],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'none' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			calculable: true,
			grid: {
				left: '5%',
				bottom: '14%',
				containLabel: true
			},
			legend: {
				show: false,
				x: "right",
				y: "top",
				padding: [20, 55, 0, 5],
				textStyle: {
					color: "#99a3b7",
					fontSize: 12,
					fontFamily: '微软雅黑'
				},
				data: []
			},
			dataZoom: [{
				realtime: true,
				start: 0,
				end: 100,
				handleColor: "#676d99",
				fillerColor: "rgba(94,100,143,0.3)",
				dataBackgroundColor: "#111325",
				textStyle: {
					color: "#99a3b7",
					fontSize: 12,
					fontFamily: '微软雅黑'
				},
			}],
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
					lineStyle: {

						color: 'rgba(204, 204, 204, 0.2)'
					}
				},
				axisLine: {
					lineStyle: {
						width: 2,
						color: '#181a29'
					}
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: '#99a3b7'
					}
				},
				data: parm.xAxis,
			},
			yAxis: {
				name: "",
				nameTextStyle: {
					color: "#fff"
				},
				type: 'value',
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: 'rgba(204, 204, 204, 0.2)'
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					},
					splitLine: {
						show: false,
					}
				}
			},
			series: [{
				name: '贵阳市新动能',
				symbolSize: 10,
				type: 'line',
				stack: '总量',
				data: parm.yAxis,
			}]
		};
		roundLineChart.setOption(option);
	},
	roundLineMinMax: function(parm) {
		var roundLineMinMaxChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(roundLineMinMaxChart);
		//y上限刻度值判断
		var yMax = parm.yAxis[0]||0;
		parm.yAxis.forEach(function(val,i){
			if(yMax<val) yMax = val;
		});

		var YyMax = yMax>parm.markLine.data[0].yAxis?yMax:parm.markLine.data[0].yAxis;

		if(parm.xAxis){
			var markLine = parm.markLine;
			markLine.data.forEach(function(val,i){
				var lineStyle = {
					lineStyle:{
							normal: {
								type: 'solid',
								color: '#62a8ea'
							}
						}
					}
				if(i==0){
					lineStyle.lineStyle.normal.color = 'red';
				}
				Object.assign(val,lineStyle);
			});
			var option = {
				title: {
					text: '',
					show: false,
					x: 'center',
					textStyle: {
						color: "#fff",
						fontSize: "16",
						fontWeight: "normal",
						fontFamily: "微软雅黑"
					}
				},
				color: ["#ED6A40","#4b70fd"],
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'none' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				calculable: true,
				grid: {
					left: '5%',
					bottom: '14%',
					containLabel: true
				},
			   visualMap: {
			        show: false,
			        dimension: 0,
			        pieces: [{
			            lte: parm.xAxis.length-3,
			            color: '#ED6A40'
			        }, {
			            gte: parm.xAxis.length-3,			            
			            color: '#4b70fd'
			        }]
		    	},
				legend: {
					show: true,
					x: "38%",
					y: "top",
					padding: [20, 55, 0, 5],
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					},
					data: parm.legend
				},
				dataZoom: [{
					type:"slider",
					realtime: true,
					startValue: parm.xAxis.length-6,
					endValue: parm.xAxis.length-1,
					handleColor: "#676d99",
					fillerColor: "rgba(94,100,143,0.3)",
					backgroundColor:'#393c5b',
					borderColor:"#000",
			        dataBackground:{
			        	areaStyle:{
			        		color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							  offset: 0, color: '#0a1852' // 0% 处的颜色
							}, {
							  offset: 1, color: '#0770fa' // 100% 处的颜色
							}])
			        	}	        
			        },
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					},
				}],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
						lineStyle: {

							color: 'rgba(204, 204, 204, 0.2)'
						}
					},
					axisLine: {
						lineStyle: {
							width: 2,
							color: '#181a29'
						}
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#99a3b7'
						}
					},
					data: parm.xAxis,
				},
				yAxis: {
					name: "",
					nameTextStyle: {
						color: "#fff"
					},
					max:YyMax,
					type: 'value',
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: 'rgba(204, 204, 204, 0.2)'
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: '#ccc'
						}
					},
					axisLabel: {
						formatter: '{value}',
						textStyle: {
							color: "#99a3b7",
							fontSize: 12,
							fontFamily: '微软雅黑'
						},
						splitLine: {
							show: false,
						}
					}
				},
				series: [{
					name: parm.legend,
					symbolSize: 10,
					type: 'line',
					stack: '总量',
					data: parm.yAxis,
					markLine: markLine
				}]
			};
			console.log(option);
			roundLineMinMaxChart.setOption(option);
		}
		
	},
	doubleLine: function(parm) {
		var doubleLineChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(doubleLineChart);
		var seriesData = [];
		if(parm.legend){
			for (var i = 0; i < parm.yAxis.length; i++) {
				var baseData = {
					name: parm.legend[i],
					symbolSize: 10,
					type: 'line',
					data: parm.yAxis[i],
				};
				seriesData.push(baseData);
			}
			var option = {
				title: {
					text: '',
					show: false,
					x: 'center',
					textStyle: {
						color: "#fff",
						fontSize: "16",
						fontWeight: "normal",
						fontFamily: "微软雅黑"
					}
				},
				color: parm.color,
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'none' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				calculable: true,
				grid: {
					left: ($(window).width()>=1600)?'6%':'7%',
		            right: ($(window).width()>=1600)?'12%':'14%',
					bottom: parm.bottom,
					top: (parm.top)? parm.top : 60,
					containLabel: true
				},
				legend: {
					show: true,
					x: "center",
					y: "top",
					padding: [20, 0, 0, 0],
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					},
					data: parm.legend
				},
				dataZoom: [{
					show:parm.dataZoom,
					type:"slider",
					realtime: true,
					startValue: parm.xAxis.length-6,
					endValue: parm.xAxis.length-1,
					handleColor: "#676d99",
					fillerColor: "rgba(94,100,143,0.3)",
					borderColor:"#000",
			        dataBackground:{
			        	areaStyle:{
			        		color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							  offset: 0, color: '#0a1852' // 0% 处的颜色
							}, {
							  offset: 1, color: '#0770fa' // 100% 处的颜色
							}])
			        	}	        
			        },
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					},
				}],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: 'rgba(204, 204, 204, 0.2)'
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							width: 2,
							color: '#181a29'
						}
					},
					axisLabel: {
						textStyle: {
							color: '#99a3b7'
						}
					},
					data: parm.xAxis,
				},
				yAxis: [{

					nameTextStyle: {
						color: "#fff"
					},

					axisTick: {
						show: false,
					},
					splitLine: {
						lineStyle: {
							width: 2,
							color: '#181a29'
						}
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: '#ccc'
						}
					}

				}],
				series: seriesData
			};
			doubleLineChart.setOption(option);
		}
	},
	verticalBar: function(parm) {
		var verticalBarChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(verticalBarChart);
		var optionbar = {
			tooltip: {
				backgroundColor: '#222',
				borderColor: '#222',
				borderWidth: 1,
				trigger: 'item',
				formatter: "{b}: {c}"
			},
			grid: {
				left: '2%',
				top: '5%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				axisTick: {
					show: false
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: 'rgba(204, 204, 204, 0.2)'
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
				axisLabel: {
					textStyle: {
						color: "#99a3b7",
					}
				}
			},
			yAxis: {
				type: 'category',
				data: parm.yAxis,
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
					lineStyle: {
						color: 'rgba(204, 204, 204, 0.2)'
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
				axisLabel: {
					textStyle: {
						color: "#aab5e0",
					}
				}
			},
			series: [{
				type: 'bar',
				// barWidth: parm.barWidth,
				itemStyle: {
					normal: {
						color: '#4b70fe',
						//barBorderRadius: 6,
						borderColor: '#111'
					},
					emphasis: {
						color: '#4b70fe',
						//barBorderRadius: 6
					}
				},
				data: parm.series
			}]
		};
		verticalBarChart.setOption(optionbar);
	},
	verticalBarText: function(parm) {
		var verticalBarChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(verticalBarChart);
		if(parm.yAxis){
			var optionbar = {
				tooltip: {
					backgroundColor: '#222',
					borderColor: '#222',
					borderWidth: 1,
					trigger: 'item',
					formatter: "{b}: {c}"
				},
				grid: {
					left: '2%',
					top: '5%',
					bottom: '5%',
					containLabel: true
				},
				xAxis: {
					type: 'value',					
					axisTick: {
						show: false
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#111'
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#111'
						}
					},
					axisLabel: {
						formatter: '{value}',
						textStyle: {
							color: "#99a3b7",
							fontSize: 12,
							fontFamily: '微软雅黑'
						}
					}
				},
				yAxis: {
					type: 'category',
					data: parm.yAxis,
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
						lineStyle: {
							color: '#111'
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: '#111'
						}
					},
					axisLabel: {
						textStyle: {
							color: "#aab5e0",
						}
					}
				},
				series: [{
					type: 'bar',
					barWidth: parm.barWidth,
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
								  offset: 0, color: '#2e4179' // 0% 处的颜色
								}, {
								  offset: 1, color: '#4b70fd' // 100% 处的颜色
								}]),
							//barBorderRadius: 6,
							borderColor: '#111',
							borderWidth: parm.borderWidth
						},
						emphasis: {
							color: '#4b70fe',
							//barBorderRadius: 6
						}
					},
					data: parm.series
				}]
			};
			verticalBarChart.setOption(optionbar);
		}
	},
	doublebar: function(parm) {
		var doubleLineChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(doubleLineChart);
		var seriesData = [];
		for (var i = 0; i < parm.series.length; i++) {
			var baseData = {
				name: parm.legend[i],
				type: 'bar',
				stack: '总量',
				itemStyle: {
					normal: {
						//barBorderRadius: 6
					},
					emphasis: {
						//barBorderRadius: 6
					}
				},
				data: parm.series[i]
			};
			Object.assign(baseData,{barMaxWidth:20});
			seriesData.push(baseData);
		}
		//Object.assign(seriesData,{barMaxWidth:30});
		var option = {
			color: ["#4b70fe", "#f19149", "#9fe50b", "#f19ec2", "#a40035", "#13d1af", "#9fe50b", "#5274ac", "#774fc9"],
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.9)',
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'none' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				x: "center",
				y: "top",
				//orient: "vertical",
				padding: [15, 0, 0, 0],
				textStyle: {
					color: "#99a3b7",
					fontSize: 12,
					fontFamily: '微软雅黑'
				},
				data: parm.legend
			},
			grid: {
				left: ($(window).width()>=1600)?'14%':'16%',
				bottom: '14%',
				top: parm.top
			},
			xAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				splitLine: {
					show: false,
					lineStyle: {
						type: 'solid',
						color: '#1c2432'
					}
				},
			}],
			yAxis: [{
				type: 'category',
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				data: parm.yAxis
			}],
			series: seriesData
		};
		doubleLineChart.setOption(option);
	},
	doublebarText: function(parm) {
		var doubleLineChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(doubleLineChart);
		var seriesData = [];
		for (var i = 0; i < parm.series.length; i++) {
			var baseData = {
				name: parm.legend[i],
				type: 'bar',
				stack: '总量',
				barWidth: 30,
				itemStyle: {
					normal: {
						//barBorderRadius: 6
					},
					emphasis: {
						//barBorderRadius: 6
					}
				},
				data: parm.series[i]
			};
			seriesData.push(baseData);
		}
		var option = {
			color: [
				"#a0d3ff", "#72beff", "#41a7ff",
				"#078cff", "#216aff", "#3c3cff", '#4460da',
				"#5967e8", "#5252f1", "#6660e6",
				"#6e41ff", "#6521d7", "#6c4fff", '#4d15ac'
			],
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.9)',
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'none' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				x: "center",
				y: "top",
				padding: [20, 0, 0, 0],
				textStyle: {
					color: "#99a3b7",
					fontSize: 12,
					fontFamily: '微软雅黑'
				},
				data: parm.legend
			},
			grid: {
				left: '5%',
				bottom: '4%',
				top: '15%',
				containLabel: true
			},
			xAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
				splitLine: {
					//show: false,
					lineStyle: {
						type: 'solid',
						color: '#1c2432'
					}
				},
			}],
			yAxis: [{
				type: 'category',
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisLine: {
					//show: false,
					lineStyle: {
						color: '#1c2432'
					}
				},
				data: parm.yAxis
			}],
			series: seriesData
		};
		doubleLineChart.setOption(option);
	},
	SPoublebarText: function(parm) {
		var doubleLineChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(doubleLineChart);
		var seriesData = [];
		for (var i = 0; i < parm.series.length; i++) {
			var baseData = {
				name: parm.legend[i],
				type: 'bar',
				stack: '总量',
				barWidth: 30,
				itemStyle: {
					normal: {
						//barBorderRadius: 6
					},
					emphasis: {
						//barBorderRadius: 6
					}
				},
				data: parm.series[i]
			};
			seriesData.push(baseData);
		}
		var option = {
			color: ["#4bacff", "#f8b551", "#eb6877"],
			tooltip: {
				backgroundColor: 'rgba(0,0,0,0.9)',
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'none' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				x: "center",
				y: "top",
				padding: [20, 0, 0, 0],
				textStyle: {
					color: "#99a3b7",
					fontSize: 12,
					fontFamily: '微软雅黑'
				},
				data: parm.legend
			},
			grid: {
				left: '8%',
				right: '8%',
				bottom: '8%'
			},
			xAxis: [{
				type: 'category',
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
				data: parm.yAxis
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
                axisTick:{
                    show:false
                },
				splitLine: {
					lineStyle: {
						width: 2,
						color: '#181a29'
					}
				}
			}],
			series: seriesData
		};
		doubleLineChart.setOption(option);
	},
	negativeBar: function(parm) {
		var negativeBarChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(negativeBarChart);
		var seriesData = [];
		for (var i = 0; i < parm.series.length; i++) {
			var _baseSeries = {
				name: parm.legend[i],
				type: 'bar',
				barWidth: 10,
				itemStyle: {
					normal: {
						//barBorderRadius: 6
					},
					emphasis: {
						//barBorderRadius: 6
					}
				},
				label: {
					normal: {
						show: true,
						position: 'insideBottom'
					}
				},
				data: parm.series[i]
			}
			seriesData.push(_baseSeries);
		}
		var option = {
			color: ["#f19149", "#4b70fe", "#eb6877"],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				padding: [20, 0, 0, 0],
				data: parm.legend,
				textStyle: {
					color: "#99a3b7",
					fontSize: 12,
					fontFamily: '微软雅黑'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'value',
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ccc'
					}
				},
			}],
			yAxis: [{
				type: 'category',
				axisTick: {
					show: false
				},
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				splitLine: {
					lineStyle: {
						width: 2,
						color: '#181a29'
					}
				},
				data: parm.yAxis
			}],
			series: seriesData
		};

		negativeBarChart.setOption(option);
	},
	doublePie: function(parm) {
		var doubleLineChart = echarts.init(document.getElementById(parm.id));
		ECHART_ROOM.push(doubleLineChart);
		if(parm.series){
			var option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					x: 'center',
					y: 'bottom',
					data: parm.legend,
					padding: [0, 0, 10, 0],
					itemWidth: 10,
					itemHeight: 10,
					textStyle: {
						color: "#99a3b7",
						fontSize: 12,
						fontFamily: '微软雅黑'
					}
				},
				series: [{
						name: parm.name,
						type: 'pie',
						center:[($(window).width()>=1600)?'50%':'57%','50%'],
						selectedMode: 'single',
						radius: [0, '30%'],
						label: {
							normal: {
								show:false
								//position: 'inner'
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						color: ['#4bacff', '#f26b57', '#ffdb03'], //蓝色 //橙色//黄色
						data: parm.series[0]
					}, {
						name: parm.name,
						type: 'pie',
						center:[($(window).width()>=1600)?'50%':'57%','50%'],
						labelLine:{
							normal:{
								length:($(window).width()>=1600)?10:6,
								length2:($(window).width()>=1600)?6:3
							}
						},
						radius: ['40%', '55%'],
						color: [
							'#3c8acc',
							'#da614e', '#c25646',
							'#ffdb03', '#e6c603', '#d1b614', '#c3ad17', '#b7a110', '3a28e08', '#93810a', '#7e6f0d'
						],
						data: parm.series[1]
					}
					/*{, '#3c8acc', '#2d6799', '#265680', '#1d4d78', '#14436e',

						name: parm.name,
						type: 'pie',
						radius: ['60%', '75%'],
						color: ['#e6c603','#ffdb03','#4bacff',  '#da614e', '#f26b57', '#3c8acc'],
						data: parm.series[2]
					}*/
				]
			};
			doubleLineChart.setOption(option);
		}
	}
}