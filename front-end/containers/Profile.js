import SectionProfile from '../components/SectionProfile/'
import { connect } from 'react-redux'
import { fetchLogout, fetchPopulateUsers, fetchAddUser, fetchUpdateUser } from '../actions/user'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            users: state.users,
            request: state.requests.user
        };
    },
    (dispatch) => {
        return {
            onLoadUsers: () => {
                dispatch(fetchPopulateUsers());
            },
            onClickLogout: () => {
                dispatch(fetchLogout());
            },
            onAddUser: (user, success, fail) => {
                dispatch(fetchAddUser(user, success, fail));
            },
            onUpdateUser: (user, success, fail) => {
                dispatch(fetchUpdateUser(user, success, fail));
            }
        }
    }
)(SectionProfile);
