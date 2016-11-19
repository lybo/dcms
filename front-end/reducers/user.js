import { ADD_USER, DELETE_USER, EDIT_USER } from '../constants/ActionTypes';
import * as types from '../constants/ActionTypes'

const initialState = {
    id: 0,
    email: '',
    role: 'admin'
};

export default function(state = initialState, action = { type: '', payload: {} }) {
    switch (action.type) {
        case types.ADD_USER:
            return {
                id: action.payload.id,
                email: action.payload.email,
                role: action.payload.role
            };
        case types.EDIT_USER:
            return {
                id: action.payload.id,
                email: action.payload.email,
                role: action.payload.role
            };
        case types.RESET_PASSWORD:
            return state;
        default: 
            return state;
    }   
};

