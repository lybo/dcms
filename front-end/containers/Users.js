import Users from '../components/Users/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulateUsers, requestDeleteUser } from '../actions/user'
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
                dispatch(requestPopulateUsers());
            },
            onDelete: (userId) => {
                dispatch(requestDeleteUser(userId));
            },
            onClickLogout: () => {
                dispatch(requestLogout());
            }
        }
    }
)(Users);
