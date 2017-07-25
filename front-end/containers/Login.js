import Login from '../components/Login/'
import { connect } from 'react-redux'
import { requestLogin } from '../actions/auth'

export default connect(
    (state) => {
        return {
            request: state.requests.auth
        };
    },
    (dispatch) => {
        return {
            onSubmit: (email, password) => {
                dispatch(requestLogin(email, password));
            }
        }
    }
)(Login);


