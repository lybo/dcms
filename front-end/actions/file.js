/**
 * Actions for file.
 * @module actions/file
 */

import * as types from '../constants/ActionTypes'
import * as api from '../services/index'
import * as requests from './requests'


//-----------ADD_FILE
export function receiveAddFile(data) {
    return {
        type: types.ADD_FILE,
        payload: data
    }   
}

export function fetchAddFile(email, password, role, success, fail) {
    const requestName = 'login';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.addFile(email, password, role)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveAddFile(data)); 

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


//-----------POPULATE_FILES
export function receivePopulateFiles(data) {
    return {
        type: types.POPULATE_FILES,
        payload: data
    }   
}

export function fetchPopulateFiles(success, fail) {
    const requestName = 'login';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.getFiles()
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receivePopulateFiles(data)); 

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

//-----------ADD_FILE
export function receiveAddFile(data) {
    return {
        type: types.ADD_FILE,
        payload: data
    }   
}

export function fetchAddFile(file, success, fail) {
    const requestName = 'file';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.addFile(file)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveAddFile(data)); 

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

//-----------EDIT_FILE
export function receiveUpdateFile(data) {
    return {
        type: types.EDIT_FILE,
        payload: data
    }   
}

export function fetchUpdateFile(file, success, fail) {
    const requestName = 'file';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.updateFile(file)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveUpdateFile(data)); 

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

//-----------DELETE_FILE
export function receiveDeleteFile(data) {
    return {
        type: types.DELETE_FILE,
        payload: data
    }   
}

export function fetchDeleteFile(fileId, success, fail) {
    const requestName = 'file';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.deleteFile(fileId)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveDeleteFile(fileId)); 

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

