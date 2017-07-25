import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/user'
import * as types from '../constants/ActionTypes'
import { errorHandler } from './utils'
import { Observable } from 'rxjs/Observable'

const requestName = 'user';
const userErrorHandler = errorHandler(requestName);

//POPULATE_USERS
export const requestPopulateUsers = (action$, store) => {
    return action$
        .ofType(types.REQUEST_POPULATE_USERS)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.getUsers(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateUsers(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(userErrorHandler)
            )
        );
};

//ADD_USER
export const requestAddUser = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_USER)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.addUser(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addUser(data)),
                            Observable.of(requests.setRequestResponse({
                                userId: data.id,
                            }, requestName)),
                        )
                    )
                    .catch(userErrorHandler)
            )
        );
};

//EDIT_USER
export const requestUpdateUser = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_USER)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.updateUser(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updateUser(data)),
                            Observable.of(requests.setRequestResponse({
                                userId: data.id,
                            }, requestName)),
                        )
                    )
                    .catch(userErrorHandler)
            )
        );
};

//DELETE_USER
export const requestDeleteUser = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_USER)
        .map(action => action.payload)
        .flatMap(userId =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.deleteUser(userId))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(requests.setErrorMessage('', requestName)),
                            Observable.of(requests.newRequest(false, requestName)),
                            Observable.of(actions.deleteUser(userId)),
                        )
                    )
                    .catch(userErrorHandler)
            )
        );
};
