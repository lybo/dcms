import * as types from '../constants/ActionTypes'

export function newRequest(payload, namespace) {
    return {
        type: types.SET_STATUS_REQUEST,
        namespace,
        payload
    };
}

export function setErrorMessage(payload, namespace) {
    return {
        type: types.SET_ERROR_REQUEST,
        namespace,
        payload
    };
}


