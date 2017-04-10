import React from 'react';

/*查看详情按钮*/
class DetBtn extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DetBtn';
    }
    detPop(){
        let {setFullScreen} = this.props;
        setFullScreen('line');
    }
    render() {
        return <div className='det-btn' onClick={this.detPop.bind(this)}>How to use</div>;
    }
}

export default DetBtn;
