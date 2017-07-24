import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/user'

const requestName = 'user';

//POPULATE_USERS
export function requestPopulateUsers(success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.getUsers()
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.populateUsers(data));

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

//ADD_USER
export function requestAddUser(user, success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.addUser(user)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.addUser(data));

                    success && success();
                }
            })
            .catch((error) => {
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.errors, requestName));
                fail && fail();
            });
    }
}

//EDIT_USER
export function requestUpdateUser(user, success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.updateUser(user)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.updateUser(data));

                    success && success();
                }
            })
            .catch((error) => {
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.errors, requestName));
                fail && fail();
            });
    }
}

//DELETE_USER
export function requestDeleteUser(userId, success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.deleteUser(userId)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.deleteUser(userId));

                    success && success();
                }
            })
            .catch((error) => {
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.errors, requestName));
                fail && fail();
            });
    }
}
