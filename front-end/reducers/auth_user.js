import { LOGIN, LOGOUT } from '../constants/ActionTypes';
import * as types from '../constants/ActionTypes'

const initialState = {
    id: 0,
    email: '',
    role: 'admin'
};

export default function(state = initialState, action = { type: '', payload: {} }) {
    switch (action.type) {
        case types.LOGIN:
            return {
                id: action.payload.id,
                email: action.payload.email,
                role: action.payload.role
            };
        case types.LOGOUT:
            return {
                id: 0,
                email: '',
                role: 'admin'
            };
        case types.RESET_PASSWORD:
            return state;
        default: 
            return state;
    }   
};

