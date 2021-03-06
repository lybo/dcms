import React, { Component, PropTypes } from 'react'
import Spinner from '../Spinner/'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'
import { USER_ROLE } from '../../constants/Generic'

const userRoleTranslation = {
    'super_admin': 'Super Admin',
    'admin': 'Admin',
    'manager': 'Manager',
};

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        const { request } = this.props;
        this.requestNumber = request.counter;
    }

    componentWillReceiveProps(nextProps) {
        const { request } = nextProps;
        if (request.counter !== this.requestNumber && !request.status) {
            redirect('/users');
        }
    }

    componentWillMount() {
        const { onLoadUsers } = this.props;
    }

    componentDidMount() {

    }

    onSave() {
        const { user, editRole, editPassword, onAddUser, onUpdateUser } = this.props;
        const isNewUser = user.id === '0';
        const onSave = !isNewUser ? onUpdateUser : onAddUser;
        return (evt) => {
            evt.preventDefault();

            let payload = {
                ...user,
                email: this.email.value,
            };

            if (editRole) {
                payload = {
                    ...payload,
                    role: this.role.value,
                };
            }

            if (editPassword) {
                payload = {
                    ...payload,
                    password: this.password.value,
                };
            }

            onSave(payload);
        };
    }

    render() {
        const { request, user, editRole, editPassword, authorizedUserRoles } = this.props;

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">User</h3>
                </div>
                <div className="panel-body">
                    <div className="form-area">
                        <form role="form" className="clearfix" onSubmit={this.onSave()}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                    <input ref="email" ref={(ref) => this.email = ref} defaultValue={user.email} type="text" className="form-control" id="email" name="email" placeholder="Email" />
                            </div>
                            {editPassword ? (
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                        <input ref="password" ref={(ref) => this.password = ref}  type="password" className="form-control" id="password" name="password" placeholder="Password" />
                                </div>
                            ) : (
                                ''
                            )}
                            {editRole ? (
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select ref="role" ref={(ref) => this.role = ref} defaultValue={user.role} className="form-control" id="role">
                                        <option value="">Select role</option>
                                        {authorizedUserRoles.map(userRole => {
                                            return (
                                                <option key={userRole} value={userRole}>{userRoleTranslation[userRole]}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            ) : (
                                ''
                            )}
                            {request.error ? (
                                <div className="alert alert-danger">
                                    { 'Some fields are required' }
                                </div>
                            ) : ( '' )}
                            <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Save</button>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}

export default UserForm;
