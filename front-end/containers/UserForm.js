import SectionUserForm from '../components/SectionUserForm/'
import { connect } from 'react-redux'
import { fetchLogout, fetchPopulateUsers, fetchAddUser, fetchUpdateUser } from '../actions/user'

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
)(SectionUserForm);
