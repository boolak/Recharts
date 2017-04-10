import React from 'react';

/*测试  计算*/
class Js extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Js';
        this.state = {
            isAdd:false
        }
    }
    change(){
        const {jsFun} = this.props;
        jsFun({type:'add',value:this.state.isAdd?'red':'add'});
        this.setState({
            isAdd:!this.state.isAdd
        })
    }
    componentDidMount(){
    }
    render() {
        return <div>
            <button onClick={this.change.bind(this)}>change</button>
        </div>;
    }
}

export default Js;
    