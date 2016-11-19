export function login(email, password) {
    return new Promise(function(resolve, reject) {
        dpd.users.login({
            'username': email, 
            'password': password
        }, function(user, err) {
            if (err) {
                reject(err);
                return;
            };
            dpd.users.me(function(me) {
                me.email = me.username;
                resolve(me);
            });
        });
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
        dpd.users.get(function (users, err) {
            if (err) {
                reject(err);
                return;
            };
            resolve(users.map((user) => {
                return {
                    id: user.id,
                    email: user.username,
                    role: user.role
                };
            }));
        });
    });
}

export function addUser(user) {
    return new Promise(function(resolve, reject) {
        dpd.users.post({
            'username': user.email, 
            'password': user.password,
            'role': user.role
        }, function(user, err) {
            if (err) {
                reject(err);
                return;
            };
            resolve(user);
        });
    });
}

export function updateUser(user) {
    return new Promise(function(resolve, reject) {
        let userData = { 
            ...user,
            username: user.email
        };
        
        delete userData.id;
        delete userData.email;

        dpd.users.put(user.id,
            userData, 
            function(user, err) {
                if (err) {
                    reject(err);
                    return;
                };
                resolve({ 
                    ...user,
                    email: user.username
                });
            });
    });
}

export function deleteUser(userId) {
    return new Promise(function(resolve, reject) {
        dpd.users.del(userId, function(result) {
            if (!result.count) {
                reject(err);
                return;
            };
            resolve(userId);
        });
    });
}

//------------------ PAGE
export function getPages() {
    return new Promise(function(resolve, reject) {
        dpd.pages.get(function (pages, err) {
            if (err) {
                reject(err);
                return;
            };
            resolve(pages);
        });
    });
}

export function addPage(page) {
    return new Promise(function(resolve, reject) {
        let pageData = { 
            ...page
        };
        
        delete pageData.id;

        dpd.pages.post(pageData, function(page, err) {
            if (err) {
                reject(err);
                return;
            };
            resolve(page);
        });
    });
}

export function updatePage(page) {
    return new Promise(function(resolve, reject) {
        let pageData = { 
            ...page
        };
        
        delete pageData.id;

        dpd.pages.put(page.id,
            pageData, 
            function(page, err) {
                if (err) {
                    reject(err);
                    return;
                };
                resolve(page);
            });
    });
}

export function deletePage(pageId) {
    return new Promise(function(resolve, reject) {
        dpd.pages.del(pageId, function(result) {
            if (!result.count) {
                reject(err);
                return;
            };
            resolve(pageId);
        });
    });
}

//------------------ TEMPLATE
export function getTemplates() {
    return new Promise(function(resolve, reject) {
        dpd.templates.get(function (templates, err) {
            if (err) {
                reject(err);
                return;
            };
            resolve(templates);
        });
    });
}

export function addTemplate(template) {
    return new Promise(function(resolve, reject) {
        let templateData = { 
            ...template
        };
        
        delete templateData.id;

        dpd.templates.post(templateData, function(template, err) {
            if (err) {
                reject(err);
                return;
            };
            resolve(template);
        });
    });
}

export function updateTemplate(template) {
    return new Promise(function(resolve, reject) {
        let templateData = { 
            ...template
        };
        
        delete templateData.id;

        dpd.templates.put(template.id,
            templateData, 
            function(template, err) {
                if (err) {
                    reject(err);
                    return;
                };
                resolve(template);
            });
    });
}

export function deleteTemplate(templateId) {
    return new Promise(function(resolve, reject) {
        dpd.templates.del(templateId, function(result) {
            if (!result.count) {
                reject(err);
                return;
            };
            resolve(templateId);
        });
    });
}

