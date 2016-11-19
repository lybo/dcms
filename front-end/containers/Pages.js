import Pages from '../components/Pages'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/user'
import { fetchPopulatePages, fetchUpdatePage, fetchDeletePage } from '../actions/page'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            pages: state.pages || [],
            templates: state.templates || [],
        };
    },
    (dispatch) => {
        return {
            onLoadPages: () => { 
                dispatch(fetchPopulatePages());
            },
            onSort: (page, success, fail) => { 
                dispatch(fetchUpdatePage(page, success, fail));
            },
            onDelete: (pageId) => { 
                dispatch(fetchDeletePage(pageId));
            },
            onClickLogout: () => { 
                dispatch(fetchLogout());
            }
        }
    }
)(Pages); 
