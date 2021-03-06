import SectionProfile from '../components/SectionProfile/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulateUsers, requestAddUser, requestUpdateUser } from '../epics/user'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            users: state.users,
            request: state.requests.user,
            cmsName: PAGE_TITLE,
            mainPages: state.pages.mainNodeIds.map(id => state.pages.byId[id]),
        };
    },
    (dispatch) => {
        return {
            onLoadUsers: () => {
                dispatch(requestPopulateUsers());
            },
            onClickLogout: () => {
                dispatch(requestLogout());
            },
            onAddUser: (user, success, fail) => {
                dispatch(requestAddUser(user, success, fail));
            },
            onUpdateUser: (user, success, fail) => {
                dispatch(requestUpdateUser(user, success, fail));
            }
        }
    }
)(SectionProfile);
