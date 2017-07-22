import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/user'

//LOGOUT
export function logout() {
    const requestName = 'logout';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.logout()
            .then(() => {
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
export function login(email, password, success, fail) {
    const requestName = 'login';
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

//POPULATE_USERS
export function populateUsers(success, fail) {
    const requestName = 'login';
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
export function addUser(user, success, fail) {
    const requestName = 'user';
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
export function updateUser(user, success, fail) {
    const requestName = 'user';
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
export function deleteUser(userId, success, fail) {
    const requestName = 'user';
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
