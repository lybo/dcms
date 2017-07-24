import * as utils from './utils.js';
import { dpdHandler, dpdDelHandler } from '../utils.js';

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
