import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/file'

const requestName = 'file';

//POPULATE_FILES
export function populateFiles(success, fail) {
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
                    dispatch(actions.populateFiles(data));

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

//ADD_FILE
export function addFile(file, success, fail) {
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
                    dispatch(actions.addFile(data));

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

//EDIT_FILE
export function updateFile(file, success, fail) {
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
                    dispatch(actions.updateFile(data));

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

//DELETE_FILE
export function deleteFile(fileId, success, fail) {
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
                    dispatch(actions.deleteFile(fileId));

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
