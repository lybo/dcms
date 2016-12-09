import React, { Component, PropTypes } from 'react'
import PageLayout from '../PageLayout/'
import UserForm from '../UserForm/'
import Spinner from '../Spinner/'
import { redirect } from 'redux-router-director'
import { getAuthorizedUserRoles } from '../../utils'
import '!style!css!less!./style.less'

class SectionProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { router, onClickLogout, auth_user, request, onAddUser, onUpdateUser } = this.props;
        const authorizedUserRoles = getAuthorizedUserRoles(auth_user.role);

        return (
            <PageLayout router={router} onClickLogout={onClickLogout} auth_user={auth_user} >
                <UserForm user={auth_user}
                    onAddUser={onAddUser}
                    onUpdateUser={onUpdateUser}
                    request={request}
                    editRole={false}
                    editPassword={true}
                    authorizedUserRoles={authorizedUserRoles}
                    />
            </PageLayout>
         );
    }
}

export default SectionProfile;
