/**
 * Actions for user.
 * @module actions/user
 */

import * as types from '../constants/ActionTypes'

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

//REQUEST_ADD_USER
export function requestAddUser(data) {
    return {
        type: types.REQUEST_ADD_USER,
        payload: data
    }
}

//REQUEST_POPULATE_USERS
export function requestPopulateUsers(data) {
    return {
        type: types.REQUEST_POPULATE_USERS,
        payload: data
    }
}

//REQUEST_EDIT_USER
export function requestUpdateUser(data) {
    return {
        type: types.REQUEST_EDIT_USER,
        payload: data
    }
}

//REQUEST_DELETE_USER
export function requestDeleteUser(data) {
    return {
        type: types.REQUEST_DELETE_USER,
        payload: data
    }
}

