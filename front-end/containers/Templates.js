import Templates from '../components/Templates/'
import { connect } from 'react-redux'
import { logout } from '../epics/user'
import { populateTemplates, deleteTemplate } from '../epics/template'
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
                dispatch(populateTemplates());
            },
            onDelete: (templateId) => {
                dispatch(deleteTemplate(templateId));
            },
            onClickLogout: () => {
                dispatch(logout());
            }
        }
    }
)(Templates);
