import React from 'react';
//import { bindActionCreators } from 'redux';
//import { connect } from 'react-redux';
//import * as PopActionCreaters from '../../actions/PopAction'

class DetPop extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DetPop';
        this.state = {
            showFull:false,
            modName:''
        }
    }
    componentWillReceiveProps(nextProps){
        let chart = nextProps.modName.name;
        this.setState({
            showFull:true,
            modName:chart
        });
        this.loadTemp(chart);
    }
    loadTemp(chart){
        //console.log(this.state.modName);
        $.ajax({
            url: '/data/'+chart+'.html',
            type: 'GET',
            dataType: 'html',
            data: {},
            success:(res)=>{
                document.getElementById('coder').innerHTML = res;
            }
        })
    }
    close(){
        this.setState({
            showFull:false,
            modName:'',
            temp:''
        });
        document.getElementById('coder').innerHTML = '';
    }
    render() {
        let {showFull,modName} = this.state;
        return <div className={this.state.showFull?'det-pop show':'det-pop'}>
            <h3>This is a temple:</h3>
            <a onClick={this.close.bind(this)}>关闭</a>
            {/*<span>{modName}</span>*/}
            <div id='coder'>
                {this.state.temp}
            </div>
        </div>;
    }
}

export default DetPop;
/*//将state绑定到props
function mapStateToProps(state) {
    //console.log(state);
    return {
        modName: state.fullReduce.name
    }
}

//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(PopActionCreaters, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(DetPop)*/