import Login from '../components/Login/'
import { connect } from 'react-redux'
import { requestLogin } from '../epics/auth'

export default connect(
    (state) => {
        return {
            request: state.requests.auth
        };
    },
    (dispatch) => {
        return {
            onSubmit: (email, password, success, fail) => {
                dispatch(requestLogin(email, password, success, fail));
            }
        }
    }
)(Login);


