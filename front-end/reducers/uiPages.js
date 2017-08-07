import { ADD_PAGE, DELETE_PAGE, EDIT_PAGE, POPULATE_PAGES } from '../constants/ActionTypes';
import page from './page';

const initialState = {
    ids: [],
    pathIds: [],
    parentId: '',
};

function normalizeArray(entities = []) {
    const ids = [];
    entities.forEach((entity) => {
        ids.push(entity.id);
    });

    return {
        ids,
    };
}

export default function uiPages(state = initialState, action = { type: '', payload: {} }) {
    const mapPage = (pageState) => {
        return pageState.id === action.payload.id ? page(pageState, action) : pageState;
    };

    switch (action.type) {
        case 'NAVIGATION':
            const { pattern } = action.payload;
            const { pageId } = action.payload.params;
            const isUIPages = pattern === '/pages/:pageId' || pattern === '/pages';

            if (!isUIPages) {
                return state
            }

            return {
                ...initialState,
                parentId: pageId || '0',
            };

        case POPULATE_PAGES:
            const { pages, parentPage } = action.payload;
            const ids = pages
                .sort((a, b) => b.zIndex - a.zIndex)
                .filter(page => state.parentId === page.parentId)
                .map(page => page.id);
            const pathIds = parentPage.path;

            return {
                ...state,
                ids,
                pathIds,
            };

        case ADD_PAGE:
            const isPageByParent = state.parentId === action.payload.parentId;

            if (!isPageByParent) {
                return state
            }

            return {
                ...state,
                ids: [
                    action.payload.id,
                    ...state.ids
                ],
            };

        case DELETE_PAGE:
            const pageIds = action.payload;
            return {
                ...state,
                ids: state.ids.filter(pageId =>
                    !pageIds.includes(pageId)
                ),
            };

        default:
            return state
    }
};


