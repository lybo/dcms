import { ADD_TEMPLATE, EDIT_TEMPLATE } from '../constants/ActionTypes';
import * as types from '../constants/ActionTypes'

const initialState = {
    id: 0,
    title: '',
    description: '',
    fields: [],
    allowInsert: 0,
    allowUpdate: 0,
    allowDelete: 0,
};

export default function(state = initialState, action = { type: '', payload: {} }) {
    switch (action.type) {
        case types.ADD_TEMPLATE:
            return Object.assign({}, state, action.payload);

        case types.EDIT_TEMPLATE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};

