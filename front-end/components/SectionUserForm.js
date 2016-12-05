import React, { Component, PropTypes } from 'react'
import PageLayout from './PageLayout'
import UserForm from './UserForm'
import Spinner from './Spinner'
import { redirect } from 'redux-router-director'
import '!style!css!less!./SectionUserForm.less'

class SectionUserForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { router, onClickLogout, auth_user, user, request, onAddUser, onUpdateUser } = this.props;

        const isNewUser = user.id === '0';

        return (
            <PageLayout router={router} onClickLogout={onClickLogout} auth_user={auth_user} >
                <UserForm user={user}
                    onAddUser={onAddUser}
                    onUpdateUser={onUpdateUser}
                    request={request}
                    editRole={auth_user.role === 'super_admin'}
                    editPassword={isNewUser}
                    />
            </PageLayout>
         );
    }
}

export default SectionUserForm;
