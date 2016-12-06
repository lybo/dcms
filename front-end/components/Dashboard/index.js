import React, { Component, PropTypes } from 'react'
import PageLayout from '../PageLayout/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onClickLogout, auth_user } = this.props;
        return (
            <PageLayout onClickLogout={onClickLogout} auth_user={auth_user} >
                <div className="panel panel-default">
                    <div className="panel-heading">{'Dashboard'}</div>
                    <div className="panel-body">
                        {'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                    </div>
                </div>
            </PageLayout>
        );
    }
}

export default Dashboard;

