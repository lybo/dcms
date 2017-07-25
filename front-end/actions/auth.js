/**
 * Actions for user.
 * @module actions/user
 */

import * as types from '../constants/ActionTypes'

//LOGOUT
export function logout() {
    return {
        type: types.LOGOUT,
        payload: {}
    }
}

//LOGIN
export function login(data) {
    return {
        type: types.LOGIN,
        payload: data
    }
}

//REQUEST_LOGOUT
export function requestLogout() {
    return {
        type: types.REQUEST_LOGOUT,
        payload: {}
    }
}

//REQUEST_LOGIN
export function requestLogin(username, password) {
    return {
        type: types.REQUEST_LOGIN,
        payload: {
            username,
            password,
        }
    }
}
