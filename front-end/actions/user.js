/**
 * Actions for user.
 * @module actions/user
 */

import * as types from '../constants/ActionTypes'
import * as api from '../services/index'
import * as requests from './requests'

//-----------LOGOUT
export function receiveLogout() {
    return {
        type: types.LOGOUT,
        payload: {}
    }
}

export function fetchLogout() {
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
                    dispatch(receiveLogout());
                }
            })
            .catch((error) => {
                dispatch(receiveLogout());
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.message, requestName));
            });
    }
}

//-----------LOGIN
export function receiveLogin(data) {
    return {
        type: types.LOGIN,
        payload: data
    }
}

export function fetchLogin(email, password, success, fail) {
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
                    dispatch(receiveLogin(data));

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

//-----------ADD_USER
export function receiveAddUser(data) {
    return {
        type: types.ADD_USER,
        payload: data
    }
}

export function fetchAddUser(email, password, role, success, fail) {
    const requestName = 'login';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.addUser(email, password, role)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveAddUser(data));

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


//-----------POPULATE_USERS
export function receivePopulateUsers(data) {
    return {
        type: types.POPULATE_USERS,
        payload: data
    }
}

export function fetchPopulateUsers(success, fail) {
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
                    dispatch(receivePopulateUsers(data));

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

//-----------ADD_USER
export function receiveAddUser(data) {
    return {
        type: types.ADD_USER,
        payload: data
    }
}

export function fetchAddUser(user, success, fail) {
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
                    dispatch(receiveAddUser(data));

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

//-----------EDIT_USER
export function receiveUpdateUser(data) {
    return {
        type: types.EDIT_USER,
        payload: data
    }
}

export function fetchUpdateUser(user, success, fail) {
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
                    dispatch(receiveUpdateUser(data));

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

//-----------DELETE_USER
export function receiveDeleteUser(data) {
    return {
        type: types.DELETE_USER,
        payload: data
    }
}

export function fetchDeleteUser(userId, success, fail) {
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
                    dispatch(receiveDeleteUser(userId));

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
