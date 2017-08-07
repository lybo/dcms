import { ADD_PAGE, DELETE_PAGE, EDIT_PAGE, POPULATE_PAGES } from '../constants/ActionTypes';
import page from './page';

const initialState = {
    byId: {},
    allIds: [],
    idsByParent: [],
};

function normalizeArray(entities = []) {
    const ids = [];
    const byId = {};
    entities.forEach((entity) => {
        ids.push(entity.id);
        byId[entity.id] = entity;
    });

    return {
        byId,
        ids,
    };
}

export default function pages(state = initialState, action = { type: '', payload: {} }) {
    const mapPage = (pageState) => {
        return pageState.id === action.payload.id ? page(pageState, action) : pageState;
    };

    switch (action.type) {
        case POPULATE_PAGES:
            const { byId, ids } = normalizeArray(action.payload);
            return {
                byId,
                allIds: ids,
            };

        case ADD_PAGE:
            state.byId[action.payload.id] = page(undefined, action);
            return {
                byId: state.byId,
                allIds: [
                    action.payload.id,
                    ...state.allIds
                ],
            };

        case DELETE_PAGE:
            const pageIds = action.payload;
            console.log(pageIds);
            pageIds.forEach((id) => delete state.byId[id])
            return {
                byId: state.byId,
                allIds: state.allIds.filter(page =>
                    !pageIds.includes(page.id)
                ),
            };

        case EDIT_PAGE:
            state.byId[action.payload.id] = page(undefined, action);
            return state;

        default:
            return state
    }
};

