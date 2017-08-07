import Pages from '../components/Pages/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulatePages, requestUpdatePage, requestDeletePage } from '../actions/page'
import { PAGE_TITLE } from '../constants/Generic'
import { getPage } from '../models/page'

export default connect(
    (state) => {
        const { parentId, ids, pathIds } = state.uiPages;
        const { byId } = state.pages;
        const pageIds = ids.filter((pageId) => byId[pageId].parentId === parentId);
        const pages = pageIds.map((pageId) => byId[pageId]);
        const pathPages = pathIds.map((pageId) => byId[pageId]);
        const root = getPage();
        const parentPage = byId[parentId] || root;

        return {
            pages,
            parentPage,
            pathPages,
            router: state.router,
            auth_user: state.auth_user,
            templates: state.templates || [],
            cmsName: PAGE_TITLE,
        };
    },
    (dispatch) => {
        return {
            onLoadPages: () => {
                dispatch(requestPopulatePages());
            },
            onSort: (page, success, fail) => {
                dispatch(requestUpdatePage(page, success, fail));
            },
            onDelete: (pageId) => {
                dispatch(requestDeletePage(pageId));
            },
            onClickLogout: () => {
                dispatch(requestLogout());
            }
        }
    }
)(Pages);
