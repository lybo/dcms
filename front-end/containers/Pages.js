import Pages from '../components/Pages/'
import { connect } from 'react-redux'
import { requestLogout } from '../epics/auth'
import { requestPopulatePages, requestUpdatePage, requestDeletePage } from '../epics/page'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            pages: state.pages || [],
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
