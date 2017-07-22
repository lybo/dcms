import SectionProfile from '../components/SectionProfile/'
import { connect } from 'react-redux'
import { logout, populateUsers, addUser, updateUser } from '../epics/user'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            users: state.users,
            request: state.requests.user,
            cmsName: PAGE_TITLE,
        };
    },
    (dispatch) => {
        return {
            onLoadUsers: () => {
                dispatch(populateUsers());
            },
            onClickLogout: () => {
                dispatch(logout());
            },
            onAddUser: (user, success, fail) => {
                dispatch(addUser(user, success, fail));
            },
            onUpdateUser: (user, success, fail) => {
                dispatch(updateUser(user, success, fail));
            }
        }
    }
)(SectionProfile);
