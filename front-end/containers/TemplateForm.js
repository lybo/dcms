import TemplateForm from '../components/TemplateForm/'
import { connect } from 'react-redux'
import { requestLogout } from '../epics/auth'
import { requestPopulateTemplates, requestAddTemplate, requestUpdateTemplate } from '../epics/template'
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
            onAddTemplate: (template, success, fail) => {
                dispatch(requestAddTemplate(template, success, fail));
            },
            onUpdateTemplate: (template, success, fail) => {
                dispatch(requestUpdateTemplate(template, success, fail));
            }
        }
    }
)(TemplateForm);
