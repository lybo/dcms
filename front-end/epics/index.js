import { combineEpics } from 'redux-observable';
import { requestPopulateTemplates, requestAddTemplate, requestUpdateTemplate, requestDeleteTemplate } from './template';
import { requestLogin, requestLogout } from './auth';
import { requestGetMainPages, requestPopulatePages, requestAddPage, requestUpdatePage, requestDeletePage } from './page';
import { requestPopulateUsers, requestAddUser, requestUpdateUser, requestDeleteUser } from './user';

export default combineEpics(
    requestPopulateUsers, requestAddUser, requestUpdateUser, requestDeleteUser,
    requestPopulateTemplates, requestAddTemplate, requestUpdateTemplate, requestDeleteTemplate,
    requestGetMainPages, requestPopulatePages, requestAddPage, requestUpdatePage, requestDeletePage,
    requestLogin, requestLogout,
);
