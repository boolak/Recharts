/*放大后的配置*/
const xColor = '#5F7292'
const yColor = xColor;
const textColor = '#B3B3B3';
const fontSize = 12;

const Theme = {
    fontSize:fontSize,
    legend:{
        textStyle:{
            color:textColor,
            fontSize:fontSize
        }
    },
    title:{
        textStyle:{
            fontSize:14,
            color:'#fff',
            fontWeight:'normal'
        },
        padding:17
    },
    series:{
        label:{
            textStyle:{
                fontSize:fontSize
            }
        }
    },
    yAxis:{
        axisLine:{
            show:true,
            lineStyle:{
                color:yColor,
                width:1,
                type:'solid'
            }
        },
        axisLabel:{
            textStyle:{
                color:textColor,
                fontSize:fontSize
            }
        },
        axisTick:{
            show:false,
        },
        splitLine:{
            show:false
        },
        nameTextStyle:{
            color:textColor,
            fontSize:fontSize
        }
    },
    xAxis:{
        axisLine:{
            show:true,
            lineStyle:{
                color:xColor,
                width:1,
                type:'solid'
            }
        },
        axisLabel:{
            textStyle:{
                color:textColor,
                fontSize:fontSize
            }
        },
        axisTick:{
            show:false,
        },
        splitLine:{
            show:false
        },
        nameTextStyle:{
            color:textColor,
            fontSize:fontSize
        }
    }
}

export default Theme;