import React, { Component, PropTypes } from 'react'
import PageLayout from '../PageLayout'
import UserForm from '../UserForm'
import Spinner from '../Spinner/'
import { redirect } from 'redux-router-director'
import { getAuthorizedUserRoles } from '../../utils'
import '!style!css!less!./style.less'

class SectionUserForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cmsName, router, onClickLogout, auth_user, user, request, onAddUser, onUpdateUser } = this.props;

        const isNewUser = user.id === '0';
        const authorizedUserRoles = getAuthorizedUserRoles(auth_user.role);

        return (
            <PageLayout cmsName={cmsName} router={router} onClickLogout={onClickLogout} auth_user={auth_user} >
                <UserForm user={user}
                    onAddUser={onAddUser}
                    onUpdateUser={onUpdateUser}
                    request={request}
                    editRole={['super_admin', 'admin'].indexOf(auth_user.role) !== -1 }
                    editPassword={isNewUser}
                    authorizedUserRoles={authorizedUserRoles}
                    />
            </PageLayout>
         );
    }
}

export default SectionUserForm;
