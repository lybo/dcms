import Login from '../components/Login'
import { connect } from 'react-redux'
import { fetchLogin } from '../actions/user'

export default connect(
    (state) => {
        return {
            request: state.requests.login 
        };
    },
    (dispatch) => {
        return {
            onSubmit: (email, password, success, fail) => {
                dispatch(fetchLogin(email, password, success, fail));
            }
        }
    }
)(Login); 


