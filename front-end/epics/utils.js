import * as requests from '../actions/requests'
import { Observable } from 'rxjs/Observable'

export const errorHandler = (requestName) => (data) => {
    return Observable.concat(
        Observable.of(requests.newRequest(false, requestName)),
        Observable.of(requests.setErrorMessage(data.error, requestName)),
    );
};
