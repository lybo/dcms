/**
 * Actions for file.
 * @module actions/file
 */

import * as types from '../constants/ActionTypes'


//POPULATE_FILES
export function populateFiles(data) {
    return {
        type: types.POPULATE_FILES,
        payload: data
    }
}


//ADD_FILE
export function addFile(data) {
    return {
        type: types.ADD_FILE,
        payload: data
    }
}


//EDIT_FILE
export function updateFile(data) {
    return {
        type: types.EDIT_FILE,
        payload: data
    }
}


//DELETE_FILE
export function deleteFile(data) {
    return {
        type: types.DELETE_FILE,
        payload: data
    }
}
