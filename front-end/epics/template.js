import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/template'

const requestName = 'template';

//ADD_TEMPLATE
export function requestAddTemplate(template, success, fail) {
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
                    dispatch(actions.addTemplate(data));

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

//POPULATE_TEMPLATES
export function requestPopulateTemplates(success, fail) {
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
                    dispatch(actions.populateTemplates(data));

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

//EDIT_TEMPLATE
export function requestUpdateTemplate(template, success, fail) {
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
                    dispatch(actions.updateTemplate(data));

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

//DELETE_TEMPLATE
export function requestDeleteTemplate(templateId, success, fail) {
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
                    dispatch(actions.deleteTemplate(templateId));

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
