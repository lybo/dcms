import Pages from '../components/Pages/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulatePages, requestUpdatePage, requestDeletePage } from '../actions/page'
import { PAGE_TITLE } from '../constants/Generic'
import { getPage } from '../models/page'

export default connect(
    (state) => {
        const parentId = state.router.params.pageId || '0';
        const pageIds = state.pages.allIds.filter((pageId) => state.pages.byId[pageId].parentId === parentId);
        const pages = pageIds.map((pageId) => state.pages.byId[pageId]);
        const root = getPage();
        const parentPageId = (state.pages.allIds).find((pageId) => state.pages.byId[pageId].id === parentId);
        const parentPage = state.pages.byId[parentPageId] || root;
        const grandParentPage = root;
        // const grandParentPage = (state.pages || []).find((page) => page.id === parentPage.parentId) || root;

        return {
            pages,
            parentPage,
            grandParentPage,
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
