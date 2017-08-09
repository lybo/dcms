import co from 'co';
import { dpdHandler } from '../utils.js';
import * as model from '../../../models/page'

export function getPages() {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.pages.get(
            promiseHandler(function dpdPageGet(pages) {
                return pages;
            })
        );
    });
}

export function getPageById(pageId = '0') {
    return new Promise(function(resolve, reject) {
        if (pageId === '0') {
            resolve(model.getPage());
        }

        const promiseHandler = dpdHandler(resolve, reject);
        const query = {
            id: pageId,
        };

        dpd.pages.get(
            query,
            promiseHandler(function dpdPageGet(page) {
                return page;
            })
        );
    });
}

export function getPagesByParent(parentId = '0') {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);
        const query = {
            parentId,
        };

        dpd.pages.get(
            query,
            promiseHandler(function dpdPageGet(pages) {
                return pages;
            })
        );
    });
}

export function getPagesByIds(pageIds = []) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);
        const query = {
            id: {
                $in: pageIds
            },
        };

        dpd.pages.get(
            query,
            promiseHandler(function dpdPageGet(pages) {
                return pages;
            })
        );
    });
}

export function getPagesByMainNode() {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);
        const query = {
            isMainNode: true,
        };

        dpd.pages.get(
            query,
            promiseHandler(function dpdPagesByMainNode(pages) {
                return pages;
            })
        );
    });
}

export function getPagesByParentAndPath(parentId) {
    return co(function* () {
        try {
            const parentPage = yield getPageById(parentId);
            const pages = yield getPagesByParent(parentId);
            const pathPages = yield getPagesByIds(parentPage.path);
            return {
                parentPage,
                pages: pages || [],
                pathPages: pathPages || [],
            };
        } catch (e) {
            throw {
                error: e.message || e
            };
        }
    });
}

export function getPagesByPath(pageId) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);
        const query = {
            path: {
                $in: [pageId]
            }
        };

        dpd.pages.get(
            query,
            promiseHandler(function dpdPageGet(pages) {
                return pages;
            })
        );
    });
}

export function addPage(page) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        let pageData = {
            ...page
        };

        delete pageData.id;

        dpd.pages.post(
            pageData,
            promiseHandler(function dpdPagePost(page) {
                return page;
            })
        );
    });
}

export function updatePage(page) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        let pageData = {
            ...page
        };

        delete pageData.id;

        dpd.pages.put(
            page.id,
            pageData,
            promiseHandler(function dpdPagePut(page) {
                return page;
            })
        );
    });
}

export function deletePagesByPath(pageIds = []) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);
        const query = {
            id: {
                $in: pageIds
            }
        };
        dpd.pages.del(
            query,
            promiseHandler(function dpdPagesDel() {
                return pageIds;
            })
        );
    })
}

export function deletePage(pageId) {
    return co(function* () {
        try {
            const pages = yield getPagesByPath(pageId);
            const pageIds = (pages || []).map(page => page.id);
            const allPageIds = [...pageIds, pageId];
            const pageIdsResult = yield deletePagesByPath(allPageIds);
            return allPageIds;
        } catch (e) {
            throw {
                error: e.message || e
            };
        }
    });
}
