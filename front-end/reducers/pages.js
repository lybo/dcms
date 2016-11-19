import { ADD_PAGE, DELETE_PAGE, EDIT_PAGE, POPULATE_PAGES } from '../constants/ActionTypes';
import page from './page';

const initialState = [];

export default function pages(state = initialState, action = { type: '', payload: {} }) {
    const mapPage = (pageState) => {
        return pageState.id === action.payload.id ? page(pageState, action) : pageState;
    };

    switch (action.type) {
        case POPULATE_PAGES: 
            return action.payload;

        case ADD_PAGE:
            return [
                page(undefined, action),
                ...state
            ];

        case DELETE_PAGE:
            return state.filter(page =>
                page.id !== action.payload
            );

        case EDIT_PAGE:
            return state.map(mapPage);

        default:
            return state
    }
};

