import SectionUserForm from '../components/SectionUserForm/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulateUsers, requestAddUser, requestUpdateUser } from '../actions/user'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        const { userId } = state.router.params;
        const user = userId !== '0' ?
            state.users.find((userItem) => userItem.id === userId) :
            {
                id: '0',
                email: '',
                password: '',
                role: ''
            };

        return {
            router: state.router,
            auth_user: state.auth_user,
            users: state.users,
            user,
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
            onAddUser: (user) => {
                dispatch(requestAddUser(user));
            },
            onUpdateUser: (user) => {
                dispatch(requestUpdateUser(user));
            }
        }
    }
)(SectionUserForm);
