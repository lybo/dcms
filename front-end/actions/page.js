/**
 * Actions for page.
 * @module actions/page
 */

import * as types from '../constants/ActionTypes'


//POPULATE_PAGES
export function populatePages(data) {
    return {
        type: types.POPULATE_PAGES,
        payload: data
    }
}

//POPULATE_MAIN_PAGES
export function populateMainPages(data) {
    return {
        type: types.POPULATE_MAIN_PAGES,
        payload: data
    }
}

//ADD_PAGE
export function addPage(data) {
    return {
        type: types.ADD_PAGE,
        payload: data
    }
}

//EDIT_PAGE
export function updatePage(data) {
    return {
        type: types.EDIT_PAGE,
        payload: data
    }
}

//DELETE_PAGE
export function deletePage(data) {
    return {
        type: types.DELETE_PAGE,
        payload: data
    }
}

//REQUEST_ADD_PAGE
export function requestAddPage(data) {
    return {
        type: types.REQUEST_ADD_PAGE,
        payload: data
    }
}

//REQUEST_GET_MAIN_PAGES
export function requestGetMainPages() {
    return {
        type: types.REQUEST_GET_MAIN_PAGES
    }
}

//REQUEST_POPULATE_PAGES
export function requestPopulatePages(data) {
    return {
        type: types.REQUEST_POPULATE_PAGES,
        payload: data
    }
}

//REQUEST_EDIT_PAGE
export function requestUpdatePage(data) {
    return {
        type: types.REQUEST_EDIT_PAGE,
        payload: data
    }
}

//REQUEST_DELETE_PAGE
export function requestDeletePage(data) {
    return {
        type: types.REQUEST_DELETE_PAGE,
        payload: data
    }
}

