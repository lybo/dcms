import React, { Component, PropTypes } from 'react'
import Link from './Link'
import Header from './Header'
import Sidemenu from './Sidemenu'
import { redirect } from 'redux-router-director'
import '!style!css!less!./PageLayout.less'

class PageLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { router, onClickLogout, auth_user, page, request, children } = this.props;

        return (
            <div>
                <Header onClickLogout={onClickLogout} user={auth_user} />
                <div className="container-fluid main-container">
                    <Sidemenu router={router} auth_user={auth_user}/>
                    <div className="col-md-10 content">

                        {children}

                    </div>
                    <footer className="pull-left footer">
                        <div className="col-md-12">
                            <hr className="divider" /> {'Copyright © 2015 '}
                            <Link url={ 'http://www.smokestack.se'}>smokestack</Link>
                        </div>
                    </footer>
                </div>
            </div>        
         );
    }
}

export default PageLayout;
