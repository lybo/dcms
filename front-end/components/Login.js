import React, { Component, PropTypes } from 'react'
import Link from './Link'
import Spinner from './Spinner'
import { redirect } from 'redux-router-director'
import '!style!css!less!./Login.less'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.emailValue = '';
    }

    componentDidMount() {
        this.email && this.email.focus();
    }

    render() {
        const { request, onSubmit } = this.props;
        const _onSubmit = (evt) => {
            evt.preventDefault();

            this.emailValue = this.email.value;
            onSubmit(
                this.email.value, 
                this.password.value,
                () => {
                    this.email.value = '';
                    this.password.value = '';
                    redirect(window.urlAttempt || '/dashboard');
                }, 
                () => {
                    this.email.value = this.emailValue;
                    this.password.value = '';
                });
        }
      
        return !request.status ? (
            <div className="container login" >
                <div className="col-md-12">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Log In</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form" onSubmit={_onSubmit}>

                                <fieldset>
                                    <div className="form-group">
                                        <input ref="email" ref={(ref) => this.email = ref} className="form-control" placeholder="E-mail" name="email" type="email" />
                                    </div>
                                    <div className="form-group">
                                        <input ref="password" ref={(ref) => this.password = ref} className="form-control" placeholder="Password" name="password" type="password" />
                                    </div>
                                    {request.error !== '' ? (
                                        <div className="alert alert-danger">
                                            { request.error }
                                        </div>
                                    ) : ( '' )}
                                    <button type="submit" className="btn btn-sm btn-success">{'Log in'}</button>
                                </fieldset>

                            </form>
                        </div>
                    </div>
                </div>
            </div>        
        ) : (
            <div className="page-wrapper">
                <Spinner />
            </div>
        );
    }
}

export default Login;


