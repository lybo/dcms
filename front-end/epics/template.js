import * as api from '../services/index'
import * as requests from '../actions/requests'
import * as actions from '../actions/template'
import * as types from '../constants/ActionTypes'
import { errorHandler } from './utils'
import { Observable } from 'rxjs/Observable'
import { redirect } from 'redux-router-director'

const requestName = 'template';
const templateErrorHandler = errorHandler(requestName);

//POPULATE_TEMPLATES
export const requestPopulateTemplates = (action$, store) => {
    return action$
        .ofType(types.REQUEST_POPULATE_TEMPLATES)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.getTemplates(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.populateTemplates(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(templateErrorHandler)
            )
        );
};

//ADD_TEMPLATE
export const requestAddTemplate = (action$, store) => {
    return action$
        .ofType(types.REQUEST_ADD_TEMPLATE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.addTemplate(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.addTemplate(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(templateErrorHandler)
            )
        );
};


//EDIT_TEMPLATE
export const requestUpdateTemplate = (action$, store) => {
    return action$
        .ofType(types.REQUEST_EDIT_TEMPLATE)
        .map(action => action.payload)
        .flatMap(payload =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.updateTemplate(payload))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.updateTemplate(data)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(templateErrorHandler)
            )
        );
};

//DELETE_TEMPLATE
export const requestDeleteTemplate = (action$, store) => {
    return action$
        .ofType(types.REQUEST_DELETE_TEMPLATE)
        .map(action => action.payload)
        .flatMap(templateId =>
            //Concat 2 observables so they fire sequentially
            Observable.concat(
                Observable.of(requests.newRequest(true, requestName)),
                Observable.fromPromise(api.deleteTemplate(templateId))
                    .flatMap(data =>
                        //Concat 2 observables so they fire sequentially
                        Observable.concat(
                            Observable.of(actions.deleteTemplate(templateId)),
                            Observable.of(requests.setRequestResponse(null, requestName)),
                        )
                    )
                    .catch(templateErrorHandler)
            )
        );
};
