import PageForm from '../components/PageForm/'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/user'
import { fetchPopulatePages, fetchAddPage, fetchUpdatePage } from '../actions/page'

export default connect(
    (state) => {
        const { pageId } = state.router.params;
        const page = pageId && pageId !== '0' ?
            state.pages.find((pageItem) => pageItem.id === pageId) :
            {
                id: '0',
                title: '',
                publicationStartDate: 0,
                publicationEndDate: 0,
                content: {},
                templateId: '',
                zone: '',
            };

        return {
            router: state.router,
            auth_user: state.auth_user,
            pagesNumber: state.pages.length,
            page,
            request: state.requests.page,
            templates: state.templates,
        };
    },
    (dispatch) => {
        return {
            onLoadPages: (success, fail) => {
                dispatch(fetchPopulatePages(success, fail));
            },
            onClickLogout: () => {
                dispatch(fetchLogout());
            },
            onAddPage: (page, success, fail) => {
                dispatch(fetchAddPage(page, success, fail));
            },
            onUpdatePage: (page, success, fail) => {
                dispatch(fetchUpdatePage(page, success, fail));
            }
        }
    }
)(PageForm);
