/**
 * Actions for template.
 * @module actions/template
 */

import * as types from '../constants/ActionTypes'
import * as api from '../services/index'
import * as requests from './requests'


//-----------ADD_TEMPLATE
export function receiveAddTemplate(data) {
    return {
        type: types.ADD_TEMPLATE,
        payload: data
    }   
}

export function fetchAddTemplate(template, success, fail) {
    const requestName = 'login';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.addTemplate(template)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveAddTemplate(data)); 

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


//-----------POPULATE_TEMPLATES
export function receivePopulateTemplates(data) {
    return {
        type: types.POPULATE_TEMPLATES,
        payload: data
    }   
}

export function fetchPopulateTemplates(success, fail) {
    const requestName = 'login';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.getTemplates()
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receivePopulateTemplates(data)); 

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


//-----------EDIT_TEMPLATE
export function receiveUpdateTemplate(data) {
    return {
        type: types.EDIT_TEMPLATE,
        payload: data
    }   
}

export function fetchUpdateTemplate(template, success, fail) {
    const requestName = 'template';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.updateTemplate(template)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveUpdateTemplate(data)); 

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

//-----------DELETE_TEMPLATE
export function receiveDeleteTemplate(data) {
    return {
        type: types.DELETE_TEMPLATE,
        payload: data
    }   
}

export function fetchDeleteTemplate(templateId, success, fail) {
    const requestName = 'template';
    return dispatch => {
        dispatch(requests.newRequest(true, requestName));
        api.deleteTemplate(templateId)
            .then((data) => {
                dispatch(requests.newRequest(false, requestName));
                if (data.error) {
                    dispatch(requests.setErrorMessage(data.error, requestName));
                    fail && fail();
                } else {
                    dispatch(requests.setErrorMessage('', requestName));
                    dispatch(receiveDeleteTemplate(templateId)); 

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
