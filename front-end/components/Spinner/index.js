import React, { Component, PropTypes } from 'react'
import '!style!css!less!./style.less'

class Spinner extends Component {
    render() {
        return (
            <div className="spinner-wrapper">
                <div className="spinner"></div>
            </div>
        );
    }
}

export default Spinner;

