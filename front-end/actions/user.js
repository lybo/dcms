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

//POPULATE_USERS
export function populateUsers(data) {
    return {
        type: types.POPULATE_USERS,
        payload: data
    }
}


//ADD_USER
export function addUser(data) {
    return {
        type: types.ADD_USER,
        payload: data
    }
}


//EDIT_USER
export function updateUser(data) {
    return {
        type: types.EDIT_USER,
        payload: data
    }
}

//DELETE_USER
export function deleteUser(data) {
    return {
        type: types.DELETE_USER,
        payload: data
    }
}
