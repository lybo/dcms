/**
 * Actions for page.
 * @module actions/page
 */

import * as types from '../constants/ActionTypes'
import * as api from '../services/index'
import * as requests from './requests'


//-----------ADD_PAGE
export function receiveAddPage(data) {
    return {
        type: types.ADD_PAGE,
        payload: data
    }   
}

export function fetchAddPage(page, success, fail) {
    const requestName = 'page';
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
                    dispatch(receiveAddPage(data)); 

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


//-----------POPULATE_PAGES
export function receivePopulatePages(data) {
    return {
        type: types.POPULATE_PAGES,
        payload: data
    }   
}

export function fetchPopulatePages(success, fail) {
    const requestName = 'page';
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
                    dispatch(receivePopulatePages(data)); 

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


//-----------EDIT_PAGE
export function receiveUpdatePage(data) {
    return {
        type: types.EDIT_PAGE,
        payload: data
    }   
}

export function fetchUpdatePage(page, success, fail) {
    const requestName = 'page';
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
                    dispatch(receiveUpdatePage(data)); 

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

//-----------DELETE_PAGE
export function receiveDeletePage(data) {
    return {
        type: types.DELETE_PAGE,
        payload: data
    }   
}

export function fetchDeletePage(pageId, success, fail) {
    const requestName = 'page';
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
                    dispatch(receiveDeletePage(pageId)); 

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
