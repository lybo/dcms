import co from 'co';
import { dpdHandler } from '../utils.js';

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

export function deletePage(pageId) {
    const deletePagesByPath = (pageIds = []) => new Promise(function(resolve, reject) {
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
    });

    const getPagesByPath = (pageId) => new Promise(function(resolve, reject) {
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
    return co(function* () {
        try {
            const pages = yield getPagesByPath(pageId);
            const pageIds = pages.map(page => page.id);
            pageIds.push(pageId);
            const pageIdsResult = yield deletePagesByPath(pageIds);
            return pageIds;
        } catch (e) {
            throw {
                error: e.message || e
            };
        }
    });
}



