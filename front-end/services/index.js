import * as integration from './dpdIntegration/';

const getAllowedKeys = (keys = []) => (obj = {}) => {
    let trimmedObj = {};
    keys.forEach((key) => {
        trimmedObj[key] = obj[key];
    });

    return trimmedObj;
};

//AUTH
export function login(email, password) {
    return integration.loginAndGetAuthUser(email, password);
}

export function logout() {
    return integration.logout();
}

//USER
export function getUsers() {
    return integration.getUsers();
}

export function addUser(user) {
    const getObj = getAllowedKeys([
        'email',
        'password',
        'role',
    ]);
    return integration.addUser(
        getObj(user)
    );
}

export function updateUser(user) {
    return integration.updateUser(user);
}

export function deleteUser(userId) {
    return integration.deleteUser(userId);
}

//PAGE
export function getPages() {
    return integration.getPages();
}

export function addPage(page) {
    return integration.addPage(page);
}

export function updatePage(page) {
    return integration.updatePage(page);
}

export function deletePage(pageId) {
    return integration.deletePage(pageId);
}

//TEMPLATE
export function getTemplates() {
    return integration.getTemplates();
}

export function addTemplate(template) {
    return integration.addTemplate(template);
}

export function updateTemplate(template) {
    return integration.updateTemplate(template);
}

export function deleteTemplate(templateId) {
    return integration.deleteTemplate(templateId);
}

