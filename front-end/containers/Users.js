import Users from '../components/Users/'
import { connect } from 'react-redux'
import { fetchLogout,  fetchPopulateUsers, fetchDeleteUser } from '../actions/user'
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
                dispatch(fetchPopulateUsers());
            },
            onDelete: (userId) => {
                dispatch(fetchDeleteUser(userId));
            },
            onClickLogout: () => {
                dispatch(fetchLogout());
            }
        }
    }
)(Users);
