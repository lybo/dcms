import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { logout } from '../epics/user'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            auth_user: state.auth_user,
            cmsName: PAGE_TITLE,
        };
    },
    (dispatch) => {
        return {
            onClickLogout: () => {
                dispatch(logout());
            }
        }
    }
)(Dashboard);
