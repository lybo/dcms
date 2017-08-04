import Pages from '../components/Pages/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulatePages, requestUpdatePage, requestDeletePage } from '../actions/page'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        const parentId = state.router.params.pageId || '0';
        const pages = (state.pages || []).filter((page) => page.parentId === parentId);
        const root = {
            id: '0',
            title: 'Pages',
            parentId: '0'
        };
        const parentPage = (state.pages || []).find((page) => page.id === parentId) || root;
        const grandParentPage = (state.pages || []).find((page) => page.id === parentPage.parentId) || root;
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
