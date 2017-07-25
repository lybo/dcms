/**
 * Actions for template.
 * @module actions/template
 */

import * as types from '../constants/ActionTypes'


//ADD_TEMPLATE
export function addTemplate(data) {
    return {
        type: types.ADD_TEMPLATE,
        payload: data
    }
}

//POPULATE_TEMPLATES
export function populateTemplates(data) {
    return {
        type: types.POPULATE_TEMPLATES,
        payload: data
    }
}

//EDIT_TEMPLATE
export function updateTemplate(data) {
    return {
        type: types.EDIT_TEMPLATE,
        payload: data
    }
}

//DELETE_TEMPLATE
export function deleteTemplate(data) {
    return {
        type: types.DELETE_TEMPLATE,
        payload: data
    }
}

//REQUEST_ADD_TEMPLATE
export function requestAddTemplate(data) {
    return {
        type: types.REQUEST_ADD_TEMPLATE,
        payload: data
    }
}

//REQUEST_POPULATE_TEMPLATES
export function requestPopulateTemplates(data) {
    return {
        type: types.REQUEST_POPULATE_TEMPLATES,
        payload: data
    }
}

//REQUEST_EDIT_TEMPLATE
export function requestUpdateTemplate(data) {
    return {
        type: types.REQUEST_EDIT_TEMPLATE,
        payload: data
    }
}

//REQUEST_DELETE_TEMPLATE
export function requestDeleteTemplate(data) {
    return {
        type: types.REQUEST_DELETE_TEMPLATE,
        payload: data
    }
}
