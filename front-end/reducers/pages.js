import { POPULATE_MAIN_PAGES, ADD_PAGE, DELETE_PAGE, EDIT_PAGE, POPULATE_PAGES } from '../constants/ActionTypes';
import page from './page';
import * as model from '../models/page';

const initialState = {
    byId: {
        '0': model.getPage({
            title: 'Pages',
        })
    },
    allIds: ['0'],
    mainNodeIds: [],
};

function uniq(a) {
    const seen = {};
    return a.filter((item) => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function normalizeArray(entities = []) {
    const ids = [];
    const byId = {};
    entities.forEach((entity) => {
        ids.push(entity.id);
        byId[entity.id] = model.getPage(entity);
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

function getNewState(state, newPages = []) {
    const { byId, ids } = normalizeArray(newPages);

    const mainNodeIds = state.allIds
        .filter(id => state.byId[id].isMainNode)
        .sort((idA, idB) => {
            const pageA = state.byId[idA];
            const pageB = state.byId[idB];
            return pageA.zIndex - pageB.zIndex || pageA.path.length - pageB.path.length || pageA.id - pageB.id
        });

    mainNodeIds.forEach((id) => {
        byId[id] = Object.assign({}, state.byId[id]);
    });

    return {
        byId,
        mainNodeIds,
        allIds: uniq(ids.concat(mainNodeIds)),
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

            return getNewState(state, allPages);

        case POPULATE_MAIN_PAGES:
            const { byId, ids } = normalizeArray(action.payload);

            return {
                byId,
                mainNodeIds: ids.filter(id => id !== '0'),
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
            const predicateRemovePagesByIds = (pageIds) => pageId => !pageIds.includes(pageId);
            const removePagesByPageIds = predicateRemovePagesByIds(pageIds);

            return {
                ...state,
                allIds: state.allIds.filter(removePagesByPageIds),
                mainNodeIds: state.mainNodeIds.filter(removePagesByPageIds),
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

