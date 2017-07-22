import Users from '../components/Users/'
import { connect } from 'react-redux'
import { logout,  populateUsers, deleteUser } from '../epics/user'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            users: state.users || [],
            cmsName: PAGE_TITLE,
        };
    },
    (dispatch) => {
        return {
            onLoadUsers: () => {
                dispatch(populateUsers());
            },
            onDelete: (userId) => {
                dispatch(deleteUser(userId));
            },
            onClickLogout: () => {
                dispatch(logout());
            }
        }
    }
)(Users);
