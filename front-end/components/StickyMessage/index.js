import React, { Component, PropTypes } from 'react'
import '!style!css!less!./style.less'

class StickyMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div className="affix-message alert alert-success affix affix-top" data-spy="affix" data-offset-top="0" data-offset-bottom="50">
                {children}
            </div>
        );
    }
}

export default StickyMessage;
