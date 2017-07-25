import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/file'
import { errorHandler } from './utils'
import { Observable } from 'rxjs/Observable'

const requestName = 'file';
const fileErrorHandler = errorHandler(requestName);

//POPULATE_FILES
export const requestPopulateFiles = (action$, store) => {
    return action$
        .ofType(types.REQUEST_POPULATE_FILES)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.getFiles(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateFiles(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(fileErrorHandler)
            )
        );
};

//ADD_FILE
export const requestAddFile = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_FILE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.addFile(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addFile(data)),
                            Observable.of(requests.setRequestResponse({
                                fileId: data.id,
                            }, requestName)),
                        )
                    )
                    .catch(fileErrorHandler)
            )
        );
};

//EDIT_FILE
export const requestUpdateFile = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_FILE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.updateFile(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updateFile(data)),
                            Observable.of(requests.setRequestResponse({
                                fileId: data.id,
                            }, requestName)),
                        )
                    )
                    .catch(fileErrorHandler)
            )
        );
};

//DELETE_FILE
export const requestDeleteFile = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_FILE)
        .map(action => action.payload)
        .flatMap(fileId =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.deleteFile(fileId))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(requests.setErrorMessage('', requestName)),
                            Observable.of(requests.newRequest(false, requestName)),
                            Observable.of(actions.deleteFile(fileId)),
                        )
                    )
                    .catch(fileErrorHandler)
            )
        );
};
