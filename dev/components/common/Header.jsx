import React from 'react';
import './style.scss';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
    render() {
        return <div className='header'>
          <h3>react-echarts</h3>
        </div>;
    }
}

export default Header;
