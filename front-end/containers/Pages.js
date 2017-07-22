import Pages from '../components/Pages/'
import { connect } from 'react-redux'
import { logout } from '../epics/user'
import { populatePages, updatePage, deletePage } from '../epics/page'
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
                dispatch(populatePages());
            },
            onSort: (page, success, fail) => {
                dispatch(updatePage(page, success, fail));
            },
            onDelete: (pageId) => {
                dispatch(deletePage(pageId));
            },
            onClickLogout: () => {
                dispatch(logout());
            }
        }
    }
)(Pages);
