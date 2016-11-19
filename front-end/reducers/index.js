import { combineReducers } from 'redux'
import router from 'redux-router-director'
import auth_user from './auth_user'
import users from './users'
import templates from './templates'
import pages from './pages'
import files from './files'
import requests from './requests'

export default combineReducers({
    router: router.reducer,
    auth_user,
    users,
    pages,
    templates,
    files,
    requests
});
