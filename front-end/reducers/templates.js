import { ADD_TEMPLATE, DELETE_TEMPLATE, EDIT_TEMPLATE, POPULATE_TEMPLATES } from '../constants/ActionTypes';
import template from './template';

const initialState = [];

export default function templates(state = initialState, action = { type: '', payload: {} }) {
    const mapTemplate = (templateState) => {
        return templateState.id === action.payload.id ? template(templateState, action) : templateState;
    };

    switch (action.type) {
        case POPULATE_TEMPLATES: 
            return action.payload;

        case ADD_TEMPLATE:
            return [
                template(undefined, action),
                ...state
            ];

        case DELETE_TEMPLATE:
            return state.filter(template =>
                template.id !== action.payload
            );

        case EDIT_TEMPLATE:
            return state.map(mapTemplate);

        default:
            return state
    }
};

