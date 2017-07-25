import React, { Component, PropTypes } from 'react'
import Link from '../Link/'
import Spinner from '../Spinner/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'

class Login extends React.Component {
    constructor(props) {
        super(props);

        const { request } = this.props;

        this.emailValue = '';
        this.requestNumber = request.counter;
    }

    componentDidMount() {
        this.email && this.email.focus();
    }

    componentWillReceiveProps(nextProps) {
        const { request } = nextProps;
        this.onSubmitResponseHandler(request);
    }

    onSubmitResponseHandler(request) {
        const isDiffRequestNumber = this.isDiffRequestNumber(request.counter);

        if (isDiffRequestNumber && !request.status) {
            redirect(window.urlAttempt || '/dashboard');
        } else if (isDiffRequestNumber) {
            this.email.value = this.emailValue;
            this.password.value = '';
        }
    }

    isDiffRequestNumber(requestCounter) {
        return requestCounter !== this.requestNumber
    }

    onSubmit() {
        const { onSubmit } = this.props;

        return (evt) => {
            const { request, onSubmit } = this.props;
            evt.preventDefault();

            //cach the email value
            this.emailValue = this.email.value;

            onSubmit(
                this.email.value,
                this.password.value,
            );
        };
    }

    render() {
        const { request } = this.props;

        return !request.status ? (
            <div className="container login" >
                <div className="col-md-12">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Log In</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form" onSubmit={this.onSubmit()}>

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


