import React, { Component, PropTypes } from 'react'
import { redirect } from 'redux-router-director'

class Link extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const { onClick } = this.props;
        if (onClick) {
            onClick();
        } else {
            redirect(this.props.url);
        }
    }

    render() {
        const {url, className, children} = this.props;
        return (
            <a href={url} className={className} onClick={this.onClick}>{children}</a>
        );
    }
}

export default Link;


