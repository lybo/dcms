import Templates from '../components/Templates/'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/user'
import { fetchPopulateTemplates, fetchDeleteTemplate } from '../actions/template'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            templates: state.templates || [],
            cmsName: PAGE_TITLE,
        };
    },
    (dispatch) => {
        return {
            onLoadTemplates: () => {
                dispatch(fetchPopulateTemplates());
            },
            onDelete: (templateId) => {
                dispatch(fetchDeleteTemplate(templateId));
            },
            onClickLogout: () => {
                dispatch(fetchLogout());
            }
        }
    }
)(Templates);
