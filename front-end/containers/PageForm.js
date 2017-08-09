import PageForm from '../components/PageForm/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulatePages, requestAddPage, requestUpdatePage } from '../actions/page'
import { PAGE_TITLE } from '../constants/Generic'
import { getPage } from '../models/page'


function getEmptyPage(title = '') {
    return getPage({
        title,
    });
}

export default connect(
    (state) => {
        const { pageId } = state.router.params;
        const isEditMode = pageId && pageId !== '0';
        const page = isEditMode && state.pages.byId[pageId] ?
            state.pages.byId[pageId] :
            getEmptyPage();

        const parentId = state.router.params.parentId ?
            state.router.params.parentId :
            page.parentId;

        const parentPageId = (state.pages.allIds).find((pageId) => state.pages.byId[pageId].id === parentId);
        const parentPage = state.pages.byId[parentPageId] || getEmptyPage('Pages');

        return {
            router: state.router,
            auth_user: state.auth_user,
            pagesNumber: state.uiPages.ids.length,
            page,
            parentPage,
            request: state.requests.page,
            templates: state.templates,
            cmsName: PAGE_TITLE,
            mainPages: state.pages.mainNodeIds.map(id => state.pages.byId[id]),
        };
    },
    (dispatch) => {
        return {
            onLoadPages: () => {
                dispatch(requestPopulatePages());
            },
            onClickLogout: () => {
                dispatch(requestLogout());
            },
            onAddPage: (page) => {
                dispatch(requestAddPage(page));
            },
            onUpdatePage: (page) => {
                dispatch(requestUpdatePage(page));
            }
        }
    }
)(PageForm);
