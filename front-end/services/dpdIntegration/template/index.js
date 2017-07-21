import co from 'co';
import { dpdHandler } from '../utils.js';

export function getTemplates() {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        dpd.templates.get(
            promiseHandler(function dpdTemplateGet(templates) {
                return templates;
            })
        );
    });
}

export function addTemplate(template) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        let templateData = {
            ...template
        };

        delete templateData.id;

        dpd.templates.post(
            templateData,
            promiseHandler(function dpdTemplatePost(template) {
                return template;
            })
        );
    });
}

export function updateTemplate(template) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);

        let templateData = {
            ...template
        };

        delete templateData.id;

        dpd.templates.put(
            template.id,
            templateData,
            promiseHandler(function dpdTemplatePut(template) {
                return template;
            })
        );
    });
}

export function deleteTemplate(templateId) {
    return new Promise(function(resolve, reject) {
        const promiseHandler = dpdHandler(resolve, reject);
        dpd.templates.del(
            templateId,
            promiseHandler(function dpdTemplatesDel() {
                return templateId;
            })
        );
    });
}
