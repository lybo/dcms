import { ADD_FILE, EDIT_FILE } from '../constants/ActionTypes';
import * as types from '../constants/ActionTypes'

const initialState = {
    id: 0,
    title: '',
    description: '',
    image: '',
    features: [],
    zone: ''
};

export default function(state = initialState, action = { type: '', payload: {} }) {
    switch (action.type) {
        case types.ADD_FILE:
            return Object.assign({}, state, action.payload);

        case types.EDIT_FILE:
            return Object.assign({}, state, action.payload);

        default: 
            return state;
    }   
};

