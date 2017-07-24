import co from 'co';
import * as utils from './utils.js';
import { dpdHandler, dpdDelHandler } from '../utils.js';

export function login(email, password) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.users.login({
            'username': email,
            'password': password
        }, promiseHandler(function dpdUsersLogin(me) {
            return me;
        }));
    });
}

export function getAuthUser(email, password) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.users.me(
            promiseHandler(function dpdUsersMe(me) {
                return utils.mapAuthUser(me);
            })
        );
    });
}

export function loginAndGetAuthUser(email, password) {
    return co(function* () {
        try {
            yield login(email, password);
            const user = yield getAuthUser();
            return user;
        } catch (e) {
            throw e;
        }
    });
}

export function logout() {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.users.logout(
            promiseHandler(function dpdUsersLogout() {
                return {
                    data: null
                };
            })
        );
    });
}
