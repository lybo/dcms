import { ADD_FILE, DELETE_FILE, EDIT_FILE, POPULATE_FILES } from '../constants/ActionTypes';
import file from './file';

const initialState = [];

export default function files(state = initialState, action = { type: '', payload: {} }) {
    const mapFile = (fileState) => {
        return fileState.id === action.payload.id ? file(fileState, action) : fileState;
    };

    switch (action.type) {
        case POPULATE_FILES: 
            return action.payload;

        case ADD_FILE:
            return [
                file(undefined, action),
                ...state
            ];

        case DELETE_FILE:
            return state.filter(file =>
                file.id !== action.payload
            );

        case EDIT_FILE:
            return state.map(mapFile);

        default:
            return state
    }
};

