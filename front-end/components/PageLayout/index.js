import React, { Component, PropTypes } from 'react'
import Link from '../Link/'
import Header from '../Header/'
import Sidemenu from '../Sidemenu/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'

class PageLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cmsName, router, onClickLogout, auth_user, page, request, children, mainPages } = this.props;

        return (
            <div>
                <Header onClickLogout={onClickLogout} user={auth_user} logo={cmsName} />
                <div className="container-fluid main-container">
                    <Sidemenu router={router} auth_user={auth_user} mainPages={mainPages}/>
                    <div className="col-md-10 content">

                        {children}

                    </div>
                    <footer className="pull-left footer">
                        <div className="col-md-12">
                            <hr className="divider" /> {'Copyleft © 2015 '}
                            <Link url={ 'http://'}>{cmsName}</Link>
                        </div>
                    </footer>
                </div>
            </div>
         );
    }
}

export default PageLayout;
