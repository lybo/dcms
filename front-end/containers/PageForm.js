import PageForm from '../components/PageForm/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulatePages, requestAddPage, requestUpdatePage } from '../actions/page'
import { PAGE_TITLE } from '../constants/Generic'


function getEmptyPage(title = '') {
    return {
        title,
        id: '0',
        content: {},
        parentId: '0',
        path: ['0'],
        templateId: '',
    };
}

export default connect(
    (state) => {
        const { pageId } = state.router.params;
        const page = pageId && pageId !== '0' ?
            state.pages.find((pageItem) => pageItem.id === pageId) :
            getEmptyPage();

        const parentId = state.router.params.parentId ?
            state.router.params.parentId :
            page.parentId;

        const parentPage = state.pages.find((page) => page.id === parentId) || getEmptyPage('Pages');

        return {
            router: state.router,
            auth_user: state.auth_user,
            pagesNumber: state.pages.length,
            page,
            parentPage,
            request: state.requests.page,
            templates: state.templates,
            cmsName: PAGE_TITLE,
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
