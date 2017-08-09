import React, { Component, PropTypes } from 'react'
import Link from '../Link/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'

class Sidemenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onLogout, router, auth_user, mainPages } = this.props;
        const pattern = router && router.pattern ? router.pattern : '/';
        const pageId = router && router.params.pageId ? router.params.pageId : null;

        return (
            <div className="col-md-2 sidebar">
                    <div className="row">
                        <div className="absolute-wrapper"> </div>
                        <div className="side-menu">
                            <nav className="navbar navbar-default" role="navigation">
                                <div className="side-menu-container">
                                    <ul className="nav navbar-nav">
                                        <li className={pattern === '/' || pattern === '' ? 'active' : ''}><a href="#/"><span className="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>
                                        {['super_admin', 'admin'].indexOf(auth_user.role) !== -1 ? (
                                            <li className={pattern.indexOf('user') !== -1 ? 'active' : ''}><Link url={'/users'}><span className="glyphicon glyphicon-user"></span> <span>{'Users'}</span></Link></li>
                                        ) : (
                                            ''
                                        )}

                                        {['super_admin'].indexOf(auth_user.role) !== -1 ? (
                                            <li className={pattern.indexOf('template') !== -1 ? 'active' : ''}><Link url={'/templates'}><span className="glyphicon glyphicon-file"></span> <span>{'Templates'}</span></Link></li>
                                        ) : (
                                            ''
                                        )}
                                        <li className={pattern.indexOf('page') !== -1 ? 'active' : ''}><Link url={'/pages'}><span className="glyphicon glyphicon-file"></span> <span>{'Pages'}</span></Link></li>
                                        {mainPages.map(page => (
                                            <li key={`main-page-${page.id}`}
                                                className={pageId === page.id ? 'active' : ''}
                                            >
                                                <Link url={`/pages/${page.id}`}>
                                                    <span>* </span><span className="glyphicon glyphicon-file"></span> <span>{page.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="panel panel-default" id="dropdown">
                                            <a data-toggle="collapse" href="#dropdown-lvl1">
                                                <span className="glyphicon glyphicon-user"></span> Sub Level <span className="caret"></span>
                                            </a>
                                            <div id="dropdown-lvl1" className="panel-collapse collapse">
                                                <div className="panel-body">
                                                    <ul className="nav navbar-nav">
                                                        <li><Link url={''}>Link</Link></li>
                                                        <li><Link url={''}>Link</Link></li>
                                                        <li><Link url={''}>Link</Link></li>
                                                        <li className="panel panel-default" id="dropdown">
                                                            <a data-toggle="collapse" href="#dropdown-lvl2">
                                                                <span className="glyphicon glyphicon-off"></span> Sub Level <span className="caret"></span>
                                                            </a>
                                                            <div id="dropdown-lvl2" className="panel-collapse collapse">
                                                                <div className="panel-body">
                                                                    <ul className="nav navbar-nav">
                                                                        <li><Link url={''}>Link</Link></li>
                                                                        <li><Link url={''}>Link</Link></li>
                                                                        <li><Link url={''}>Link</Link></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Sidemenu;
