import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/page'
import * as types from '../constants/ActionTypes'
import { errorHandler } from './utils'
import { Observable } from 'rxjs/Observable'

const requestName = 'page';
const pageErrorHandler = errorHandler(requestName);

//GET_MAIN_PAGES
export const requestGetMainPages = (action$, store) => {
    return action$
        .ofType(types.REQUEST_GET_MAIN_PAGES)
        .flatMap(() =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.getPagesByMainNode())
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateMainPages(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(pageErrorHandler)
            )
        );
};

//POPULATE_PAGES
export const requestPopulatePages = (action$, store) => {
    return action$
        .ofType(types.REQUEST_POPULATE_PAGES)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.getPagesByParent(store.getState().uiPages.parentId))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populatePages(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(pageErrorHandler)
            )
        );
};

//ADD_PAGE
export const requestAddPage = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_PAGE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.addPage(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addPage(data)),
                            Observable.of(requests.setRequestResponse({
                                pageId: data.id,
                            }, requestName)),
                        )
                    )
                    .catch(pageErrorHandler)
            )
        );
};

//EDIT_PAGE
export const requestUpdatePage = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_PAGE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.updatePage(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updatePage(data)),
                            Observable.of(requests.setRequestResponse({
                                pageId: data.id,
                            }, requestName)),
                        )
                    )
                    .catch(pageErrorHandler)
            )
        );
};

//DELETE_PAGE
export const requestDeletePage = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_PAGE)
        .map(action => action.payload)
        .flatMap(pageId =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.deletePage(pageId))
                    .flatMap(pageIds =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(requests.setErrorMessage('', requestName)),
                            Observable.of(requests.newRequest(false, requestName)),
                            Observable.of(actions.deletePage(pageIds)),
                        )
                    )
                    .catch(pageErrorHandler)
            )
        );
};
