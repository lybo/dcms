import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
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
                dispatch(requestLogout());
            }
        }
    }
)(Dashboard);
