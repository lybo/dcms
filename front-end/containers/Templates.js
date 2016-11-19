import Templates from '../components/Templates'
import { connect } from 'react-redux'
import { fetchLogout } from '../actions/user'
import { fetchPopulateTemplates, fetchDeleteTemplate } from '../actions/template'

export default connect(
    (state) => {
        return {
            router: state.router,
            auth_user: state.auth_user,
            templates: state.templates || [],
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
