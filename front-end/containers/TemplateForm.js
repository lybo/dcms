import TemplateForm from '../components/TemplateForm/'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/user'
import { fetchPopulateTemplates, fetchAddTemplate, fetchUpdateTemplate } from '../actions/template'
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
                dispatch(fetchPopulateTemplates());
            },
            onClickLogout: () => {
                dispatch(fetchLogout());
            },
            onAddTemplate: (template, success, fail) => {
                dispatch(fetchAddTemplate(template, success, fail));
            },
            onUpdateTemplate: (template, success, fail) => {
                dispatch(fetchUpdateTemplate(template, success, fail));
            }
        }
    }
)(TemplateForm);
