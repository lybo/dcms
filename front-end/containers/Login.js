import Login from '../components/Login/'
import { connect } from 'react-redux'
import { login } from '../epics/user'

export default connect(
    (state) => {
        return {
            request: state.requests.login
        };
    },
    (dispatch) => {
        return {
            onSubmit: (email, password, success, fail) => {
                dispatch(login(email, password, success, fail));
            }
        }
    }
)(Login);


