import PageForm from '../components/PageForm/'
import { connect } from 'react-redux'
import { logout } from '../epics/user'
import { populatePages, addPage, updatePage } from '../epics/page'
import { PAGE_TITLE } from '../constants/Generic'

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
            cmsName: PAGE_TITLE,
        };
    },
    (dispatch) => {
        return {
            onLoadPages: (success, fail) => {
                dispatch(populatePages(success, fail));
            },
            onClickLogout: () => {
                dispatch(logout());
            },
            onAddPage: (page, success, fail) => {
                dispatch(addPage(page, success, fail));
            },
            onUpdatePage: (page, success, fail) => {
                dispatch(updatePage(page, success, fail));
            }
        }
    }
)(PageForm);
