import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/auth'
import * as types from '../constants/ActionTypes'
import { errorHandler } from './utils'
import { Observable } from 'rxjs/Observable'

const requestName = 'auth';
const authErrorHandler = errorHandler(requestName);

//REQUEST_LOGOUT
export const requestLogout = (action$, store) => {
    return action$
        .ofType(types.REQUEST_LOGOUT)
        .flatMap(() =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.logout())
                    .flatMap(() =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.logout()),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(authErrorHandler)
            )
        );
};

//REQUEST_LOGIN
export const requestLogin = (action$, store) => {
    return action$
        .ofType(types.REQUEST_LOGIN)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.login(payload.username, payload.password))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.login(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch((data) =>
                        Observable.concat(
                            Observable.of(requests.newRequest(false, requestName)),
                            Observable.of(requests.setErrorMessage(data.error, requestName)),
                        )
                    )
            )
        );
};
