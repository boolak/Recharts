//require('./demo.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

/*import MainPageComponent from './MainPageComponent.jsx';
import EchartsComponent from './EchartsComponent.jsx';*/
import Simple from './simple.jsx';
import Line from './Line.jsx';
import Bar from './Bar.jsx';
import Pie from './Pie.jsx';
import LineBar from './LineBar.jsx';
import BarStack from './BarStack.jsx';
import LineBarPie from './LineBarPie.jsx';
import BarGroup from './BarGroup.jsx';


ReactDOM.render(
  <Simple/>,
  document.querySelector('#wrapper')
);


//Line
const lineParm = {
	legend:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
	xAxis:['周一','周二','周三','周四','周五','周六','周日'],
	series:[
		[120, 132, 101, 134, 90, 230, 210],
		[220, 182, 191, 234, 290, 330, 310],
		[150, 232, 201, 154, 190, 330, 410],
		[320, 332, 301, 334, 390, 330, 320],
		[820, 932, 901, 934, 1290, 1330, 1320]
	]
}
ReactDOM.render(
  <Line parms={lineParm}/>,
  document.querySelector('#line')
);


//Bar
const barParm = {
	legend:['金融'],
	xAxis:['全国','贵阳省','贵阳市','昆明市','成都市','南宁市'],
	series:[
		[52, 200, 134, 390, 330, 220]
	],
	show:true,
	color:['#ddf']
}
ReactDOM.render(
  <Bar parms={barParm}/>,
  document.querySelector('#bar')
);


//pie
const pieParm = {
	legend:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
	series:[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
    ]
}
ReactDOM.render(
  <Pie parms={pieParm}/>,
  document.querySelector('#pie')
);


//linebar
const lineBar = {
	legend:['全国各季GDP（亿元）','同比增长率','贵阳各季GDP（亿元）','贵阳同比增长率'],
	type:['bar','line'],
	yAxis:['各季GDP（亿元）','同比增长率'],
	xAxis:['2015Q1','2015Q2','2015Q3','2015Q4','2016Q1','2016Q2','2016Q3','2016Q4'],
	series:[
        [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
        [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4],
        [20.0, 41.9, 17.0, 23.2, 25.6, 76.7, 135.6, 169.2],
        [21.0, 39.2, 20.3, 22.5, 20, 66.2, 125.3, 159.4],
    ],
    color:['#0066FF','#cd3']
}
ReactDOM.render(
  <LineBar parms={lineBar}/>,
  document.querySelector('#linebar')
);


//barstack
const barStack = {
	legend: ['贵州各季GDP（亿元）', '贵阳各季GDP（亿元）'],
	yAxis: ['2015Q1','2015Q2','2015Q3','2015Q4','2016Q1'],
	yCategory:true,
	series:[
		[320, 302, 301, 334, 390],
		[120, 132, 101, 134, 90]
	],
	color:['#66f','#cd3']
}
ReactDOM.render(
  <BarStack parms={barStack}/>,
  document.querySelector('#barstack')
);


//linebarpie
const linebarpie = {
	legend:['全国各季GDP（亿元）','同比增长率','贵阳各季GDP（亿元）','贵阳同比增长率'],
	type:['bar','line'],
	yAxis:['各季GDP（亿元）','同比增长率'],
	xAxis:['2015Q1','2015Q2','2015Q3','2015Q4','2016Q1','2016Q2','2016Q3','2016Q4'],
	series:[
        [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
        [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4],
        [12.0, 14.9, 17.0, 23.2, 25.6, 76.7, 135.6, 162.2],
        [12.0, 12.2, 13.3, 24.5, 26.3, 70.2, 130.3, 123.4]
    ],
    complate:[
    	{name:'全国完成目标',value:75},
    	{name:'贵阳完成目标',value:80}
    ],
    color:['#cd3','#da3']
}
ReactDOM.render(
  <LineBarPie parms={linebarpie}/>,
  document.querySelector('#linebarpie')
);


const bargroup = {
	legend:["大数据产业","旅游业","生物医药业","金融与咨询业"],
	xAxis:['全国','贵州省','贵阳市','昆明市','成都市','南宁市'],
	max:98,
	series:[
		[65, 98, 25,20,36, 28 ],
		[40, 95, 25,20,36, 28 ],
		[48, 50, 25,20,36, 28 ],
		[40, 50, 25,20,36, 28 ]
	]
}
//BarGroup
ReactDOM.render(
  <BarGroup parms={bargroup}/>,
  document.querySelector('#bargroup')
);