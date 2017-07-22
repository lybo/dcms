import TemplateForm from '../components/TemplateForm/'
import { connect } from 'react-redux'
import { logout } from '../epics/user'
import { populateTemplates, addTemplate, updateTemplate } from '../epics/template'
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
                dispatch(populateTemplates());
            },
            onClickLogout: () => {
                dispatch(logout());
            },
            onAddTemplate: (template, success, fail) => {
                dispatch(addTemplate(template, success, fail));
            },
            onUpdateTemplate: (template, success, fail) => {
                dispatch(updateTemplate(template, success, fail));
            }
        }
    }
)(TemplateForm);
