import React, { Component, PropTypes } from 'react'
import PageLayout from './PageLayout'
import Spinner from './Spinner'
import { redirect } from 'redux-router-director'
import '!style!css!less!./Users.less'

class UserForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { onLoadUsers } = this.props;
    }

    componentDidMount() {
        
    }

    onSave() {
        const { user, onAddUser, onUpdateUser } = this.props;
        const onSave = user.id !== '0' ? onUpdateUser : onAddUser;
        return (evt) => {
            evt.preventDefault();

            onSave({
                    ...user,
                    email: this.email.value, 
                    password: '123456',
                    role: this.role.value,
                },
                () => {
                    redirect('/users');
                });
        };
    }

    render() {
        const { router, onClickLogout, auth_user, user, request } = this.props;

        const Form = !request.status ? (

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">User</h3>
                </div>
                <div className="panel-body">
                    <div className="form-area">  
                        <form role="form" className="clearfix" onSubmit={this.onSave()}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                {user.id !== '0' ? (
                                    <input ref="email" ref={(ref) => this.email = ref} defaultValue={user.email} type="text" className="form-control" id="email" name="email" placeholder="Email" readOnly/>
                                ) : (
                                    <input ref="email" ref={(ref) => this.email = ref} defaultValue={user.email} type="text" className="form-control" id="email" name="email" placeholder="Email" />
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select ref="role" ref={(ref) => this.role = ref} defaultValue={user.role} className="form-control" id="role">
                                    <option value="">Select role</option>
                                    <option value="super_admin">Super Administrator</option>
                                    <option value="admin">Administrator</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
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

        ) : (

            <div>
                <Spinner />
            </div>
        ); 

        
        return (
            <PageLayout router={router} onClickLogout={onClickLogout} auth_user={auth_user} >
                {Form}
            </PageLayout>        
         );
    }
}


                        // <div className="col-md-8">
                        //     <div className="form-area">  
                        //         <form role="form" className="clearfix">
                        //             <h3 className="text-left">User</h3>
                        //             <div className="form-group">
                        //                 <input type="text" className="form-control" id="name" name="name" placeholder="Name" />
                        //             </div>
                        //             <div className="form-group">
                        //                 <input type="text" className="form-control" id="email" name="email" placeholder="Email" />
                        //             </div>
                        //             <div className="form-group">
                        //                 <input type="text" className="form-control" id="mobile" name="mobile" placeholder="Mobile Number" />
                        //             </div>
                        //             <div className="form-group">
                        //                 <input type="text" className="form-control" id="subject" name="subject" placeholder="Subject" />
                        //             </div>
                        //             <div className="form-group">
                        //                 <textarea className="form-control" id="message" placeholder="Message" maxLength="140" rows="7"></textarea>
                        //                 <span className="help-block"><p id="characterLeft" className="help-block ">You have reached the limit</p></span>                    
                        //             </div>
                        //             
                        //             <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Submit Form</button>
                        //         </form>
                        //     </div>
                        // </div>

export default UserForm;
