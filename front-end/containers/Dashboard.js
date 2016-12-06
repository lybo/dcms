import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/user'

export default connect(
    (state) => {
        return {
            auth_user: state.auth_user
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
