import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/user'

const requestName = 'auth';

//LOGOUT
export function requestLogout() {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.logout()
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.logout());
                }
            })
            .catch((error) => {
                dispatch(actions.logout());
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.message, requestName));
            });
    }
}

//LOGIN
export function requestLogin(email, password, success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.login(email, password)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.login(data));

                    success && success();
                }
            })
            .catch((error) => {
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.message, requestName));
                fail && fail();
            });
    }
}
