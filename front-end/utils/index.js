import { USER_ROLE } from '../constants/ActionTypes'


export function getAuthorizedUserRoles(role) {
    const priority = USER_ROLE.indexOf(role);
    if (priority === -1) {
        return [];
    }

    const userRoles = [...USER_ROLE];

    return userRoles
        .reverse()
        .slice(0, userRoles.length - priority)
        .reverse();
}
