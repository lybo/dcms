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

