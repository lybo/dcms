import { ADD_USER, DELETE_USER, EDIT_USER, POPULATE_USERS } from '../constants/ActionTypes';
import user from './user';

const initialState = [];

export default function users(state = initialState, action = { type: '', payload: {} }) {
    const mapUser = (userState) => {
        return userState.id === action.payload.id ? user(userState, action) : userState;
    };

    switch (action.type) {
        case POPULATE_USERS: 
            return action.payload;
        case ADD_USER:
            return [
                user(undefined, action),
                ...state
            ];

        case DELETE_USER:
            return state.filter(user =>
                user.id !== action.payload
            );

        case EDIT_USER:
            return state.map(mapUser);

        default:
            return state
    }
};

