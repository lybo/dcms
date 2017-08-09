import React, { Component, PropTypes } from 'react'
import PageLayout from '../PageLayout'
import Link from '../Link/'
import { USER_ROLE } from '../../constants/Generic'
import { redirect } from 'redux-router-director'
import '!style!css!less!./style.less'

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }

    }

    componentDidMount() {
        const { onLoadUsers } = this.props;
        onLoadUsers();
    }

    onDelete(userId) {
        return (evt) => {
            evt.preventDefault();
            if (userId) {
                const { users } = this.props;
                this.setState({
                    user: users.find((userItem) => userId === userItem.id)
                });
                $('#confirm').modal('show');
            }
        }
    }

    deleteUser() {

        return (evt) => {
            evt.preventDefault();
            $('#confirm').modal('hide');
            const { onDelete } = this.props;
            onDelete && onDelete(this.state.user.id);
            this.setState({
                user: null
            });
        }
    }

    render() {
        const { cmsName,
            router,
            onClickLogout,
            auth_user,
            users,
            mainPages,
        } = this.props;
        let selectedUser = this.state.user;
        selectedUser = selectedUser ? selectedUser : {
            id: 0,
            email: ''
        };

        return (
            <PageLayout
                cmsName={cmsName}
                router={router}
                onClickLogout={onClickLogout}
                auth_user={auth_user}
                mainPages={mainPages}
            >
                <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="confirm">
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">{`Confirm to delete`}</h4>
                            </div>
                            <div className="modal-body">
                                {`You sure that you want to delete user with email ${selectedUser.email}  ?`}
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.deleteUser()} type="button" className="btn btn-default" data-dismiss="modal">Delete</button>
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container list-wrapper">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <span className="glyphicon glyphicon-list"></span>
                                    <span>Users</span>
                                    <div className="pull-right action-buttons">
                                        <div className="btn-group pull-right">
                                            <Link url={'users/0'} className="btn btn-default btn-xs">
                                                <span className="glyphicon glyphicon-plus"></span>
                                                <span>Add New User</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <ul className="list-group">

                                        {users
                                            .filter((user) => {
                                                const authPriority = USER_ROLE.indexOf(auth_user.role);
                                                const userPriority = USER_ROLE.indexOf(user.role);
                                                return authPriority - userPriority <= 0;
                                            })
                                            .map((user) => {
                                                return (
                                                    <li className="list-group-item" key={user.id}>
                                                        <span className="list-wrapper__name">{user.email}</span>
                                                        <small className="small list-wrapper__role">{user.role}</small>
                                                        <div className="pull-right action-buttons">
                                                            <Link url={`/users/${user.id}`}><span className="glyphicon glyphicon-pencil"></span></Link>
                                                            <a href="#" className="trash" onClick={this.onDelete(user.id)}><span className="glyphicon glyphicon-trash"></span></a>
                                                        </div>
                                                    </li>
                                                );
                                        })}

                                    </ul>
                                </div>
                                <div className="panel-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>Total Count <span className="label label-info">{users.length}</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </PageLayout>
        );
    }
}



                                                    // <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                                    //     <span className="glyphicon glyphicon-cog"></span>
                                                    // </button>
                                                    // <ul className="dropdown-menu slidedown">
                                                    //     <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-pencil"></span>Edit</a></li>
                                                    //     <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-trash"></span>Delete</a></li>
                                                    // </ul>

export default Users;
