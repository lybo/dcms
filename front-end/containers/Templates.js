import Templates from '../components/Templates/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulateTemplates, requestDeleteTemplate } from '../actions/template'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            templates: state.templates || [],
            cmsName: PAGE_TITLE,
            mainPages: state.pages.mainNodeIds.map(id => state.pages.byId[id]),
        };
    },
    (dispatch) => {
        return {
            onLoadTemplates: () => {
                dispatch(requestPopulateTemplates());
            },
            onDelete: (templateId) => {
                dispatch(requestDeleteTemplate(templateId));
            },
            onClickLogout: () => {
                dispatch(requestLogout());
            }
        }
    }
)(Templates);
