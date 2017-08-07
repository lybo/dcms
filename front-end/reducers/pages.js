import { ADD_PAGE, DELETE_PAGE, EDIT_PAGE, POPULATE_PAGES } from '../constants/ActionTypes';
import page from './page';
import * as model from '../models/page';

const initialState = {
    byId: {
        '0': model.getPage({
            title: 'Pages',
        })
    },
    allIds: ['0'],
};

function normalizeArray(entities = []) {
    const ids = [];
    const byId = {};
    entities.forEach((entity) => {
        ids.push(entity.id);
        byId[entity.id] = entity;
    });

    //TODO: fix the root
    byId['0'] = model.getPage({
        title: 'Pages',
    });
    ids.push('0');

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
            const allPages = [].concat(
                action.payload.pages || [],
                action.payload.parentPage || [],
                action.payload.pathPages || [],
            );
            const { byId, ids } = normalizeArray(allPages);

            return {
                byId,
                allIds: ids,
            };

        case ADD_PAGE:
            return {
                ...state,
                allIds: [
                    action.payload.id,
                    ...state.allIds
                ],
                byId: {
                    ...state.byId,
                    [action.payload.id]: page(undefined, action)
                }
            };

        case DELETE_PAGE:
            const pageIds = action.payload;
            pageIds.forEach((id) => delete state.byId[id]);
            return {
                ...state,
                allIds: state.allIds.filter(
                    pageId => !pageIds.includes(pageId)
                ),
                byId: state.byId,
            };

        case EDIT_PAGE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: page(undefined, action),
                }
            };

        default:
            return state
    }
};

