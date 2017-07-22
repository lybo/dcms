import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/page'

const requestName = 'page';

//POPULATE_PAGES
export function populatePages(success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.getPages()
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.populatePages(data));

                    success && success(data.id);
                }
            })
            .catch((error) => {
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.message, requestName));
                fail && fail();
            });
    }
}

//ADD_PAGE
export function addPage(page, success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.addPage(page)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.addPage(data));

                    success && success(data.id);
                }
            })
            .catch((error) => {
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.message, requestName));
                fail && fail();
            });
    }
}

//EDIT_PAGE
export function updatePage(page, success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.updatePage(page)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.updatePage(data));

                    success && success(data.id);
                }
            })
            .catch((error) => {
                dispatch(requests.newRequest(false, requestName));
                dispatch(requests.setErrorMessage(error.errors, requestName));
                fail && fail();
            });
    }
}

//DELETE_PAGE
export function deletePage(pageId, success, fail) {
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.deletePage(pageId)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(actions.deletePage(pageId));

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
