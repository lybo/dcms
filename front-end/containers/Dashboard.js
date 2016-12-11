import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/user'
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
                dispatch(fetchLogout());
            }
        }
    }
)(Dashboard);
