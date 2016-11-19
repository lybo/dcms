import React, { Component, PropTypes } from 'react'
import Link from './Link'
import { redirect } from 'redux-router-director'
import '!style!css!less!./Login.less'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(function () {
            $('.navbar-toggle-sidebar').click(function () {
                $('.navbar-nav').toggleClass('slide-in');
                $('.side-body').toggleClass('body-slide-in');
            });
        });
    }

    render() {
        const { onClickLogout, user } = this.props;
        const _onClickLogout = () => {
            onClickLogout();
            redirect('/login');
        }
      
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle navbar-toggle-sidebar collapsed">
                            MENU
                        </button>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link url={'/dashboard'} className="navbar-brand"> Smokestack TV - admin </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="">
                                <Link url={'/dashboard'} className="navbar-brand"> {`Welcome ${user.email}`} </Link>
                            </li>
                            <li className="dropdown ">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    Account
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li className="dropdown-header">SETTINGS</li>
                                    <li className="">
                                        <Link url={'/dashboard'} > Administrator </Link>
                                    </li>
                                    <li className="">
                                        <Link url={'/dashboard'} > Administrator </Link>
                                    </li>
                                    <li className="">
                                        <Link url={'/dashboard'} > Administrator </Link>
                                    </li>
                                    <li className="divider"></li>
                                    <li><Link url={'/logout'} onClick={_onClickLogout}>Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
