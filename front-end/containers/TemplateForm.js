import TemplateForm from '../components/TemplateForm/'
import { connect } from 'react-redux'
import { requestLogout } from '../actions/auth'
import { requestPopulateTemplates, requestAddTemplate, requestUpdateTemplate } from '../actions/template'
import { PAGE_TITLE } from '../constants/Generic'

export default connect(
    (state) => {
        const { templateId } = state.router.params;
        const template = templateId !== '0' ?
            state.templates.find((templateItem) => templateItem.id === templateId) :
            {
                id: '0',
                title: '',
                description: '',
            };

        return {
            router: state.router,
            auth_user: state.auth_user,
            templates: state.templates,
            template,
            request: state.requests.template,
            cmsName: PAGE_TITLE,
            mainPages: state.pages.mainNodeIds.map(id => state.pages.byId[id]),
        };
    },
    (dispatch) => {
        return {
            onLoadTemplates: () => {
                dispatch(requestPopulateTemplates());
            },
            onClickLogout: () => {
                dispatch(requestLogout());
            },
            onAddTemplate: (template) => {
                dispatch(requestAddTemplate(template));
            },
            onUpdateTemplate: (template) => {
                dispatch(requestUpdateTemplate(template));
            }
        }
    }
)(TemplateForm);
