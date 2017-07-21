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
        dpd.users.logout(function(err) {
            if (err) {
                reject(err);
                return;
            };

            resolve();
        });
    });
}

export function getUsers() {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.users.get(
            promiseHandler(function dpdUsersGet(users) {
                return users.map(utils.mapUser);
            })
        );
    });
}

export function addUser(user) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.users.post(
            {
                'username': user.email,
                'password': user.password,
                'role': user.role
            }, promiseHandler(function dpdUsersPost(user) {
                return user;
            })
        );
    });
}

export function updateUser(user) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        let userData = {
            ...user,
            username: user.email
        };

        delete userData.id;
        delete userData.email;

        dpd.users.put(
            user.id,
            userData,
            promiseHandler(function dpdUsersPut(user) {
                return {
                    ...user,
                    email: user.username
                };
            })
        );
    });
}

export function deleteUser(userId) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.users.del(
            userId,
            promiseHandler(function dpdUsersDel() {
                return userId;
            })
        );
    });
}
