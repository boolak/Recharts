import echarts from 'echarts';
import React from 'react';
import PropTypes from 'prop-types';
import elementResizeEvent from 'element-resize-event';

class ReactEcharts extends  React.Component {
    constructor(props){
        super(props);
    }
    // first add
    componentDidMount() {
        let echartObj = this.renderEchartDom();
        let onEvents = this.props.onEvents || [];

        for (let eventName in onEvents) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
                // binding event
                echartObj.on(eventName, function(param) {onEvents[eventName](param, echartObj);});
            }
        }
        // on chart ready
        if (typeof this.props.onChartReady === 'function') {this.props.onChartReady(echartObj);}

        // on resize
        elementResizeEvent(this.echartsDom, function() {
            echartObj.resize();
        });
    }
    // update
    componentDidUpdate() {
        this.renderEchartDom();
    }
    // remove
    componentWillUnmount() {
        echarts.dispose(this.echartsDom);
    }
    // render the dom
    renderEchartDom() {
        // init the echart object
        let echartObj = this.getEchartsInstance();
        // set the echart option
        echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
        // set loading mask
        if (this.props.showLoading) {echartObj.showLoading();}
        else {echartObj.hideLoading();}

        return echartObj;
    }
    getEchartsInstance() {
        // return the echart object
        return echarts.getInstanceByDom(this.echartsDom) || echarts.init(this.echartsDom, this.props.theme);
    }
    render() {
        let style = this.props.style || {height: '300px'};
        // for render
        return (
            <div ref={(ref)=>{this.echartsDom = ref;}}
                className={this.props.className}
                style={style} />
        );
    }
}
ReactEcharts.propTypes = {
    option: PropTypes.object.isRequired,
    notMerge: PropTypes.bool,
    lazyUpdate: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    theme: PropTypes.string,
    onChartReady: PropTypes.func,
    showLoading: PropTypes.bool,
    onEvents: PropTypes.object
};
module.exports = ReactEcharts;